import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import secrets
import string
from datetime import datetime, timedelta

load_dotenv()

class InvitationSystem:
    def __init__(self):
        self.client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
        self.db = self.client.megabodega_db
        self.invitations = self.db.invitations

    async def generate_invitation_code(self, role: str, created_by: str, expires_in_days: int = 30):
        """Генерирует код приглашения для роли courier или staff"""
        if role not in ['courier', 'staff']:
            raise ValueError("Role must be 'courier' or 'staff'")
        
        # Генерируем уникальный код
        code = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(8))
        
        # Проверяем уникальность
        while await self.invitations.find_one({"code": code, "is_used": False}):
            code = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(8))
        
        invitation = {
            "code": code,
            "role": role,
            "created_by": created_by,
            "created_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + timedelta(days=expires_in_days),
            "is_used": False,
            "used_by": None,
            "used_at": None
        }
        
        await self.invitations.insert_one(invitation)
        return code

    async def validate_invitation_code(self, code: str, role: str):
        """Проверяет валидность кода приглашения"""
        invitation = await self.invitations.find_one({
            "code": code,
            "role": role,
            "is_used": False,
            "expires_at": {"$gt": datetime.utcnow()}
        })
        
        return invitation is not None

    async def use_invitation_code(self, code: str, used_by: str):
        """Помечает код как использованный"""
        result = await self.invitations.update_one(
            {"code": code, "is_used": False},
            {
                "$set": {
                    "is_used": True,
                    "used_by": used_by,
                    "used_at": datetime.utcnow()
                }
            }
        )
        return result.modified_count > 0

    async def get_invitation_codes(self, created_by: str = None):
        """Получает список кодов приглашений"""
        query = {}
        if created_by:
            query["created_by"] = created_by
        
        codes = []
        async for invitation in self.invitations.find(query).sort("created_at", -1):
            invitation["_id"] = str(invitation["_id"])
            codes.append(invitation)
        
        return codes

    async def delete_invitation_code(self, code: str):
        """Удаляет код приглашения"""
        result = await self.invitations.delete_one({"code": code})
        return result.deleted_count > 0

# Предустановленные коды для тестирования
PRESET_CODES = {
    "COURIER01": "courier",  # Код для курьеров
    "STAFF001": "staff",     # Код для персонала
    "ADMIN123": "staff"      # Дополнительный код для админов
}

async def initialize_invitation_system():
    """Инициализирует систему приглашений с предустановленными кодами"""
    try:
        invitation_system = InvitationSystem()
        
        # Проверяем и добавляем предустановленные коды
        for code, role in PRESET_CODES.items():
            existing = await invitation_system.invitations.find_one({"code": code})
            if not existing:
                invitation = {
                    "code": code,
                    "role": role,
                    "created_by": "system",
                    "created_at": datetime.utcnow(),
                    "expires_at": datetime.utcnow() + timedelta(days=365),  # Год действия
                    "is_used": False,
                    "used_by": None,
                    "used_at": None
                }
                await invitation_system.invitations.insert_one(invitation)
                print(f"Created invitation code: {code} for role: {role}")
        
        invitation_system.client.close()
        print("Invitation system initialized successfully")
        
    except Exception as e:
        print(f"Error initializing invitation system: {e}")

if __name__ == "__main__":
    asyncio.run(initialize_invitation_system())