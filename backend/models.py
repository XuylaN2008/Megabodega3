from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

class UserRole(str, Enum):
    CUSTOMER = "customer"
    STORE_ADMIN = "store_admin"
    DELIVERY = "delivery"
    COURIER = "courier"
    STAFF = "staff"

class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PREPARING = "preparing"
    READY = "ready"
    OUT_FOR_DELIVERY = "out_for_delivery"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

# User Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    full_name: str
    phone: str
    role: UserRole
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Role-specific fields
    store_id: Optional[str] = None  # For store admins
    delivery_zone: Optional[str] = None  # For delivery drivers

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    phone: str
    role: UserRole
    password: str
    store_id: Optional[str] = None
    delivery_zone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Store Models
class Store(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    address: str
    phone: str
    email: EmailStr
    is_active: bool = True
    owner_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    image_base64: Optional[str] = None
    delivery_zones: List[str] = []
    min_order_amount: float = 0.0
    delivery_fee: float = 0.0

class StoreCreate(BaseModel):
    name: str
    description: str
    address: str
    phone: str
    email: EmailStr
    image_base64: Optional[str] = None
    delivery_zones: List[str] = []
    min_order_amount: float = 0.0
    delivery_fee: float = 0.0

# Category Models
class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = None
    image_base64: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None
    image_base64: Optional[str] = None

# Product Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    store_id: str
    category_id: str
    image_base64: Optional[str] = None
    is_available: bool = True
    stock_quantity: int = 100
    unit: str = "unit"  # unit, kg, liter, etc.
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category_id: str
    image_base64: Optional[str] = None
    stock_quantity: int = 100
    unit: str = "unit"

# Address Models
class Address(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    full_name: str
    phone: str
    street_address: str
    city: str
    state: str
    postal_code: str
    is_default: bool = False
    delivery_instructions: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AddressCreate(BaseModel):
    full_name: str
    phone: str
    street_address: str
    city: str
    state: str
    postal_code: str
    is_default: bool = False
    delivery_instructions: Optional[str] = None

# Cart Models
class CartItem(BaseModel):
    product_id: str
    quantity: int
    price: float  # Price at time of adding to cart

class Cart(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    store_id: str
    items: List[CartItem] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Order Models
class OrderItem(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    unit_price: float
    total_price: float

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    store_id: str
    items: List[OrderItem]
    delivery_address: Address
    status: OrderStatus = OrderStatus.PENDING
    payment_status: PaymentStatus = PaymentStatus.PENDING
    payment_session_id: Optional[str] = None
    
    # Pricing
    subtotal: float
    delivery_fee: float
    tax_amount: float = 0.0
    total_amount: float
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    confirmed_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None
    
    # Assignment
    delivery_driver_id: Optional[str] = None
    estimated_delivery_time: Optional[datetime] = None
    
    # Notes
    customer_notes: Optional[str] = None
    internal_notes: Optional[str] = None

class OrderCreate(BaseModel):
    store_id: str
    items: List[OrderItem]
    delivery_address_id: str
    customer_notes: Optional[str] = None

# Payment Models
class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    user_id: str
    session_id: str
    amount: float
    currency: str = "USD"
    payment_status: PaymentStatus = PaymentStatus.PENDING
    stripe_payment_intent: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    metadata: Dict[str, Any] = {}

# Notification Models
class Notification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    message: str
    notification_type: str  # order_confirmed, order_preparing, order_delivered, etc.
    data: Dict[str, Any] = {}  # Extra data like order_id
    is_read: bool = False
    sent_at: datetime = Field(default_factory=datetime.utcnow)

class NotificationCreate(BaseModel):
    title: str
    message: str
    notification_type: str
    data: Dict[str, Any] = {}

# API Response Models
class AuthResponse(BaseModel):
    user: User
    access_token: str
    token_type: str = "bearer"

class MessageResponse(BaseModel):
    message: str

class ListResponse(BaseModel):
    items: List[Any]
    total: int
    page: int = 1
    limit: int = 20