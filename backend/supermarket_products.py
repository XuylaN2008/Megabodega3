import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

# Категории супермаркета для Baños de Agua Santa
SUPERMARKET_CATEGORIES = [
    {
        "id": "dairy",
        "name": "Lácteos",
        "name_en": "Dairy Products", 
        "name_ru": "Молочные продукты",
        "description": "Leche, quesos, yogures y productos lácteos frescos",
        "description_en": "Milk, cheese, yogurt and fresh dairy products",
        "description_ru": "Молоко, сыр, йогурт и свежие молочные продукты",
        "icon": "🥛",
        "color": "#2196F3"
    },
    {
        "id": "meat",
        "name": "Carnes y Aves",
        "name_en": "Meat & Poultry",
        "name_ru": "Мясо и птица", 
        "description": "Carnes frescas, pollo, cerdo y embutidos",
        "description_en": "Fresh meat, chicken, pork and cold cuts",
        "description_ru": "Свежее мясо, курица, свинина и колбасы",
        "icon": "🍖",
        "color": "#F44336"
    },
    {
        "id": "fish",
        "name": "Pescados y Mariscos",
        "name_en": "Fish & Seafood",
        "name_ru": "Рыба и морепродукты",
        "description": "Pescados frescos y mariscos del Pacífico",
        "description_en": "Fresh fish and Pacific seafood",
        "description_ru": "Свежая рыба и морепродукты Тихого океана",
        "icon": "🐟",
        "color": "#00BCD4"
    },
    {
        "id": "bakery",
        "name": "Panadería",
        "name_en": "Bakery",
        "name_ru": "Хлеб и выпечка",
        "description": "Pan fresco, pasteles y productos de panadería",
        "description_en": "Fresh bread, cakes and bakery products", 
        "description_ru": "Свежий хлеб, торты и хлебобулочные изделия",
        "icon": "🍞",
        "color": "#FF9800"
    },
    {
        "id": "produce",
        "name": "Frutas y Verduras",
        "name_en": "Fruits & Vegetables",
        "name_ru": "Фрукты и овощи",
        "description": "Productos frescos locales y tropicales",
        "description_en": "Fresh local and tropical produce",
        "description_ru": "Свежие местные и тропические продукты",
        "icon": "🥗",
        "color": "#4CAF50"
    },
    {
        "id": "canned",
        "name": "Conservas y Enlatados",
        "name_en": "Canned & Preserved",
        "name_ru": "Консервы",
        "description": "Conservas, salsas y productos enlatados",
        "description_en": "Preserves, sauces and canned products",
        "description_ru": "Консервы, соусы и консервированные продукты",
        "icon": "🥫",
        "color": "#795548"
    },
    {
        "id": "snacks",
        "name": "Dulces y Snacks",
        "name_en": "Sweets & Snacks", 
        "name_ru": "Сладости и снеки",
        "description": "Chocolates, dulces y bocadillos",
        "description_en": "Chocolates, sweets and snacks",
        "description_ru": "Шоколад, сладости и закуски",
        "icon": "🍫",
        "color": "#E91E63"
    },
    {
        "id": "household",
        "name": "Hogar y Limpieza",
        "name_en": "Household & Cleaning",
        "name_ru": "Бытовая химия",
        "description": "Productos de limpieza y hogar",
        "description_en": "Cleaning and household products",
        "description_ru": "Товары для уборки и дома",
        "icon": "🧴",
        "color": "#9C27B0"
    }
]

