from pydantic import BaseModel
from typing import Optional
from enum import Enum

class ThemeMode(str, Enum):
    LIGHT = "light"
    DARK = "dark"
    SYSTEM = "system"

class UserPreferences(BaseModel):
    user_id: str
    theme: ThemeMode = ThemeMode.SYSTEM
    language: str = "es"
    notifications_enabled: bool = True
    delivery_address: Optional[str] = None
    preferred_delivery_time: Optional[str] = None

class ThemeColors(BaseModel):
    # Основные цвета
    primary: str
    secondary: str
    background: str
    surface: str
    
    # Цвета текста
    text_primary: str
    text_secondary: str
    text_disabled: str
    
    # Системные цвета
    success: str
    warning: str
    error: str
    info: str
    
    # Специальные цвета
    accent: str
    divider: str
    overlay: str

# Предустановленные темы
LIGHT_THEME = ThemeColors(
    primary="#2E7D32",      # Зелёный Перекрёстка
    secondary="#4CAF50",    # Светло-зелёный
    background="#FFFFFF",   # Белый фон
    surface="#F5F5F5",      # Светло-серый
    
    text_primary="#212121", # Тёмно-серый текст
    text_secondary="#757575", # Серый текст
    text_disabled="#BDBDBD", # Отключённый текст
    
    success="#4CAF50",      # Зелёный успех
    warning="#FF9800",      # Оранжевый предупреждение
    error="#F44336",        # Красный ошибка
    info="#2196F3",         # Синий информация
    
    accent="#FF4081",       # Розовый акцент
    divider="#E0E0E0",      # Разделитель
    overlay="rgba(0,0,0,0.5)" # Наложение
)

DARK_THEME = ThemeColors(
    primary="#4CAF50",      # Зелёный
    secondary="#81C784",    # Светло-зелёный
    background="#121212",   # Тёмный фон
    surface="#1E1E1E",      # Поверхность
    
    text_primary="#FFFFFF", # Белый текст
    text_secondary="#B0B0B0", # Серый текст
    text_disabled="#6C6C6C", # Отключённый текст
    
    success="#4CAF50",      # Зелёный успех
    warning="#FF9800",      # Оранжевый предупреждение
    error="#F44336",        # Красный ошибка
    info="#2196F3",         # Синий информация
    
    accent="#FF4081",       # Розовый акцент
    divider="#333333",      # Разделитель
    overlay="rgba(0,0,0,0.7)" # Наложение
)