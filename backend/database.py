from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database = None

db = Database()

async def get_database():
    return db.database

async def connect_to_mongo():
    """Create database connection"""
    mongo_url = os.getenv("MONGO_URL")
    db_name = os.getenv("DB_NAME", "delivery_app")
    
    db.client = AsyncIOMotorClient(mongo_url)
    db.database = db.client[db_name]
    
    # Create indexes for performance
    await create_indexes()

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()

async def create_indexes():
    """Create database indexes for better performance"""
    if db.database is None:
        return
    
    # User indexes
    await db.database.users.create_index("email", unique=True)
    await db.database.users.create_index("role")
    
    # Product indexes
    await db.database.products.create_index("store_id")
    await db.database.products.create_index("category_id")
    await db.database.products.create_index("is_available")
    
    # Order indexes
    await db.database.orders.create_index("user_id")
    await db.database.orders.create_index("store_id")
    await db.database.orders.create_index("status")
    await db.database.orders.create_index("created_at")
    
    # Cart indexes
    await db.database.carts.create_index("user_id")
    await db.database.carts.create_index("store_id")
    
    # Address indexes
    await db.database.addresses.create_index("user_id")
    
    # Notification indexes
    await db.database.notifications.create_index("user_id")
    await db.database.notifications.create_index("is_read")
    
    # Payment transaction indexes
    await db.database.payment_transactions.create_index("session_id", unique=True)
    await db.database.payment_transactions.create_index("order_id")
    await db.database.payment_transactions.create_index("user_id")