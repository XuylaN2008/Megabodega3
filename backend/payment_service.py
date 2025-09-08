import os
from typing import Dict, Optional
from fastapi import HTTPException, Request
from dotenv import load_dotenv
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout, 
    CheckoutSessionResponse, 
    CheckoutStatusResponse, 
    CheckoutSessionRequest
)
from database import get_database
from payment_models import PaymentTransaction, PaymentStatus
from datetime import datetime
import logging

load_dotenv()

logger = logging.getLogger(__name__)

# Fixed payment packages - amounts are NOT accepted from frontend
PAYMENT_PACKAGES = {
    "small": {"amount": 5.00, "name": "Paquete Pequeño", "description": "Pedidos hasta $20"},
    "medium": {"amount": 10.00, "name": "Paquete Mediano", "description": "Pedidos de $20-50"},
    "large": {"amount": 15.00, "name": "Paquete Grande", "description": "Pedidos de $50+"},
    "delivery_fee": {"amount": 2.50, "name": "Tarifa de Envío", "description": "Costo de entrega estándar"}
}

class PaymentService:
    def __init__(self):
        self.stripe_api_key = os.getenv("STRIPE_API_KEY")
        if not self.stripe_api_key:
            raise ValueError("STRIPE_API_KEY environment variable is required")
        
    def _get_stripe_checkout(self, request: Request) -> StripeCheckout:
        """Initialize Stripe checkout with webhook URL"""
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        return StripeCheckout(api_key=self.stripe_api_key, webhook_url=webhook_url)
    
    async def create_checkout_session(
        self, 
        package_id: str, 
        origin_url: str, 
        request: Request,
        user_id: Optional[str] = None,
        user_email: Optional[str] = None,
        metadata: Optional[Dict[str, str]] = None
    ) -> Dict[str, str]:
        """Create a checkout session for a fixed package"""
        
        # Validate package exists
        if package_id not in PAYMENT_PACKAGES:
            raise HTTPException(status_code=400, detail=f"Invalid package_id: {package_id}")
        
        package = PAYMENT_PACKAGES[package_id]
        amount = package["amount"]
        
        # Build success and cancel URLs from origin
        success_url = f"{origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{origin_url}/payment/cancel"
        
        # Prepare metadata
        session_metadata = {
            "package_id": package_id,
            "user_id": user_id or "",
            "user_email": user_email or "",
            **(metadata or {})
        }
        
        try:
            # Initialize Stripe checkout
            stripe_checkout = self._get_stripe_checkout(request)
            
            # Create checkout session request
            checkout_request = CheckoutSessionRequest(
                amount=amount,
                currency="usd",
                success_url=success_url,
                cancel_url=cancel_url,
                metadata=session_metadata
            )
            
            # Create session with Stripe
            session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
            
            # Create payment transaction record BEFORE redirect
            transaction = PaymentTransaction(
                session_id=session.session_id,
                user_id=user_id,
                user_email=user_email,
                amount=amount,
                currency="usd",
                package_id=package_id,
                payment_status=PaymentStatus.INITIATED,
                status="open",  # Stripe session status
                metadata=session_metadata
            )
            
            # Insert into database
            result = await self.collection.insert_one(transaction.model_dump(exclude={"id"}))
            logger.info(f"Created payment transaction {result.inserted_id} for session {session.session_id}")
            
            return {
                "url": session.url,
                "session_id": session.session_id,
                "amount": amount,
                "package": package["name"]
            }
            
        except Exception as e:
            logger.error(f"Error creating checkout session: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to create checkout session: {str(e)}")
    
    async def get_checkout_status(self, session_id: str, request: Request) -> Dict:
        """Get and update checkout session status"""
        
        try:
            # Get Stripe checkout instance
            stripe_checkout = self._get_stripe_checkout(request)
            
            # Get status from Stripe
            checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
            
            # Find existing transaction
            transaction = await self.collection.find_one({"session_id": session_id})
            if not transaction:
                raise HTTPException(status_code=404, detail="Payment transaction not found")
            
            # Determine new payment status
            new_payment_status = PaymentStatus.PENDING
            if checkout_status.payment_status == "paid":
                new_payment_status = PaymentStatus.PAID
            elif checkout_status.status in ["expired", "cancelled"]:
                new_payment_status = PaymentStatus.EXPIRED if checkout_status.status == "expired" else PaymentStatus.CANCELLED
            
            # Only update if status changed to avoid multiple processing
            if transaction["payment_status"] != new_payment_status:
                update_data = {
                    "payment_status": new_payment_status,
                    "status": checkout_status.status,
                    "updated_at": datetime.utcnow()
                }
                
                await self.collection.update_one(
                    {"session_id": session_id}, 
                    {"$set": update_data}
                )
                
                logger.info(f"Updated payment transaction {session_id} status to {new_payment_status}")
                
                # Perform post-payment operations only once for successful payments
                if new_payment_status == PaymentStatus.PAID and transaction["payment_status"] != PaymentStatus.PAID:
                    await self._handle_successful_payment(transaction, checkout_status)
            
            return {
                "session_id": session_id,
                "status": checkout_status.status,
                "payment_status": checkout_status.payment_status,
                "amount_total": checkout_status.amount_total / 100,  # Convert from cents
                "currency": checkout_status.currency,
                "metadata": checkout_status.metadata,
                "package_info": PAYMENT_PACKAGES.get(transaction.get("package_id", ""), {})
            }
            
        except Exception as e:
            logger.error(f"Error getting checkout status: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to get checkout status: {str(e)}")
    
    async def _handle_successful_payment(self, transaction: Dict, checkout_status: CheckoutStatusResponse):
        """Handle successful payment - implement business logic here"""
        logger.info(f"Processing successful payment for session {transaction['session_id']}")
        
        # TODO: Implement business logic for successful payments
        # Examples:
        # - Update user credits/balance
        # - Send confirmation email
        # - Update order status
        # - Trigger delivery process
        
        package_id = transaction.get("package_id")
        amount = checkout_status.amount_total / 100
        
        logger.info(f"Payment successful: {package_id} package for ${amount}")
    
    async def handle_webhook(self, request: Request) -> Dict:
        """Handle Stripe webhook events"""
        try:
            # Get raw body and signature
            body = await request.body()
            signature = request.headers.get("Stripe-Signature")
            
            if not signature:
                raise HTTPException(status_code=400, detail="Missing Stripe signature")
            
            # Initialize Stripe checkout
            stripe_checkout = self._get_stripe_checkout(request)
            
            # Handle webhook
            webhook_response = await stripe_checkout.handle_webhook(body, signature)
            
            logger.info(f"Webhook received: {webhook_response.event_type} for session {webhook_response.session_id}")
            
            # Update transaction based on webhook event
            if webhook_response.session_id:
                # Find and update transaction
                transaction = await self.collection.find_one({"session_id": webhook_response.session_id})
                if transaction:
                    new_status = PaymentStatus.PAID if webhook_response.payment_status == "paid" else PaymentStatus.PENDING
                    
                    if transaction["payment_status"] != new_status:
                        await self.collection.update_one(
                            {"session_id": webhook_response.session_id},
                            {"$set": {
                                "payment_status": new_status,
                                "updated_at": datetime.utcnow()
                            }}
                        )
                        
                        # Handle successful payment
                        if new_status == PaymentStatus.PAID:
                            await self._handle_successful_payment(transaction, webhook_response)
            
            return {
                "event_type": webhook_response.event_type,
                "session_id": webhook_response.session_id,
                "status": "processed"
            }
            
        except Exception as e:
            logger.error(f"Webhook error: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Webhook processing failed: {str(e)}")
    
    def get_payment_packages(self) -> Dict[str, Dict]:
        """Get available payment packages"""
        return PAYMENT_PACKAGES