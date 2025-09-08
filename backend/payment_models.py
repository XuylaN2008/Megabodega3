from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime
from enum import Enum

class PaymentStatus(str, Enum):
    INITIATED = "initiated"
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    EXPIRED = "expired"
    CANCELLED = "cancelled"

class CheckoutRequest(BaseModel):
    package_id: str = Field(..., description="Package identifier (small, medium, large)")
    origin_url: str = Field(..., description="Frontend origin URL for success/cancel redirects")
    metadata: Optional[Dict[str, str]] = Field(default_factory=dict, description="Additional metadata")

class PaymentTransaction(BaseModel):
    id: Optional[str] = None
    session_id: str
    user_id: Optional[str] = None
    user_email: Optional[str] = None
    amount: float
    currency: str
    package_id: str
    payment_status: PaymentStatus
    status: str  # Stripe session status
    metadata: Dict[str, str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)