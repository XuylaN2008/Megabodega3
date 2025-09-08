from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from payment_service import PaymentService
from payment_models import CheckoutRequest
from auth import get_current_user_optional
from database import get_database
import logging

logger = logging.getLogger(__name__)

payment_router = APIRouter(prefix="/api/payments", tags=["payments"])

# Initialize payment service
payment_service = PaymentService()

@payment_router.get("/packages")
async def get_payment_packages():
    """Get available payment packages"""
    return {
        "packages": payment_service.get_payment_packages(),
        "currency": "USD"
    }

@payment_router.post("/checkout/session")
async def create_checkout_session(
    checkout_request: CheckoutRequest,
    request: Request,
    current_user = Depends(get_current_user_optional),
    db = Depends(get_database)
):
    """Create a Stripe checkout session for a fixed package"""
    
    # Get user info if authenticated
    user_id = current_user.get("id") if current_user else None
    user_email = current_user.get("email") if current_user else None
    
    # Add user info to metadata
    metadata = checkout_request.metadata or {}
    if user_id:
        metadata["user_id"] = user_id
    if user_email:
        metadata["user_email"] = user_email
    
    try:
        result = await payment_service.create_checkout_session(
            package_id=checkout_request.package_id,
            origin_url=checkout_request.origin_url,
            request=request,
            db=db,
            user_id=user_id,
            user_email=user_email,
            metadata=metadata
        )
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Checkout session creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@payment_router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, request: Request, db = Depends(get_database)):
    """Get the status of a checkout session"""
    
    try:
        result = await payment_service.get_checkout_status(session_id, request, db)
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Status check failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@payment_router.post("/webhook/stripe")
async def stripe_webhook(request: Request, db = Depends(get_database)):
    """Handle Stripe webhook events"""
    
    try:
        result = await payment_service.handle_webhook(request)
        return JSONResponse(content=result, status_code=200)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Webhook processing failed: {str(e)}")
        return JSONResponse(
            content={"error": "Webhook processing failed"}, 
            status_code=400
        )