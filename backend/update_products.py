import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

# Улучшенные товары с переводами на 3 языка
IMPROVED_PRODUCTS = [
    # Комида эквадорская
    {
        "name": "Llapingachos",
        "name_en": "Potato Pancakes",
        "name_ru": "Картофельные оладьи",
        "description": "Tortillas de papa rellenas con queso, servidas con chorizo",
        "description_en": "Potato pancakes stuffed with cheese, served with chorizo",
        "description_ru": "Картофельные лепешки с сыром, подаются с чоризо",
        "price": 8.50,
        "category_id": "cat_ecuadorian",
        "store_id": "store_mama_kitchen",
        "in_stock": True,
        "image": "🥔"
    },
    {
        "name": "Locro de Papas",
        "name_en": "Potato Stew",
        "name_ru": "Картофельное рагу",
        "description": "Sopa cremosa de papas con queso y aguacate",
        "description_en": "Creamy potato soup with cheese and avocado",
        "description_ru": "Кремовый картофельный суп с сыром и авокадо",
        "price": 6.00,
        "category_id": "cat_ecuadorian",
        "store_id": "store_mama_kitchen",
        "in_stock": True,
        "image": "🍲"
    },
    {
        "name": "Seco de Cabrito",
        "name_en": "Goat Stew",
        "name_ru": "Рагу из козлятины",
        "description": "Guiso tradicional de cabrito con frijoles y yuca",
        "description_en": "Traditional goat stew with beans and yuca",
        "description_ru": "Традиционное рагу из козлятины с фасолью и юкой",
        "price": 12.00,
        "category_id": "cat_ecuadorian",
        "store_id": "store_mama_kitchen",
        "in_stock": True,
        "image": "🍖"
    },
    {
        "name": "Ceviche de Pescado",
        "name_en": "Fish Ceviche",
        "name_ru": "Севиче из рыбы",
        "description": "Pescado fresco marinado en limón con cebolla y cilantro",
        "description_en": "Fresh fish marinated in lemon with onion and cilantro",
        "description_ru": "Свежая рыба, маринованная в лимоне с луком и кинзой",
        "price": 9.50,
        "category_id": "cat_ecuadorian",
        "store_id": "store_mama_kitchen",
        "in_stock": True,
        "image": "🐟"
    },
    {
        "name": "Hornado",
        "name_en": "Roast Pork",
        "name_ru": "Жареная свинина",
        "description": "Cerdo asado con mote, llapingachos y ensalada",
        "description_en": "Roast pork with hominy, potato pancakes and salad",
        "description_ru": "Жареная свинина с кукурузой, картофельными оладьями и салатом",
        "price": 11.00,
        "category_id": "cat_ecuadorian",
        "store_id": "store_mama_kitchen",
        "in_stock": True,
        "image": "🐷"
    },
    # Bebida
    {
        "name": "Chicha Morada",
        "name_en": "Purple Corn Drink",
        "name_ru": "Напиток из фиолетовой кукурузы",
        "description": "Bebida tradicional de maíz morado con especias",
        "description_en": "Traditional purple corn drink with spices",
        "description_ru": "Традиционный напиток из фиолетовой кукурузы со специями",
        "price": 3.50,
        "category_id": "cat_drinks",
        "store_id": "store_tropical_fruits",
        "in_stock": True,
        "image": "🍷"
    },
    {
        "name": "Jugo de Maracuyá",
        "name_en": "Passion Fruit Juice",
        "name_ru": "Сок маракуйи",
        "description": "Jugo natural de maracuyá fresco",
        "description_en": "Fresh passion fruit natural juice",
        "description_ru": "Натуральный сок свежей маракуйи",
        "price": 4.00,
        "category_id": "cat_drinks",
        "store_id": "store_tropical_fruits",
        "in_stock": True,
        "image": "🧃"
    },
    {
        "name": "Colada Morada",
        "name_en": "Purple Berry Drink",
        "name_ru": "Фиолетовый ягодный напиток",
        "description": "Bebida espesa de frutas moradas y especias",
        "description_en": "Thick drink made with purple fruits and spices",
        "description_ru": "Густой напиток из фиолетовых фруктов и специй",
        "price": 3.00,
        "category_id": "cat_drinks",
        "store_id": "store_tropical_fruits",
        "in_stock": True,
        "image": "🍵"
    },
    # Фрукты тропические
    {
        "name": "Naranjilla",
        "name_en": "Lulo Fruit",
        "name_ru": "Наранхилья",
        "description": "Fruta cítrica tropical, ideal para jugos",
        "description_en": "Tropical citrus fruit, perfect for juices",
        "description_ru": "Тропический цитрусовый фрукт, идеален для соков",
        "price": 2.50,
        "category_id": "cat_fruits",
        "store_id": "store_tropical_fruits",
        "in_stock": True,
        "image": "🍊"
    },
    {
        "name": "Guanábana",
        "name_en": "Soursop",
        "name_ru": "Сметанное яблоко",
        "description": "Fruta cremosa con sabor único y propiedades medicinales",
        "description_en": "Creamy fruit with unique flavor and medicinal properties",
        "description_ru": "Кремовый фрукт с уникальным вкусом и лечебными свойствами",
        "price": 5.00,
        "category_id": "cat_fruits",
        "store_id": "store_tropical_fruits",
        "in_stock": True,
        "image": "🍈"
    },
    {
        "name": "Tomate de Árbol",
        "name_en": "Tree Tomato",
        "name_ru": "Древесный томат",
        "description": "Fruta ácida perfecta para batidos y mermeladas",
        "description_en": "Tart fruit perfect for smoothies and jams",
        "description_ru": "Кислый фрукт, идеальный для смузи и джемов",
        "price": 3.00,
        "category_id": "cat_fruits",
        "store_id": "store_tropical_fruits",
        "in_stock": True,
        "image": "🍅"
    }
]

async def update_products():
    try:
        client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
        db = client.megabodega_db
        
        # Очищаем старые товары
        await db.products.delete_many({})
        print("Deleted old products")
        
        # Добавляем новые улучшенные товары
        result = await db.products.insert_many(IMPROVED_PRODUCTS)
        print(f"Inserted {len(result.inserted_ids)} new products")
        
        # Показываем добавленные товары
        products = []
        async for product in db.products.find():
            products.append(product["name"])
        
        print(f"Updated products: {', '.join(products)}")
        
        client.close()
        
    except Exception as e:
        print(f"Error updating products: {e}")

if __name__ == "__main__":
    asyncio.run(update_products())