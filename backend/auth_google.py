from fastapi import HTTPException, Depends, Request, Response
from fastapi.responses import RedirectResponse
import requests
import os
from datetime import datetime, timedelta
from database import get_database
from models import User, UserRole, AuthResponse
import uuid
from auth import create_access_token

# Emergent Auth configuration
EMERGENT_AUTH_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"
EMERGENT_LOGIN_URL = "https://auth.emergentagent.com/"

async def handle_google_auth(session_id: str, db) -> AuthResponse:
    """
    Handle Google OAuth authentication via Emergent Auth
    """
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID is required")
    
    try:
        # Call Emergent Auth API to get user data
        headers = {"X-Session-ID": session_id}
        response = requests.get(EMERGENT_AUTH_URL, headers=headers, timeout=10)
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=401, 
                detail="Invalid session or authentication failed"
            )
        
        user_data = response.json()
        
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user_data["email"]})
        
        if existing_user:
            # User exists, update session token
            session_token = user_data["session_token"]
            await db.user_sessions.update_one(
                {"user_id": existing_user["id"]},
                {
                    "$set": {
                        "session_token": session_token,
                        "expires_at": datetime.utcnow() + timedelta(days=7),
                        "updated_at": datetime.utcnow()
                    }
                },
                upsert=True
            )
            
            user = User(**existing_user)
        else:
            # Create new user
            new_user = User(
                id=str(uuid.uuid4()),
                email=user_data["email"],
                full_name=user_data["name"],
                phone="",  # Not provided by Google OAuth
                role=UserRole.CUSTOMER,  # Default role
                is_active=True,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            
            # Insert user into database
            user_doc = new_user.dict()
            await db.users.insert_one(user_doc)
            
            # Store session
            session_token = user_data["session_token"]
            await db.user_sessions.insert_one({
                "user_id": new_user.id,
                "session_token": session_token,
                "created_at": datetime.utcnow(),
                "expires_at": datetime.utcnow() + timedelta(days=7)
            })
            
            user = new_user
        
        # Create JWT access token for compatibility
        access_token = create_access_token(data={"sub": user.email})
        
        return AuthResponse(
            user=user,
            access_token=access_token
        ), user_data["session_token"]
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to connect to authentication service: {str(e)}"
        )
    except KeyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Invalid response from authentication service: missing {str(e)}"
        )

async def get_user_by_session_token(session_token: str, db) -> User:
    """Get user by session token"""
    session = await db.user_sessions.find_one({
        "session_token": session_token,
        "expires_at": {"$gt": datetime.utcnow()}
    })
    
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    user = await db.users.find_one({"id": session["user_id"]})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return User(**user)

async def logout_session(session_token: str, db) -> bool:
    """Logout user by removing session"""
    result = await db.user_sessions.delete_one({"session_token": session_token})
    return result.deleted_count > 0

def get_google_login_url(redirect_url: str) -> str:
    """Generate Google login URL with redirect"""
    return f"{EMERGENT_LOGIN_URL}?redirect={redirect_url}"