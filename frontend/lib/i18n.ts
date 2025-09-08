import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'es' | 'en' | 'ru';

export interface Translations {
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
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
    loginButton: string;
    registerButton: string;
    loggingIn: string;
    creatingAccount: string;
    noAccount: string;
    hasAccount: string;
    registerHere: string;
    loginHere: string;
    accountTypes: {
      customer: string;
      storeAdmin: string;
      delivery: string;
      descriptions: {
        customer: string;
        storeAdmin: string;
        delivery: string;
      };
    };
  };
  // Languages
  languages: {
    spanish: string;
    english: string;
    russian: string;
    selectLanguage: string;
  };
  // Common
  common: {
    back: string;
    next: string;
    cancel: string;
    confirm: string;
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
      loginSubtitle: 'Bienvenido de vuelta a EcuaDelivery',
      registerTitle: 'Crear Cuenta',
      registerSubtitle: 'Únete a EcuaDelivery hoy mismo',
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      fullName: 'Nombre completo',
      phone: 'Teléfono',
      loginButton: 'Iniciar Sesión',
      registerButton: 'Crear Cuenta',
      loggingIn: 'Iniciando sesión...',
      creatingAccount: 'Creando cuenta...',
      noAccount: '¿No tienes cuenta? ',
      hasAccount: '¿Ya tienes cuenta? ',
      registerHere: 'Regístrate aquí',
      loginHere: 'Inicia sesión aquí',
      accountTypes: {
        customer: 'Cliente',
        storeAdmin: 'Tienda',
        delivery: 'Repartidor',
        descriptions: {
          customer: 'Comprar productos',
          storeAdmin: 'Vender productos',
          delivery: 'Entregar pedidos',
        },
      },
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      selectLanguage: 'Seleccionar idioma',
    },
    common: {
      back: 'Atrás',
      next: 'Siguiente',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
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
      loginSubtitle: 'Welcome back to EcuaDelivery',
      registerTitle: 'Create Account',
      registerSubtitle: 'Join EcuaDelivery today',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      fullName: 'Full name',
      phone: 'Phone',
      loginButton: 'Sign In',
      registerButton: 'Create Account',
      loggingIn: 'Signing in...',
      creatingAccount: 'Creating account...',
      noAccount: "Don't have an account? ",
      hasAccount: 'Already have an account? ',
      registerHere: 'Register here',
      loginHere: 'Sign in here',
      accountTypes: {
        customer: 'Customer',
        storeAdmin: 'Store',
        delivery: 'Delivery',
        descriptions: {
          customer: 'Buy products',
          storeAdmin: 'Sell products',
          delivery: 'Deliver orders',
        },
      },
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      selectLanguage: 'Select language',
    },
    common: {
      back: 'Back',
      next: 'Next',
      cancel: 'Cancel',
      confirm: 'Confirm',
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
      loginSubtitle: 'Добро пожаловать обратно в EcuaDelivery',
      registerTitle: 'Создать аккаунт',
      registerSubtitle: 'Присоединяйтесь к EcuaDelivery сегодня',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердить пароль',
      fullName: 'Полное имя',
      phone: 'Телефон',
      loginButton: 'Войти',
      registerButton: 'Создать аккаунт',
      loggingIn: 'Вход в систему...',
      creatingAccount: 'Создание аккаунта...',
      noAccount: 'Нет аккаунта? ',
      hasAccount: 'Уже есть аккаунт? ',
      registerHere: 'Зарегистрируйтесь здесь',
      loginHere: 'Войдите здесь',
      accountTypes: {
        customer: 'Клиент',
        storeAdmin: 'Магазин',
        delivery: 'Доставщик',
        descriptions: {
          customer: 'Покупать товары',
          storeAdmin: 'Продавать товары',
          delivery: 'Доставлять заказы',
        },
      },
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      selectLanguage: 'Выберите язык',
    },
    common: {
      back: 'Назад',
      next: 'Далее',
      cancel: 'Отмена',
      confirm: 'Подтвердить',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успех',
    },
  },
};

class I18nService {
  private currentLanguage: Language = 'es';
  private listeners: Array<(language: Language) => void> = [];

  async init() {
    try {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage && this.isValidLanguage(storedLanguage)) {
        this.currentLanguage = storedLanguage as Language;
      }
    } catch (error) {
      console.error('Error loading stored language:', error);
    }
  }

  private isValidLanguage(lang: string): boolean {
    return ['es', 'en', 'ru'].includes(lang);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  async setLanguage(language: Language) {
    this.currentLanguage = language;
    try {
      await AsyncStorage.setItem('language', language);
      this.notifyListeners();
    } catch (error) {
      console.error('Error storing language:', error);
    }
  }

  getTranslations(): Translations {
    return translations[this.currentLanguage];
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = this.getTranslations();
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  }

  subscribe(listener: (language: Language) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }

  getSupportedLanguages() {
    return [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    ];
  }
}

export const i18n = new I18nService();