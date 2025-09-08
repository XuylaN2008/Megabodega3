import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'es' | 'en' | 'ru';

interface Translations {
  // Splash & Welcome
  welcome: {
    title: string;
    subtitle: string;
    slogan: string;
    greeting: string;
  };
  // Auth
  auth: {
    signInWithGoogle: string;
    login: string;
    register: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
    selectRole: string;
    customer: string;
    courier: string;
    staff: string;
    customerDesc: string;
    courierDesc: string;
    staffDesc: string;
    signOut: string;
    loginSuccess: string;
    loginError: string;
    registerSuccess: string;
    registerError: string;
    logoutConfirm: string;
    forgotPassword: string;
    createAccount: string;
    alreadyHaveAccount: string;
    noAccount: string;
  };
  // Navigation
  nav: {
    home: string;
    catalog: string;
    cart: string;
    orders: string;
    profile: string;
    admin: string;
    back: string;
    search: string;
    filter: string;
    sort: string;
  };
  // Customer
  customer: {
    categories: string;
    searchProducts: string;
    addToCart: string;
    removeFromCart: string;
    checkout: string;
    payWithStripe: string;
    orderStatus: string;
    orderHistory: string;
    myOrders: string;
    favoriteProducts: string;
    recentOrders: string;
    quickOrder: string;
    deliveryAddress: string;
    paymentMethod: string;
    orderSummary: string;
    subtotal: string;
    deliveryFee: string;
    discount: string;
    itemsInCart: string;
    emptyCart: string;
    addToFavorites: string;
    viewDetails: string;
    productNotAvailable: string;
    outOfStock: string;
    inStock: string;
  };
  // Courier
  courier: {
    availableOrders: string;
    acceptOrder: string;
    orderDetails: string;
    markDelivered: string;
    route: string;
    earnings: string;
    todayEarnings: string;
    weeklyEarnings: string;
    totalDeliveries: string;
    averageRating: string;
    onlineStatus: string;
    offline: string;
    online: string;
    currentDelivery: string;
    pickupLocation: string;
    deliveryLocation: string;
    customerInfo: string;
    callCustomer: string;
    reportIssue: string;
    completedDeliveries: string;
  };
  // Staff
  staff: {
    manageProducts: string;
    addProduct: string;
    editProduct: string;
    orders: string;
    analytics: string;
    inventory: string;
    productManagement: string;
    orderManagement: string;
    salesAnalytics: string;
    lowStock: string;
    restock: string;
    productName: string;
    productPrice: string;
    productCategory: string;
    productDescription: string;
    stockQuantity: string;
    saveProduct: string;
    deleteProduct: string;
    confirmDelete: string;
    orderReceived: string;
    orderPreparing: string;
    orderReady: string;
    orderDelivered: string;
    markAsReady: string;
    viewOrderDetails: string;
    dailySales: string;
    weeklySales: string;
    monthlySales: string;
    topProducts: string;
    salesReport: string;
  };
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    done: string;
    confirm: string;
    yes: string;
    no: string;
    retry: string;
    refresh: string;
    close: string;
    open: string;
    price: string;
    quantity: string;
    total: string;
    address: string;
    phone: string;
    email: string;
    name: string;
    description: string;
    category: string;
    store: string;
    date: string;
    time: string;
    status: string;
    rating: string;
    review: string;
    photo: string;
    video: string;
    file: string;
    upload: string;
    download: string;
    share: string;
    copy: string;
    paste: string;
    cut: string;
    selectAll: string;
  };
  // Languages
  languages: {
    spanish: string;
    english: string;
    russian: string;
    changeLanguage: string;
  };
  // Cart & Checkout
  cart: {
    title: string;
    empty: string;
    emptyMessage: string;
    continueShopping: string;
    proceedToCheckout: string;
    itemsCount: string;
    remove: string;
    moveToWishlist: string;
    updateQuantity: string;
    pricePerItem: string;
    subtotal: string;
    checkoutTitle: string;
    deliveryInfo: string;
    paymentInfo: string;
    orderReview: string;
    placeOrder: string;
    processing: string;
    orderPlaced: string;
    orderPlacedMessage: string;
    paymentFailed: string;
    paymentFailedMessage: string;
    retryPayment: string;
  };
  // Profile
  profile: {
    title: string;
    personalInfo: string;
    accountSettings: string;
    orderHistory: string;
    paymentMethods: string;
    addresses: string;
    notifications: string;
    help: string;
    about: string;
    termsOfService: string;
    privacyPolicy: string;
    logout: string;
    editProfile: string;
    changePassword: string;
    deleteAccount: string;
    language: string;
    theme: string;
    pushNotifications: string;
    emailNotifications: string;
    smsNotifications: string;
    contactSupport: string;
    faq: string;
    version: string;
  };
  // Errors
  errors: {
    networkError: string;
    serverError: string;
    notFound: string;
    unauthorized: string;
    forbidden: string;
    badRequest: string;
    timeout: string;
    unknownError: string;
    validationError: string;
    paymentError: string;
    locationError: string;
    cameraError: string;
    storageError: string;
  };
}