# Продукты супермаркета для Baños de Agua Santa  
SUPERMARKET_PRODUCTS = [
    # Lácteos
    {
        "name": "Leche Entera Vita",
        "name_en": "Vita Whole Milk",
        "name_ru": "Цельное молоко Вита",
        "description": "Leche entera pasteurizada, 1 litro",
        "description_en": "Pasteurized whole milk, 1 liter",
        "description_ru": "Пастеризованное цельное молоко, 1 литр",
        "price": 1.25,
        "category_id": "dairy",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 50,
        "image": "🥛",
        "unit": "litro",
        "brand": "Vita"
    },
    {
        "name": "Queso Fresco Andino",
        "name_en": "Andean Fresh Cheese",
        "name_ru": "Андский свежий сыр",
        "description": "Queso fresco artesanal de la sierra, 500g",
        "description_en": "Artisanal fresh cheese from the highlands, 500g", 
        "description_ru": "Ремесленный свежий сыр из горной местности, 500г",
        "price": 3.50,
        "category_id": "dairy",
        "store_id": "store_megabodega_banos", 
        "in_stock": True,
        "stock_quantity": 25,
        "image": "🧀",
        "unit": "unidad",
        "brand": "Andino"
    },
    {
        "name": "Yogur Natural Toni",
        "name_en": "Toni Natural Yogurt",
        "name_ru": "Натуральный йогурт Тони",
        "description": "Yogur natural sin azúcar, pack 4 unidades",
        "description_en": "Natural yogurt without sugar, 4-pack",
        "description_ru": "Натуральный йогурт без сахара, упаковка 4 шт",
        "price": 2.80,
        "category_id": "dairy",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 30,
        "image": "🥛",
        "unit": "pack",
        "brand": "Toni"
    },
    
    # Carnes y Aves
    {
        "name": "Pollo Entero Mr. Pollo",
        "name_en": "Mr. Pollo Whole Chicken",
        "name_ru": "Целая курица Мистер Поло",
        "description": "Pollo entero fresco, aproximadamente 2kg",
        "description_en": "Fresh whole chicken, approximately 2kg",
        "description_ru": "Свежая целая курица, примерно 2кг",
        "price": 6.50,
        "category_id": "meat",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 15,
        "image": "🐔",
        "unit": "unidad",
        "brand": "Mr. Pollo"
    },
    {
        "name": "Carne de Res Molida",
        "name_en": "Ground Beef",
        "name_ru": "Говяжий фарш",
        "description": "Carne molida fresca de res, 500g",
        "description_en": "Fresh ground beef, 500g",
        "description_ru": "Свежий говяжий фарш, 500г",
        "price": 4.75,
        "category_id": "meat",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 20,
        "image": "🥩",
        "unit": "libra",
        "brand": "Local"
    },
    
    # Pescados y Mariscos
    {
        "name": "Atún Enlatado Van Camp's",
        "name_en": "Van Camp's Canned Tuna",
        "name_ru": "Консервированный тунец Ван Кэмп",
        "description": "Atún en agua, lata de 185g",
        "description_en": "Tuna in water, 185g can",
        "description_ru": "Тунец в воде, банка 185г",
        "price": 1.95,
        "category_id": "fish",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 40,
        "image": "🐟",
        "unit": "lata",
        "brand": "Van Camp's"
    },
    {
        "name": "Tilapia Fresca",
        "name_en": "Fresh Tilapia",
        "name_ru": "Свежая тилапия",
        "description": "Filete de tilapia fresca, por libra",
        "description_en": "Fresh tilapia fillet, per pound",
        "description_ru": "Филе свежей тилапии, за фунт",
        "price": 3.25,
        "category_id": "fish",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 12,
        "image": "🐠",
        "unit": "libra",
        "brand": "Local"
    },
    
    # Panadería
    {
        "name": "Pan de Molde Bimbo",
        "name_en": "Bimbo Sliced Bread",
        "name_ru": "Нарезной хлеб Бимбо",
        "description": "Pan de molde integral, 680g",
        "description_en": "Whole wheat sliced bread, 680g",
        "description_ru": "Цельнозерновой нарезной хлеб, 680г",
        "price": 1.85,
        "category_id": "bakery",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 35,
        "image": "🍞",
        "unit": "unidad",
        "brand": "Bimbo"
    },
    {
        "name": "Croissants Dulces",
        "name_en": "Sweet Croissants",
        "name_ru": "Сладкие круассаны",
        "description": "Croissants dulces recién horneados, pack 6",
        "description_en": "Freshly baked sweet croissants, 6-pack",
        "description_ru": "Свежеиспеченные сладкие круассаны, упаковка 6 шт",
        "price": 3.20,
        "category_id": "bakery",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 18,
        "image": "🥐",
        "unit": "pack",
        "brand": "Local"
    },
    
    # Frutas y Verduras
    {
        "name": "Bananas Ecuatorianas",
        "name_en": "Ecuadorian Bananas",
        "name_ru": "Эквадорские бананы",
        "description": "Bananas frescas premium del Ecuador, por libra",
        "description_en": "Premium fresh Ecuadorian bananas, per pound",
        "description_ru": "Премиальные свежие эквадорские бананы, за фунт",
        "price": 0.75,
        "category_id": "produce",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 100,
        "image": "🍌",
        "unit": "libra",
        "brand": "Local"
    },
    {
        "name": "Tomates Riñón",
        "name_en": "Beefsteak Tomatoes",
        "name_ru": "Помидоры мясистые",
        "description": "Tomates riñón frescos, por libra",
        "description_en": "Fresh beefsteak tomatoes, per pound",
        "description_ru": "Свежие мясистые помидоры, за фунт",
        "price": 1.20,
        "category_id": "produce",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 60,
        "image": "🍅",
        "unit": "libra",
        "brand": "Local"
    },
    {
        "name": "Aguacates Hass",
        "name_en": "Hass Avocados",
        "name_ru": "Авокадо Хасс",
        "description": "Aguacates Hass maduros, por unidad",
        "description_en": "Ripe Hass avocados, per unit",
        "description_ru": "Спелые авокадо Хасс, за штуку",
        "price": 0.85,
        "category_id": "produce",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 45,
        "image": "🥑",
        "unit": "unidad",
        "brand": "Local"
    },
    
    # Conservas y Enlatados  
    {
        "name": "Arroz Extra Arrocesa",
        "name_en": "Arrocesa Extra Rice",
        "name_ru": "Рис экстра Арросеса",
        "description": "Arroz extra largo, saco de 2kg",
        "description_en": "Extra long grain rice, 2kg bag",
        "description_ru": "Рис экстра длинный, мешок 2кг",
        "price": 2.45,
        "category_id": "canned",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 55,
        "image": "🍚",
        "unit": "saco",
        "brand": "Arrocesa"
    },
    {
        "name": "Aceite Girasol La Favorita",
        "name_en": "La Favorita Sunflower Oil",
        "name_ru": "Подсолнечное масло Ла Фаворита",
        "description": "Aceite de girasol puro, botella 1L",
        "description_en": "Pure sunflower oil, 1L bottle",
        "description_ru": "Чистое подсолнечное масло, бутылка 1л",
        "price": 3.85,
        "category_id": "canned",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 28,
        "image": "🫒",
        "unit": "botella",
        "brand": "La Favorita"
    },
    
    # Dulces y Snacks
    {
        "name": "Chocolate Nestlé",
        "name_en": "Nestlé Chocolate",
        "name_ru": "Шоколад Нестле",
        "description": "Chocolate con leche Nestlé, tableta 90g",
        "description_en": "Nestlé milk chocolate bar, 90g",
        "description_ru": "Молочный шоколад Нестле, плитка 90г",
        "price": 1.65,
        "category_id": "snacks",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 48,
        "image": "🍫",
        "unit": "tableta",
        "brand": "Nestlé"
    },
    {
        "name": "Papas Fritas Pringles",
        "name_en": "Pringles Potato Chips",
        "name_ru": "Картофельные чипсы Принглс",
        "description": "Papas fritas Pringles original, lata 124g",
        "description_en": "Pringles original potato chips, 124g can",
        "description_ru": "Картофельные чипсы Принглс оригинал, банка 124г",
        "price": 2.95,
        "category_id": "snacks",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 32,
        "image": "🥔",
        "unit": "lata",
        "brand": "Pringles"
    },
    
    # Hogar y Limpieza
    {
        "name": "Detergente Ariel",
        "name_en": "Ariel Detergent",
        "name_ru": "Стиральный порошок Ариэль",
        "description": "Detergente en polvo Ariel, 1kg",
        "description_en": "Ariel powder detergent, 1kg",
        "description_ru": "Стиральный порошок Ариэль, 1кг",
        "price": 4.25,
        "category_id": "household",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 22,
        "image": "🧴",
        "unit": "caja",
        "brand": "Ariel"
    },
    {
        "name": "Papel Higiénico Familia",
        "name_en": "Familia Toilet Paper",
        "name_ru": "Туалетная бумага Фамилия",
        "description": "Papel higiénico suave, pack 12 rollos",
        "description_en": "Soft toilet paper, 12-roll pack",
        "description_ru": "Мягкая туалетная бумага, упаковка 12 рулонов",
        "price": 6.75,
        "category_id": "household",
        "store_id": "store_megabodega_banos",
        "in_stock": True,
        "stock_quantity": 18,
        "image": "🧻",
        "unit": "pack",
        "brand": "Familia"
    }
]

