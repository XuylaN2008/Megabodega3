#!/usr/bin/env python3
"""
Seed script to populate the database with sample products for Ecuador Delivery App
"""

import asyncio
import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.append(str(backend_dir))

# Load environment variables
load_dotenv(backend_dir / '.env')

from database import connect_to_mongo, get_database
from models import Store, Category, Product
import base64

# Sample product images in base64 format (small placeholders)
SAMPLE_IMAGES = {
    "empanada": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "ceviche": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "hornado": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "coffee": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "fruit": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
}

async def seed_data():
    """Seed the database with sample data"""
    # Connect to database
    await connect_to_mongo()
    db = await get_database()
    
    print("🌱 Starting database seeding...")
    
    # Clear existing data
    await db.stores.delete_many({})
    await db.categories.delete_many({})
    await db.products.delete_many({})
    print("🗑️  Cleared existing data")
    
    # Create categories
    categories_data = [
        {
            "id": "cat_ecuadorian_food",
            "name": "Comida Ecuatoriana",
            "description": "Platos tradicionales del Ecuador",
            "image_base64": SAMPLE_IMAGES["empanada"],
            "is_active": True
        },
        {
            "id": "cat_beverages",
            "name": "Bebidas",
            "description": "Bebidas refrescantes y calientes",
            "image_base64": SAMPLE_IMAGES["coffee"],
            "is_active": True
        },
        {
            "id": "cat_fruits",
            "name": "Frutas Tropicales",
            "description": "Frutas frescas del Ecuador",
            "image_base64": SAMPLE_IMAGES["fruit"],
            "is_active": True
        }
    ]
    
    for cat_data in categories_data:
        category = Category(**cat_data)
        await db.categories.insert_one(category.dict())
    
    print("✅ Created categories")
    
    # Create stores
    stores_data = [
        {
            "id": "store_mamas_kitchen",
            "name": "Cocina de la Mamá",
            "description": "Comida tradicional ecuatoriana hecha con amor",
            "address": "Av. Amazonas 123, Quito",
            "phone": "+593-2-234-5678",
            "email": "info@cocinamama.ec",
            "is_active": True,
            "owner_id": "admin_mama",
            "image_base64": SAMPLE_IMAGES["empanada"],
            "delivery_zones": ["Norte de Quito", "Centro de Quito"],
            "min_order_amount": 15.0,
            "delivery_fee": 2.5
        },
        {
            "id": "store_tropical_fruits",
            "name": "Frutas del Trópico",
            "description": "Las mejores frutas tropicales de Ecuador",
            "address": "Mercado Central, Guayaquil",
            "phone": "+593-4-123-4567",
            "email": "ventas@frutastropico.ec",
            "is_active": True,
            "owner_id": "admin_fruits",
            "image_base64": SAMPLE_IMAGES["fruit"],
            "delivery_zones": ["Guayaquil Norte", "Guayaquil Sur"],
            "min_order_amount": 10.0,
            "delivery_fee": 3.0
        }
    ]
    
    for store_data in stores_data:
        store = Store(**store_data)
        await db.stores.insert_one(store.dict())
    
    print("✅ Created stores")
    
    # Create products
    products_data = [
        # Ecuadorian Food
        {
            "id": "prod_empanada_queso",
            "name": "Empanada de Queso",
            "description": "Deliciosa empanada rellena de queso fresco ecuatoriano",
            "price": 1.25,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_ecuadorian_food",
            "image_base64": SAMPLE_IMAGES["empanada"],
            "is_available": True,
            "stock_quantity": 50,
            "unit": "unidad"
        },
        {
            "id": "prod_empanada_carne",
            "name": "Empanada de Carne",
            "description": "Empanada crujiente con carne de res y especias",
            "price": 1.50,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_ecuadorian_food",
            "image_base64": SAMPLE_IMAGES["empanada"],
            "is_available": True,
            "stock_quantity": 40,
            "unit": "unidad"
        },
        {
            "id": "prod_ceviche_camaron",
            "name": "Ceviche de Camarón",
            "description": "Ceviche fresco con camarones del Pacífico ecuatoriano",
            "price": 8.50,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_ecuadorian_food",
            "image_base64": SAMPLE_IMAGES["ceviche"],
            "is_available": True,
            "stock_quantity": 20,
            "unit": "porción"
        },
        {
            "id": "prod_hornado",
            "name": "Hornado Tradicional",
            "description": "Cerdo hornado con mote, llapingachos y ensalada",
            "price": 12.00,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_ecuadorian_food",
            "image_base64": SAMPLE_IMAGES["hornado"],
            "is_available": True,
            "stock_quantity": 15,
            "unit": "plato"
        },
        
        # Beverages
        {
            "id": "prod_cafe_nacional",
            "name": "Café Nacional",
            "description": "Café 100% ecuatoriano de las montañas de Loja",
            "price": 2.00,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_beverages",
            "image_base64": SAMPLE_IMAGES["coffee"],
            "is_available": True,
            "stock_quantity": 30,
            "unit": "taza"
        },
        {
            "id": "prod_colada_morada",
            "name": "Colada Morada",
            "description": "Bebida tradicional ecuatoriana con frutas moradas",
            "price": 2.50,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_beverages",
            "image_base64": SAMPLE_IMAGES["coffee"],
            "is_available": True,
            "stock_quantity": 25,
            "unit": "vaso"
        },
        
        # Tropical Fruits
        {
            "id": "prod_mango_tommy",
            "name": "Mango Tommy",
            "description": "Mangos maduros y dulces de la costa ecuatoriana",
            "price": 0.75,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "image_base64": SAMPLE_IMAGES["fruit"],
            "is_available": True,
            "stock_quantity": 100,
            "unit": "unidad"
        },
        {
            "id": "prod_papaya",
            "name": "Papaya",
            "description": "Papaya fresca y jugosa, perfecta para el desayuno",
            "price": 1.50,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "image_base64": SAMPLE_IMAGES["fruit"],
            "is_available": True,
            "stock_quantity": 60,
            "unit": "unidad"
        },
        {
            "id": "prod_naranjilla",
            "name": "Naranjilla",
            "description": "Naranjilla ecuatoriana, ideal para jugos refrescantes",
            "price": 0.50,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "image_base64": SAMPLE_IMAGES["fruit"],
            "is_available": True,
            "stock_quantity": 80,
            "unit": "unidad"
        },
        {
            "id": "prod_guanabana",
            "name": "Guanábana",
            "description": "Guanábana cremosa y dulce, rica en vitaminas",
            "price": 3.00,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "image_base64": SAMPLE_IMAGES["fruit"],
            "is_available": True,
            "stock_quantity": 30,
            "unit": "unidad"
        },
        {
            "id": "prod_maracuya",
            "name": "Maracuyá",
            "description": "Maracuyá aromática, perfecta para postres y bebidas",
            "price": 0.40,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "image_base64": SAMPLE_IMAGES["fruit"],
            "is_available": True,
            "stock_quantity": 120,
            "unit": "unidad"
        }
    ]
    
    for prod_data in products_data:
        product = Product(**prod_data)
        await db.products.insert_one(product.dict())
    
    print("✅ Created products")
    
    # Print summary
    categories_count = await db.categories.count_documents({})
    stores_count = await db.stores.count_documents({})
    products_count = await db.products.count_documents({})
    
    print(f"\n🎉 Database seeding completed!")
    print(f"📊 Summary:")
    print(f"   • Categories: {categories_count}")
    print(f"   • Stores: {stores_count}")
    print(f"   • Products: {products_count}")
    print(f"\n🚀 Your Ecuador delivery app is ready with sample data!")

if __name__ == "__main__":
    asyncio.run(seed_data())