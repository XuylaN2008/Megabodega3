from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from database import connect_to_mongo, close_mongo_connection, get_database
from auth import (
    authenticate_user, create_access_token, get_password_hash,
    get_current_active_user, get_customer_user, get_store_admin_user,
    get_delivery_user
)
from auth_google import handle_google_auth, get_google_login_url, logout_session
from models import *
from payment_routes import payment_router
from typing import List, Optional
import os
import logging
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    logger.info("Connected to MongoDB")
    yield
    # Shutdown
    await close_mongo_connection()
    logger.info("Closed MongoDB connection")

# Create the main app
app = FastAPI(
    title="Delivery App API",
    description="API for Food Delivery Application in Ecuador",
    version="1.0.0",
    lifespan=lifespan
)

# Create API router with prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Delivery App API is running"}

# Authentication endpoints
@api_router.post("/auth/register", response_model=AuthResponse)
async def register_user(user_data: UserCreate, db = Depends(get_database)):
    """Register a new user"""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Create user document
    user_dict = user_data.dict()
    user_dict.pop("password", None)  # Remove plain password safely
    
    user = User(**user_dict)
    user_doc = user.dict()
    user_doc["password"] = hashed_password  # Add hashed password
    
    # Insert user
    result = await db.users.insert_one(user_doc)
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email})
    
    # Remove password from response
    response_user = user.dict()
    
    return AuthResponse(
        user=User(**response_user),
        access_token=access_token
    )

@api_router.post("/auth/login", response_model=AuthResponse)
async def login_user(login_data: UserLogin, db = Depends(get_database)):
    """Login user"""
    user = await authenticate_user(login_data.email, login_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user["email"]})
    
    # Remove password from response
    user_dict = dict(user)
    if "password" in user_dict:
        del user_dict["password"]
    
    return AuthResponse(
        user=User(**user_dict),
        access_token=access_token
    )

@api_router.get("/auth/me", response_model=User)
async def get_current_user_info(current_user: dict = Depends(get_current_active_user)):
    """Get current user information"""
    user_dict = dict(current_user)
    if "password" in user_dict:
        del user_dict["password"]
    return User(**user_dict)

# Google OAuth endpoints
@api_router.get("/auth/google/login")
async def google_login_redirect(request: Request):
    """Redirect to Google OAuth login"""
    # Get the redirect URL from frontend
    redirect_url = request.url_for("google_callback")
    google_url = get_google_login_url(str(redirect_url))
    return RedirectResponse(url=google_url)

@api_router.get("/auth/google/callback")
async def google_callback(session_id: str = None, db = Depends(get_database)):
    """Handle Google OAuth callback"""
    if not session_id:
        raise HTTPException(
            status_code=400,
            detail="Missing session_id parameter"
        )
    
    try:
        auth_response, session_token = await handle_google_auth(session_id, db)
        
        # Set HttpOnly cookie for session
        response = JSONResponse(content={
            "success": True,
            "user": auth_response.user.dict(),
            "access_token": auth_response.access_token
        })
        
        response.set_cookie(
            key="session_token",
            value=session_token,
            httponly=True,
            secure=True,
            samesite="none",
            max_age=7 * 24 * 60 * 60,  # 7 days
            path="/"
        )
        
        return response
        
    except Exception as e:
        logger.error(f"Google OAuth error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@api_router.post("/auth/google/session")
async def google_session_auth(request: Request, db = Depends(get_database)):
    """Authenticate with Google session ID"""
    try:
        data = await request.json()
        session_id = data.get("session_id")
        
        if not session_id:
            raise HTTPException(status_code=400, detail="session_id is required")
        
        auth_response, session_token = await handle_google_auth(session_id, db)
        
        return {
            "success": True,
            "user": auth_response.user.dict(),
            "access_token": auth_response.access_token,
            "session_token": session_token
        }
        
    except Exception as e:
        logger.error(f"Google session auth error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@api_router.post("/auth/logout")
async def logout_user(request: Request, response: Response, db = Depends(get_database)):
    """Logout user and clear session"""
    try:
        # Get session token from cookie
        session_token = request.cookies.get("session_token")
        
        if session_token:
            await logout_session(session_token, db)
        
        # Clear cookie
        response.delete_cookie(key="session_token", path="/")
        
        return {"message": "Logged out successfully"}
        
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return {"message": "Logged out"}

# Store endpoints
@api_router.post("/stores", response_model=Store)
async def create_store(
    store_data: StoreCreate,
    current_user: dict = Depends(get_store_admin_user),
    db = Depends(get_database)
):
    """Create a new store (Store admin only)"""
    store = Store(**store_data.dict(), owner_id=current_user["id"])
    result = await db.stores.insert_one(store.dict())
    
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create store"
        )
    
    # Update user's store_id
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$set": {"store_id": store.id}}
    )
    
    return store

@api_router.get("/stores", response_model=List[Store])
async def get_stores(
    skip: int = 0,
    limit: int = 20,
    db = Depends(get_database)
):
    """Get all active stores"""
    stores = await db.stores.find(
        {"is_active": True}
    ).skip(skip).limit(limit).to_list(limit)
    
    return [Store(**store) for store in stores]

@api_router.get("/stores/{store_id}", response_model=Store)
async def get_store(store_id: str, db = Depends(get_database)):
    """Get store by ID"""
    store = await db.stores.find_one({"id": store_id})
    if not store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Store not found"
        )
    return Store(**store)

# Category endpoints
@api_router.post("/categories", response_model=Category)
async def create_category(
    category_data: CategoryCreate,
    current_user: dict = Depends(get_store_admin_user),
    db = Depends(get_database)
):
    """Create a new category (Store admin only)"""
    category = Category(**category_data.dict())
    result = await db.categories.insert_one(category.dict())
    
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create category"
        )
    
    return category

@api_router.get("/categories", response_model=List[Category])
async def get_categories(db = Depends(get_database)):
    """Get all active categories"""
    categories = await db.categories.find({"is_active": True}).to_list(100)
    return [Category(**category) for category in categories]

# Product endpoints
@api_router.post("/products", response_model=Product)
async def create_product(
    product_data: ProductCreate,
    current_user: dict = Depends(get_store_admin_user),
    db = Depends(get_database)
):
    """Create a new product (Store admin only)"""
    if not current_user.get("store_id"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User must be associated with a store"
        )
    
    product = Product(**product_data.dict(), store_id=current_user["store_id"])
    result = await db.products.insert_one(product.dict())
    
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create product"
        )
    
    return product

@api_router.get("/products", response_model=List[Product])
async def get_products(
    store_id: Optional[str] = None,
    category_id: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db = Depends(get_database)
):
    """Get products with optional filters"""
    query = {"is_available": True}
    
    if store_id:
        query["store_id"] = store_id
    if category_id:
        query["category_id"] = category_id
    
    products = await db.products.find(query).skip(skip).limit(limit).to_list(limit)
    return [Product(**product) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str, db = Depends(get_database)):
    """Get product by ID"""
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return Product(**product)

# Include the router in the main app
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)