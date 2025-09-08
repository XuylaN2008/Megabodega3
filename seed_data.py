#!/usr/bin/env python3
"""
Seed test data for MegaBodega backend
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

async def seed_data():
    """Seed the database with test data"""
    
    # Connect to MongoDB
    mongo_url = os.getenv("MONGO_URL")
    db_name = os.getenv("DB_NAME", "test_database")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("🌱 Seeding test data...")
    
    # Categories
    categories = [
        {
            "id": "cat_ecuadorian_food",
            "name": "Comida Ecuatoriana",
            "description": "Platos tradicionales del Ecuador",
            "is_active": True
        },
        {
            "id": "cat_beverages",
            "name": "Bebidas",
            "description": "Bebidas refrescantes y calientes",
            "is_active": True
        },
        {
            "id": "cat_fruits",
            "name": "Frutas Tropicales",
            "description": "Frutas frescas del Ecuador",
            "is_active": True
        }
    ]
    
    # Insert categories
    for category in categories:
        await db.categories.update_one(
            {"id": category["id"]}, 
            {"$set": category}, 
            upsert=True
        )
    
    print(f"✅ Inserted {len(categories)} categories")
    
    # Stores
    stores = [
        {
            "id": "store_mamas_kitchen",
            "name": "Cocina de la Mamá",
            "description": "Comida casera ecuatoriana",
            "address": "Av. Amazonas 123, Quito",
            "phone": "+593223456789",
            "email": "info@cocinadelamama.ec",
            "is_active": True,
            "owner_id": "owner_1",
            "delivery_zones": ["Centro", "Norte"],
            "min_order_amount": 10.0,
            "delivery_fee": 2.5
        },
        {
            "id": "store_tropical_fruits",
            "name": "Frutas del Trópico",
            "description": "Frutas frescas y jugos naturales",
            "address": "Mercado Central, Quito",
            "phone": "+593987654321",
            "email": "ventas@frutastropico.ec",
            "is_active": True,
            "owner_id": "owner_2",
            "delivery_zones": ["Centro", "Sur"],
            "min_order_amount": 5.0,
            "delivery_fee": 1.5
        }
    ]
    
    # Insert stores
    for store in stores:
        await db.stores.update_one(
            {"id": store["id"]}, 
            {"$set": store}, 
            upsert=True
        )
    
    print(f"✅ Inserted {len(stores)} stores")
    
    # Products
    products = [
        # Ecuadorian Food from Cocina de la Mamá
        {
            "id": "prod_llapingachos",
            "name": "Llapingachos",
            "description": "Tortillas de papa rellenas con queso, servidas con chorizo y huevo frito",
            "price": 8.50,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_ecuadorian_food",
            "is_available": True,
            "stock_quantity": 20,
            "unit": "plato"
        },
        {
            "id": "prod_locro_papas",
            "name": "Locro de Papas",
            "description": "Sopa cremosa de papas con queso y aguacate",
            "price": 6.00,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_ecuadorian_food",
            "is_available": True,
            "stock_quantity": 15,
            "unit": "plato"
        },
        {
            "id": "prod_seco_cabrito",
            "name": "Seco de Cabrito",
            "description": "Guiso tradicional de cabrito con frijoles y cilantro",
            "price": 12.00,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_ecuadorian_food",
            "is_available": True,
            "stock_quantity": 10,
            "unit": "plato"
        },
        {
            "id": "prod_ceviche_pescado",
            "name": "Ceviche de Pescado",
            "description": "Pescado fresco marinado en limón con cebolla y cilantro",
            "price": 9.50,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_ecuadorian_food",
            "is_available": True,
            "stock_quantity": 12,
            "unit": "plato"
        },
        # Beverages from Cocina de la Mamá
        {
            "id": "prod_chicha_morada",
            "name": "Chicha Morada",
            "description": "Bebida tradicional de maíz morado con especias",
            "price": 3.50,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_beverages",
            "is_available": True,
            "stock_quantity": 25,
            "unit": "vaso"
        },
        {
            "id": "prod_agua_panela",
            "name": "Agua de Panela",
            "description": "Bebida caliente de panela con limón",
            "price": 2.50,
            "store_id": "store_mamas_kitchen",
            "category_id": "cat_beverages",
            "is_available": True,
            "stock_quantity": 30,
            "unit": "vaso"
        },
        # Fruits from Frutas del Trópico
        {
            "id": "prod_mango_tommy",
            "name": "Mango Tommy",
            "description": "Mangos maduros y dulces, perfectos para jugos",
            "price": 1.50,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "is_available": True,
            "stock_quantity": 50,
            "unit": "unidad"
        },
        {
            "id": "prod_papaya_hawaiana",
            "name": "Papaya Hawaiana",
            "description": "Papaya fresca y jugosa, rica en vitaminas",
            "price": 2.00,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "is_available": True,
            "stock_quantity": 30,
            "unit": "unidad"
        },
        {
            "id": "prod_pina_golden",
            "name": "Piña Golden",
            "description": "Piña dorada, perfecta para jugos y postres",
            "price": 3.00,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "is_available": True,
            "stock_quantity": 20,
            "unit": "unidad"
        },
        {
            "id": "prod_maracuya",
            "name": "Maracuyá",
            "description": "Fruta de la pasión, ideal para jugos y postres",
            "price": 0.75,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "is_available": True,
            "stock_quantity": 40,
            "unit": "unidad"
        },
        {
            "id": "prod_guanabana",
            "name": "Guanábana",
            "description": "Fruta tropical cremosa, perfecta para batidos",
            "price": 4.50,
            "store_id": "store_tropical_fruits",
            "category_id": "cat_fruits",
            "is_available": True,
            "stock_quantity": 15,
            "unit": "unidad"
        }
    ]
    
    # Insert products
    for product in products:
        await db.products.update_one(
            {"id": product["id"]}, 
            {"$set": product}, 
            upsert=True
        )
    
    print(f"✅ Inserted {len(products)} products")
    
    # Close connection
    client.close()
    
    print("🎉 Database seeding completed successfully!")
    print(f"   - {len(categories)} categories")
    print(f"   - {len(stores)} stores") 
    print(f"   - {len(products)} products")

if __name__ == "__main__":
    asyncio.run(seed_data())