const translations: Record<Language, Translations> = {
  es: {
    welcome: {
      title: 'MegaBodega',
      subtitle: 'Delivery a tu puerta',
      slogan: 'Los mejores productos, entrega rápida',
      greeting: 'Hola'
    },
    auth: {
      signInWithGoogle: 'Continuar con Google',
      selectRole: 'Selecciona tu rol',
      customer: 'Cliente',
      courier: 'Repartidor',
      staff: 'Personal',
      customerDesc: 'Compra productos y recibe en casa',
      courierDesc: 'Entrega pedidos y gana dinero',
      staffDesc: 'Gestiona productos y pedidos',
      signOut: 'Cerrar sesión'
    },
    nav: {
      home: 'Inicio',
      catalog: 'Catálogo',
      cart: 'Carrito',
      orders: 'Pedidos',
      profile: 'Perfil',
      admin: 'Admin'
    },
    customer: {
      categories: 'Categorías',
      searchProducts: 'Buscar productos',
      addToCart: 'Añadir al carrito',
      checkout: 'Pagar',
      payWithStripe: 'Pagar con tarjeta',
      orderStatus: 'Estado del pedido',
      orderHistory: 'Historial de pedidos'
    },
    courier: {
      availableOrders: 'Pedidos disponibles',
      acceptOrder: 'Aceptar pedido',
      orderDetails: 'Detalles del pedido',
      markDelivered: 'Marcar como entregado',
      route: 'Ruta',
      earnings: 'Ganancias'
    },
    staff: {
      manageProducts: 'Gestionar productos',
      addProduct: 'Añadir producto',
      editProduct: 'Editar producto',
      orders: 'Pedidos',
      analytics: 'Estadísticas',
      inventory: 'Inventario'
    },
    common: {
      loading: 'Cargando',
      error: 'Error',
      success: 'Éxito',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      back: 'Atrás',
      next: 'Siguiente',
      done: 'Listo',
      price: 'Precio',
      quantity: 'Cantidad',
      total: 'Total',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Email'
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      changeLanguage: 'Cambiar idioma'
    }
  },
  en: {
    welcome: {
      title: 'MegaBodega',
      subtitle: 'Delivery to your door',
      slogan: 'Best products, fast delivery',
      greeting: 'Hello'
    },
    auth: {
      signInWithGoogle: 'Continue with Google',
      selectRole: 'Select your role',
      customer: 'Customer',
      courier: 'Courier',
      staff: 'Staff',
      customerDesc: 'Buy products and receive at home',
      courierDesc: 'Deliver orders and earn money',
      staffDesc: 'Manage products and orders',
      signOut: 'Sign out'
    },
    nav: {
      home: 'Home',
      catalog: 'Catalog',
      cart: 'Cart',
      orders: 'Orders',
      profile: 'Profile',
      admin: 'Admin'
    },
    customer: {
      categories: 'Categories',
      searchProducts: 'Search products',
      addToCart: 'Add to cart',
      checkout: 'Checkout',
      payWithStripe: 'Pay with card',
      orderStatus: 'Order status',
      orderHistory: 'Order history'
    },
    courier: {
      availableOrders: 'Available orders',
      acceptOrder: 'Accept order',
      orderDetails: 'Order details',
      markDelivered: 'Mark as delivered',
      route: 'Route',
      earnings: 'Earnings'
    },
    staff: {
      manageProducts: 'Manage products',
      addProduct: 'Add product',
      editProduct: 'Edit product',
      orders: 'Orders',
      analytics: 'Analytics',
      inventory: 'Inventory'
    },
    common: {
      loading: 'Loading',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      done: 'Done',
      price: 'Price',
      quantity: 'Quantity',
      total: 'Total',
      address: 'Address',
      phone: 'Phone',
      email: 'Email'
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      changeLanguage: 'Change language'
    }
  },
  ru: {
    welcome: {
      title: 'MegaBodega',
      subtitle: 'Доставка к двери',
      slogan: 'Лучшие продукты, быстрая доставка'
    },
    auth: {
      signInWithGoogle: 'Войти через Google',
      selectRole: 'Выберите роль',
      customer: 'Покупатель',
      courier: 'Курьер',
      staff: 'Персонал',
      customerDesc: 'Покупайте продукты с доставкой домой',
      courierDesc: 'Доставляйте заказы и зарабатывайте',
      staffDesc: 'Управляйте товарами и заказами',
      signOut: 'Выйти'
    },
    nav: {
      home: 'Главная',
      catalog: 'Каталог',
      cart: 'Корзина',
      orders: 'Заказы',
      profile: 'Профиль',
      admin: 'Админ'
    },
    customer: {
      categories: 'Категории',
      searchProducts: 'Поиск товаров',
      addToCart: 'В корзину',
      checkout: 'Оформить',
      payWithStripe: 'Оплатить картой',
      orderStatus: 'Статус заказа',
      orderHistory: 'История заказов'
    },
    courier: {
      availableOrders: 'Доступные заказы',
      acceptOrder: 'Принять заказ',
      orderDetails: 'Детали заказа',
      markDelivered: 'Отметить доставленным',
      route: 'Маршрут',
      earnings: 'Заработок'
    },
    staff: {
      manageProducts: 'Управление товарами',
      addProduct: 'Добавить товар',
      editProduct: 'Изменить товар',
      orders: 'Заказы',
      analytics: 'Аналитика',
      inventory: 'Склад'
    },
    common: {
      loading: 'Загрузка',
      error: 'Ошибка',
      success: 'Успех',
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Изменить',
      back: 'Назад',
      next: 'Далее',
      done: 'Готово',
      price: 'Цена',
      quantity: 'Количество',
      total: 'Итого',
      address: 'Адрес',
      phone: 'Телефон',
      email: 'Email'
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      changeLanguage: 'Сменить язык'
    }
  }
};

class MegaBodegaI18n {
  private currentLanguage: Language = 'es';
  private listeners: Array<(language: Language) => void> = [];

  async init() {
    try {
      const stored = await AsyncStorage.getItem('megabodega_language');
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
      await AsyncStorage.setItem('megabodega_language', language);
      this.notifyListeners();
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

  subscribe(listener: (language: Language) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }

  getLanguages() {
    return [
      { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
      { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
    ];
  }
}

export const megaBodegaI18n = new MegaBodegaI18n();