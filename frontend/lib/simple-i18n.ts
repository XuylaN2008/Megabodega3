import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'es' | 'en' | 'ru';

interface Translations {
  // Welcome Screen
  welcomeTitle: string;
  welcomeSubtitle: string;
  features: {
    catalog: string;
    payments: string;
    delivery: string;
    tracking: string;
  };
  buttons: {
    login: string;
    register: string;
    browseWithoutAccount: string;
  };
  // Auth
  auth: {
    loginTitle: string;
    registerTitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
    loginButton: string;
    registerButton: string;
    noAccount: string;
    hasAccount: string;
    registerHere: string;
    loginHere: string;
    accountType: string;
    customerRole: string;
    storeRole: string;
    deliveryRole: string;
  };
  // Common
  common: {
    back: string;
    loading: string;
    error: string;
    success: string;
  };
}

const translations: Record<Language, Translations> = {
  es: {
    welcomeTitle: 'EcuaDelivery',
    welcomeSubtitle: 'Tu app de delivery favorita en Ecuador',
    features: {
      catalog: '🛒 Catálogo completo de productos',
      payments: '💳 Pagos seguros con tarjeta',
      delivery: '🚚 Entrega rápida a domicilio',
      tracking: '📱 Seguimiento en tiempo real',
    },
    buttons: {
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      browseWithoutAccount: 'Explorar sin cuenta',
    },
    auth: {
      loginTitle: 'Iniciar Sesión',
      registerTitle: 'Crear Cuenta',
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      fullName: 'Nombre completo',
      phone: 'Teléfono',
      loginButton: 'Iniciar Sesión',
      registerButton: 'Crear Cuenta',
      noAccount: '¿No tienes cuenta? ',
      hasAccount: '¿Ya tienes cuenta? ',
      registerHere: 'Regístrate aquí',
      loginHere: 'Inicia sesión aquí',
      accountType: 'Tipo de cuenta',
      customerRole: 'Cliente',
      storeRole: 'Tienda',
      deliveryRole: 'Repartidor',
    },
    common: {
      back: 'Atrás',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
    },
  },
  en: {
    welcomeTitle: 'EcuaDelivery',
    welcomeSubtitle: 'Your favorite delivery app in Ecuador',
    features: {
      catalog: '🛒 Complete product catalog',
      payments: '💳 Secure card payments',
      delivery: '🚚 Fast home delivery',
      tracking: '📱 Real-time tracking',
    },
    buttons: {
      login: 'Sign In',
      register: 'Sign Up',
      browseWithoutAccount: 'Browse without account',
    },
    auth: {
      loginTitle: 'Sign In',
      registerTitle: 'Create Account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      fullName: 'Full name',
      phone: 'Phone',
      loginButton: 'Sign In',
      registerButton: 'Create Account',
      noAccount: "Don't have an account? ",
      hasAccount: 'Already have an account? ',
      registerHere: 'Register here',
      loginHere: 'Sign in here',
      accountType: 'Account type',
      customerRole: 'Customer',
      storeRole: 'Store',
      deliveryRole: 'Delivery',
    },
    common: {
      back: 'Back',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
  },
  ru: {
    welcomeTitle: 'EcuaDelivery',
    welcomeSubtitle: 'Ваше любимое приложение доставки в Эквадоре',
    features: {
      catalog: '🛒 Полный каталог товаров',
      payments: '💳 Безопасные платежи картой',
      delivery: '🚚 Быстрая доставка на дом',
      tracking: '📱 Отслеживание в реальном времени',
    },
    buttons: {
      login: 'Войти',
      register: 'Регистрация',
      browseWithoutAccount: 'Просмотр без аккаунта',
    },
    auth: {
      loginTitle: 'Войти',
      registerTitle: 'Создать аккаунт',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердить пароль',
      fullName: 'Полное имя',
      phone: 'Телефон',
      loginButton: 'Войти',
      registerButton: 'Создать аккаунт',
      noAccount: 'Нет аккаунта? ',
      hasAccount: 'Уже есть аккаунт? ',
      registerHere: 'Зарегистрируйтесь',
      loginHere: 'Войдите',
      accountType: 'Тип аккаунта',
      customerRole: 'Клиент',
      storeRole: 'Магазин',
      deliveryRole: 'Доставщик',
    },
    common: {
      back: 'Назад',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успех',
    },
  },
};

class SimpleI18n {
  private currentLanguage: Language = 'es';

  async init() {
    try {
      const stored = await AsyncStorage.getItem('app_language');
      if (stored && ['es', 'en', 'ru'].includes(stored)) {
        this.currentLanguage = stored as Language;
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  }

  async setLanguage(language: Language) {
    this.currentLanguage = language;
    try {
      await AsyncStorage.setItem('app_language', language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }

  getLanguages() {
    return [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    ];
  }
}

export const i18n = new SimpleI18n();