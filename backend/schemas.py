from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class InvitationRole(str, Enum):
    COURIER = "courier"
    STAFF = "staff"

# Invitation Models
class InvitationCode(BaseModel):
    id: str = Field(default_factory=lambda: str(__import__('uuid').uuid4()))
    code: str
    role: InvitationRole
    created_by: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime
    is_used: bool = False
    used_by: Optional[str] = None
    used_at: Optional[datetime] = None

class InvitationCodeCreate(BaseModel):
    role: InvitationRole
    expires_in_days: int = 30

class InvitationCodeValidate(BaseModel):
    code: str
    role: InvitationRole

class InvitationCodeResponse(BaseModel):
    code: str
    role: InvitationRole
    created_at: datetime
    expires_at: datetime
    is_used: bool
    used_by: Optional[str] = None
    used_at: Optional[datetime] = None

# Enhanced User Registration with Invitation Code
class UserCreateWithInvitation(BaseModel):
    email: EmailStr
    full_name: str
    phone: str
    role: str  # "customer", "courier", or "staff"
    password: str
    invitation_code: Optional[str] = None  # Required for courier and staff roles
    store_id: Optional[str] = None
    delivery_zone: Optional[str] = None

# City/Location Models for Baños de Agua Santa filtering
class DeliveryLocation(BaseModel):
    city: str = "Baños de Agua Santa"
    state: str = "Tungurahua"
    country: str = "Ecuador"
    is_active: bool = True

class LocationFilter(BaseModel):
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None

# Theme Models
class UserThemePreference(BaseModel):
    user_id: str
    theme: str = "light"  # "light" or "dark"
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ThemeUpdateRequest(BaseModel):
    theme: str  # "light" or "dark"