async def update_supermarket_catalog():
    """Обновляет каталог супермаркета с новыми категориями и товарами"""
    try:
        client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
        db = client.megabodega_db
        
        # Обновляем категории
        await db.categories.delete_many({})
        result_categories = await db.categories.insert_many(SUPERMARKET_CATEGORIES)
        print(f"Inserted {len(result_categories.inserted_ids)} categories")
        
        # Обновляем товары
        await db.products.delete_many({})
        result_products = await db.products.insert_many(SUPERMARKET_PRODUCTS)
        print(f"Inserted {len(result_products.inserted_ids)} products")
        
        # Создаем или обновляем магазин MegaBodega Baños
        store = {
            "id": "store_megabodega_banos",
            "name": "MegaBodega Baños",
            "name_en": "MegaBodega Baños", 
            "name_ru": "МегаБодега Баньос",
            "description": "Supermercado en Baños de Agua Santa",
            "description_en": "Supermarket in Baños de Agua Santa",
            "description_ru": "Супермаркет в Баньос-де-Агуа-Санта",
            "address": "Av. Amazonas y Espejo, Baños de Agua Santa, Ecuador",
            "phone": "+593-3-274-0123",
            "rating": 4.8,
            "delivery_fee": 1.50,
            "min_order": 10.00,
            "delivery_time": "30-45 min"
        }
        
        await db.stores.delete_many({"id": "store_megabodega_banos"})
        await db.stores.insert_one(store)
        print("Updated MegaBodega Baños store")
        
        client.close()
        print("Supermarket catalog updated successfully!")
        
        # Показываем статистику
        print(f"\n📊 СТАТИСТИКА КАТАЛОГА:")
        print(f"🏪 Категорий: {len(SUPERMARKET_CATEGORIES)}")
        print(f"📦 Товаров: {len(SUPERMARKET_PRODUCTS)}")
        print(f"🏢 Магазинов: 1 (MegaBodega Baños)")
        print(f"📍 Локация: Baños de Agua Santa, Ecuador")
        
        # Показываем категории
        print(f"\n📂 КАТЕГОРИИ:")
        for cat in SUPERMARKET_CATEGORIES:
            print(f"   {cat['icon']} {cat['name']} ({len([p for p in SUPERMARKET_PRODUCTS if p['category_id'] == cat['id']])} товаров)")
        
    except Exception as e:
        print(f"Error updating supermarket catalog: {e}")

if __name__ == "__main__":
    asyncio.run(update_supermarket_catalog())