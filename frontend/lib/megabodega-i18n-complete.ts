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
    invitationCode: string;
    invitationCodeRequired: string;
    invitationCodeInvalid: string;
    invitationCodePlaceholder: string;
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
    light_theme: string;
    dark_theme: string;
    city: string;
    delivery_only_banos: string;
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
      title: 'Perekrestok',
      subtitle: 'Delivery en Baños de Agua Santa',
      slogan: 'Los mejores productos, entrega rápida',
      greeting: 'Hola'
    },
    auth: {
      signInWithGoogle: 'Continuar con Google',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      fullName: 'Nombre completo',
      phone: 'Teléfono',
      selectRole: 'Selecciona tu rol',
      customer: 'Cliente',
      courier: 'Repartidor',
      staff: 'Personal',
      customerDesc: 'Compra productos y recibe en casa',
      courierDesc: 'Entrega pedidos y gana dinero',
      staffDesc: 'Gestiona productos y pedidos',
      signOut: 'Cerrar sesión',
      loginSuccess: 'Sesión iniciada correctamente',
      loginError: 'Error al iniciar sesión',
      registerSuccess: 'Registro exitoso',
      registerError: 'Error en el registro',
      logoutConfirm: '¿Cerrar sesión?',
      forgotPassword: 'Olvidé mi contraseña',
      createAccount: 'Crear cuenta',
      alreadyHaveAccount: '¿Ya tienes cuenta?',
      noAccount: '¿No tienes cuenta?',
      invitationCode: 'Código de invitación',
      invitationCodeRequired: 'Código de invitación requerido para repartidores y personal',
      invitationCodeInvalid: 'Código de invitación inválido o expirado',
      invitationCodePlaceholder: 'Ingresa tu código de invitación'
    },
    nav: {
      home: 'Inicio',
      catalog: 'Catálogo',
      cart: 'Carrito',
      orders: 'Pedidos',
      profile: 'Perfil',
      admin: 'Admin',
      back: 'Atrás',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar'
    },
    customer: {
      categories: 'Categorías',
      searchProducts: 'Buscar productos',
      addToCart: 'Añadir al carrito',
      removeFromCart: 'Quitar del carrito',
      checkout: 'Pagar',
      payWithStripe: 'Pagar con tarjeta',
      orderStatus: 'Estado del pedido',
      orderHistory: 'Historial de pedidos',
      myOrders: 'Mis pedidos',
      favoriteProducts: 'Productos favoritos',
      recentOrders: 'Pedidos recientes',
      quickOrder: 'Pedido rápido',
      deliveryAddress: 'Dirección de entrega',
      paymentMethod: 'Método de pago',
      orderSummary: 'Resumen del pedido',
      subtotal: 'Subtotal',
      deliveryFee: 'Costo de envío',
      discount: 'Descuento',
      itemsInCart: 'Artículos en el carrito',
      emptyCart: 'Carrito vacío',
      addToFavorites: 'Añadir a favoritos',
      viewDetails: 'Ver detalles',
      productNotAvailable: 'Producto no disponible',
      outOfStock: 'Sin existencias',
      inStock: 'Disponible'
    },
    courier: {
      availableOrders: 'Pedidos disponibles',
      acceptOrder: 'Aceptar pedido',
      orderDetails: 'Detalles del pedido',
      markDelivered: 'Marcar como entregado',
      route: 'Ruta',
      earnings: 'Ganancias',
      todayEarnings: 'Ganancias hoy',
      weeklyEarnings: 'Ganancias semanales',
      totalDeliveries: 'Total de entregas',
      averageRating: 'Calificación promedio',
      onlineStatus: 'Estado en línea',
      offline: 'Desconectado',
      online: 'En línea',
      currentDelivery: 'Entrega actual',
      pickupLocation: 'Lugar de recogida',
      deliveryLocation: 'Lugar de entrega',
      customerInfo: 'Info del cliente',
      callCustomer: 'Llamar cliente',
      reportIssue: 'Reportar problema',
      completedDeliveries: 'Entregas completadas'
    },
    staff: {
      manageProducts: 'Gestionar productos',
      addProduct: 'Añadir producto',
      editProduct: 'Editar producto',
      orders: 'Pedidos',
      analytics: 'Estadísticas',
      inventory: 'Inventario',
      productManagement: 'Gestión de productos',
      orderManagement: 'Gestión de pedidos',
      salesAnalytics: 'Análisis de ventas',
      lowStock: 'Stock bajo',
      restock: 'Reabastecer',
      productName: 'Nombre del producto',
      productPrice: 'Precio del producto',
      productCategory: 'Categoría del producto',
      productDescription: 'Descripción del producto',
      stockQuantity: 'Cantidad en stock',
      saveProduct: 'Guardar producto',
      deleteProduct: 'Eliminar producto',
      confirmDelete: 'Confirmar eliminación',
      orderReceived: 'Pedido recibido',
      orderPreparing: 'Preparando pedido',
      orderReady: 'Pedido listo',
      orderDelivered: 'Pedido entregado',
      markAsReady: 'Marcar como listo',
      viewOrderDetails: 'Ver detalles del pedido',
      dailySales: 'Ventas diarias',
      weeklySales: 'Ventas semanales',
      monthlySales: 'Ventas mensuales',
      topProducts: 'Productos más vendidos',
      salesReport: 'Reporte de ventas'
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
      confirm: 'Confirmar',
      yes: 'Sí',
      no: 'No',
      retry: 'Reintentar',
      refresh: 'Actualizar',
      close: 'Cerrar',
      open: 'Abrir',
      price: 'Precio',
      quantity: 'Cantidad',
      total: 'Total',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Email',
      name: 'Nombre',
      description: 'Descripción',
      category: 'Categoría',
      store: 'Tienda',
      date: 'Fecha',
      time: 'Hora',
      status: 'Estado',
      rating: 'Calificación',
      review: 'Reseña',
      photo: 'Foto',
      video: 'Video',
      file: 'Archivo',
      upload: 'Subir',
      download: 'Descargar',
      share: 'Compartir',
      copy: 'Copiar',
      paste: 'Pegar',
      cut: 'Cortar',
      selectAll: 'Seleccionar todo',
      light_theme: 'Tema claro',
      dark_theme: 'Tema oscuro',
      city: 'Ciudad',
      delivery_only_banos: 'Delivery solo en Baños de Agua Santa'
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      changeLanguage: 'Cambiar idioma'
    },
    cart: {
      title: 'Carrito',
      empty: 'Vacío',
      emptyMessage: 'Tu carrito está vacío',
      continueShopping: 'Continuar comprando',
      proceedToCheckout: 'Proceder al pago',
      itemsCount: 'Artículos',
      remove: 'Quitar',
      moveToWishlist: 'Mover a favoritos',
      updateQuantity: 'Actualizar cantidad',
      pricePerItem: 'Precio por artículo',
      subtotal: 'Subtotal',
      checkoutTitle: 'Finalizar compra',
      deliveryInfo: 'Info de entrega',
      paymentInfo: 'Info de pago',
      orderReview: 'Revisar pedido',
      placeOrder: 'Realizar pedido',
      processing: 'Procesando',
      orderPlaced: 'Pedido realizado',
      orderPlacedMessage: 'Tu pedido ha sido procesado exitosamente',
      paymentFailed: 'Pago fallido',
      paymentFailedMessage: 'Hubo un problema con el pago',
      retryPayment: 'Reintentar pago'
    },
    profile: {
      title: 'Perfil',
      personalInfo: 'Información personal',
      accountSettings: 'Configuración de cuenta',
      orderHistory: 'Historial de pedidos',
      paymentMethods: 'Métodos de pago',
      addresses: 'Direcciones',
      notifications: 'Notificaciones',
      help: 'Ayuda',
      about: 'Acerca de',
      termsOfService: 'Términos de servicio',
      privacyPolicy: 'Política de privacidad',
      logout: 'Cerrar sesión',
      editProfile: 'Editar perfil',
      changePassword: 'Cambiar contraseña',
      deleteAccount: 'Eliminar cuenta',
      language: 'Idioma',
      theme: 'Tema',
      pushNotifications: 'Notificaciones push',
      emailNotifications: 'Notificaciones por email',
      smsNotifications: 'Notificaciones SMS',
      contactSupport: 'Contactar soporte',
      faq: 'Preguntas frecuentes',
      version: 'Versión'
    },
    errors: {
      networkError: 'Error de conexión',
      serverError: 'Error del servidor',
      notFound: 'No encontrado',
      unauthorized: 'No autorizado',
      forbidden: 'Prohibido',
      badRequest: 'Solicitud incorrecta',
      timeout: 'Tiempo agotado',
      unknownError: 'Error desconocido',
      validationError: 'Error de validación',
      paymentError: 'Error de pago',
      locationError: 'Error de ubicación',
      cameraError: 'Error de cámara',
      storageError: 'Error de almacenamiento'
    }
  },
  en: {
    welcome: {
      title: 'Perekrestok',
      subtitle: 'Delivery in Baños de Agua Santa',
      slogan: 'Best products, fast delivery',
      greeting: 'Hello'
    },
    auth: {
      signInWithGoogle: 'Continue with Google',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',
      phone: 'Phone',
      selectRole: 'Select your role',
      customer: 'Customer',
      courier: 'Courier',
      staff: 'Staff',
      customerDesc: 'Buy products and receive at home',
      courierDesc: 'Deliver orders and earn money',
      staffDesc: 'Manage products and orders',
      signOut: 'Sign out',
      loginSuccess: 'Successfully logged in',
      loginError: 'Login error',
      registerSuccess: 'Registration successful',
      registerError: 'Registration error',
      logoutConfirm: 'Sign out?',
      forgotPassword: 'Forgot password',
      createAccount: 'Create account',
      alreadyHaveAccount: 'Already have an account?',
      noAccount: 'No account?',
      invitationCode: 'Invitation code',
      invitationCodeRequired: 'Invitation code required for couriers and staff',
      invitationCodeInvalid: 'Invalid or expired invitation code',
      invitationCodePlaceholder: 'Enter your invitation code'
    },
    nav: {
      home: 'Home',
      catalog: 'Catalog',
      cart: 'Cart',
      orders: 'Orders',
      profile: 'Profile',
      admin: 'Admin',
      back: 'Back',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort'
    },
    customer: {
      categories: 'Categories',
      searchProducts: 'Search products',
      addToCart: 'Add to cart',
      removeFromCart: 'Remove from cart',
      checkout: 'Checkout',
      payWithStripe: 'Pay with card',
      orderStatus: 'Order status',
      orderHistory: 'Order history',
      myOrders: 'My orders',
      favoriteProducts: 'Favorite products',
      recentOrders: 'Recent orders',
      quickOrder: 'Quick order',
      deliveryAddress: 'Delivery address',
      paymentMethod: 'Payment method',
      orderSummary: 'Order summary',
      subtotal: 'Subtotal',
      deliveryFee: 'Delivery fee',
      discount: 'Discount',
      itemsInCart: 'Items in cart',
      emptyCart: 'Empty cart',
      addToFavorites: 'Add to favorites',
      viewDetails: 'View details',
      productNotAvailable: 'Product not available',
      outOfStock: 'Out of stock',
      inStock: 'In stock'
    },
    courier: {
      availableOrders: 'Available orders',
      acceptOrder: 'Accept order',
      orderDetails: 'Order details',
      markDelivered: 'Mark as delivered',
      route: 'Route',
      earnings: 'Earnings',
      todayEarnings: 'Today earnings',
      weeklyEarnings: 'Weekly earnings',
      totalDeliveries: 'Total deliveries',
      averageRating: 'Average rating',
      onlineStatus: 'Online status',
      offline: 'Offline',
      online: 'Online',
      currentDelivery: 'Current delivery',
      pickupLocation: 'Pickup location',
      deliveryLocation: 'Delivery location',
      customerInfo: 'Customer info',
      callCustomer: 'Call customer',
      reportIssue: 'Report issue',
      completedDeliveries: 'Completed deliveries'
    },
    staff: {
      manageProducts: 'Manage products',
      addProduct: 'Add product',
      editProduct: 'Edit product',
      orders: 'Orders',
      analytics: 'Analytics',
      inventory: 'Inventory',
      productManagement: 'Product management',
      orderManagement: 'Order management',
      salesAnalytics: 'Sales analytics',
      lowStock: 'Low stock',
      restock: 'Restock',
      productName: 'Product name',
      productPrice: 'Product price',
      productCategory: 'Product category',
      productDescription: 'Product description',
      stockQuantity: 'Stock quantity',
      saveProduct: 'Save product',
      deleteProduct: 'Delete product',
      confirmDelete: 'Confirm delete',
      orderReceived: 'Order received',
      orderPreparing: 'Order preparing',
      orderReady: 'Order ready',
      orderDelivered: 'Order delivered',
      markAsReady: 'Mark as ready',
      viewOrderDetails: 'View order details',
      dailySales: 'Daily sales',
      weeklySales: 'Weekly sales',
      monthlySales: 'Monthly sales',
      topProducts: 'Top products',
      salesReport: 'Sales report'
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
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      retry: 'Retry',
      refresh: 'Refresh',
      close: 'Close',
      open: 'Open',
      price: 'Price',
      quantity: 'Quantity',
      total: 'Total',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      name: 'Name',
      description: 'Description',
      category: 'Category',
      store: 'Store',
      date: 'Date',
      time: 'Time',
      status: 'Status',
      rating: 'Rating',
      review: 'Review',
      photo: 'Photo',
      video: 'Video',
      file: 'File',
      upload: 'Upload',
      download: 'Download',
      share: 'Share',
      copy: 'Copy',
      paste: 'Paste',
      cut: 'Cut',
      selectAll: 'Select all',
      light_theme: 'Light theme',
      dark_theme: 'Dark theme',
      city: 'City',
      delivery_only_banos: 'Delivery only in Baños de Agua Santa'
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      changeLanguage: 'Change language'
    },
    cart: {
      title: 'Cart',
      empty: 'Empty',
      emptyMessage: 'Your cart is empty',
      continueShopping: 'Continue shopping',
      proceedToCheckout: 'Proceed to checkout',
      itemsCount: 'Items',
      remove: 'Remove',
      moveToWishlist: 'Move to wishlist',
      updateQuantity: 'Update quantity',
      pricePerItem: 'Price per item',
      subtotal: 'Subtotal',
      checkoutTitle: 'Checkout',
      deliveryInfo: 'Delivery info',
      paymentInfo: 'Payment info',
      orderReview: 'Order review',
      placeOrder: 'Place order',
      processing: 'Processing',
      orderPlaced: 'Order placed',
      orderPlacedMessage: 'Your order has been processed successfully',
      paymentFailed: 'Payment failed',
      paymentFailedMessage: 'There was a problem with the payment',
      retryPayment: 'Retry payment'
    },
    profile: {
      title: 'Profile',
      personalInfo: 'Personal info',
      accountSettings: 'Account settings',
      orderHistory: 'Order history',
      paymentMethods: 'Payment methods',
      addresses: 'Addresses',
      notifications: 'Notifications',
      help: 'Help',
      about: 'About',
      termsOfService: 'Terms of service',
      privacyPolicy: 'Privacy policy',
      logout: 'Logout',
      editProfile: 'Edit profile',
      changePassword: 'Change password',
      deleteAccount: 'Delete account',
      language: 'Language',
      theme: 'Theme',
      pushNotifications: 'Push notifications',
      emailNotifications: 'Email notifications',
      smsNotifications: 'SMS notifications',
      contactSupport: 'Contact support',
      faq: 'FAQ',
      version: 'Version'
    },
    errors: {
      networkError: 'Network error',
      serverError: 'Server error',
      notFound: 'Not found',
      unauthorized: 'Unauthorized',
      forbidden: 'Forbidden',
      badRequest: 'Bad request',
      timeout: 'Timeout',
      unknownError: 'Unknown error',
      validationError: 'Validation error',
      paymentError: 'Payment error',
      locationError: 'Location error',
      cameraError: 'Camera error',
      storageError: 'Storage error'
    }
  },
  ru: {
    welcome: {
      title: 'Perekrestok',
      subtitle: 'Доставка в Баньос-де-Агуа-Санта',
      slogan: 'Лучшие продукты, быстрая доставка',
      greeting: 'Привет'
    },
    auth: {
      signInWithGoogle: 'Войти через Google',
      login: 'Войти',
      register: 'Регистрация',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердить пароль',
      fullName: 'Полное имя',
      phone: 'Телефон',
      selectRole: 'Выберите роль',
      customer: 'Покупатель',
      courier: 'Курьер',
      staff: 'Персонал',
      customerDesc: 'Покупайте продукты с доставкой домой',
      courierDesc: 'Доставляйте заказы и зарабатывайте',
      staffDesc: 'Управляйте товарами и заказами',  
      signOut: 'Выйти',
      loginSuccess: 'Успешный вход',
      loginError: 'Ошибка входа',
      registerSuccess: 'Регистрация успешна',
      registerError: 'Ошибка регистрации',
      logoutConfirm: 'Выйти из системы?',
      forgotPassword: 'Забыли пароль',
      createAccount: 'Создать аккаунт',
      alreadyHaveAccount: 'Уже есть аккаунт?',
      noAccount: 'Нет аккаунта?',
      invitationCode: 'Код приглашения',
      invitationCodeRequired: 'Код приглашения необходим для курьеров и персонала',
      invitationCodeInvalid: 'Неверный или истекший код приглашения',
      invitationCodePlaceholder: 'Введите код приглашения'
    },
    nav: {
      home: 'Главная',
      catalog: 'Каталог',
      cart: 'Корзина',
      orders: 'Заказы',
      profile: 'Профиль',
      admin: 'Админ',
      back: 'Назад',
      search: 'Поиск',
      filter: 'Фильтр',
      sort: 'Сортировка'
    },
    customer: {
      categories: 'Категории',
      searchProducts: 'Поиск товаров',
      addToCart: 'В корзину',
      removeFromCart: 'Убрать из корзины',
      checkout: 'Оформить',
      payWithStripe: 'Оплатить картой',
      orderStatus: 'Статус заказа',
      orderHistory: 'История заказов',
      myOrders: 'Мои заказы',
      favoriteProducts: 'Избранные товары',
      recentOrders: 'Последние заказы',
      quickOrder: 'Быстрый заказ',
      deliveryAddress: 'Адрес доставки',
      paymentMethod: 'Способ оплаты',
      orderSummary: 'Итоги заказа',
      subtotal: 'Подытог',
      deliveryFee: 'Стоимость доставки',
      discount: 'Скидка',
      itemsInCart: 'Товаров в корзине',
      emptyCart: 'Пустая корзина',
      addToFavorites: 'В избранное',
      viewDetails: 'Подробнее',
      productNotAvailable: 'Товар недоступен',
      outOfStock: 'Нет в наличии',
      inStock: 'В наличии'
    },
    courier: {
      availableOrders: 'Доступные заказы',
      acceptOrder: 'Принять заказ',
      orderDetails: 'Детали заказа',
      markDelivered: 'Отметить доставленным',
      route: 'Маршрут',
      earnings: 'Заработок',
      todayEarnings: 'Заработок сегодня',
      weeklyEarnings: 'Заработок за неделю',
      totalDeliveries: 'Всего доставок',
      averageRating: 'Средний рейтинг',
      onlineStatus: 'Статус онлайн',
      offline: 'Офлайн',
      online: 'Онлайн',
      currentDelivery: 'Текущая доставка',
      pickupLocation: 'Место получения',
      deliveryLocation: 'Место доставки',
      customerInfo: 'Инфо о клиенте',
      callCustomer: 'Позвонить клиенту',
      reportIssue: 'Сообщить о проблеме',
      completedDeliveries: 'Завершенные доставки'
    },
    staff: {
      manageProducts: 'Управление товарами',
      addProduct: 'Добавить товар',
      editProduct: 'Изменить товар',
      orders: 'Заказы',
      analytics: 'Аналитика',
      inventory: 'Склад',
      productManagement: 'Управление товарами',
      orderManagement: 'Управление заказами',
      salesAnalytics: 'Аналитика продаж',
      lowStock: 'Мало на складе',
      restock: 'Пополнить склад',
      productName: 'Название товара',
      productPrice: 'Цена товара',
      productCategory: 'Категория товара',
      productDescription: 'Описание товара',
      stockQuantity: 'Количество на складе',
      saveProduct: 'Сохранить товар',
      deleteProduct: 'Удалить товар',
      confirmDelete: 'Подтвердить удаление',
      orderReceived: 'Заказ получен',
      orderPreparing: 'Заказ готовится',
      orderReady: 'Заказ готов',
      orderDelivered: 'Заказ доставлен',
      markAsReady: 'Отметить готовым',
      viewOrderDetails: 'Детали заказа',
      dailySales: 'Дневные продажи',
      weeklySales: 'Недельные продажи',
      monthlySales: 'Месячные продажи',
      topProducts: 'Топ товары',
      salesReport: 'Отчет по продажам'
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
      confirm: 'Подтвердить',
      yes: 'Да',
      no: 'Нет',
      retry: 'Повторить',
      refresh: 'Обновить',
      close: 'Закрыть',
      open: 'Открыть',
      price: 'Цена',
      quantity: 'Количество',
      total: 'Итого',
      address: 'Адрес',
      phone: 'Телефон',
      email: 'Email',
      name: 'Имя',
      description: 'Описание',
      category: 'Категория',
      store: 'Магазин',
      date: 'Дата',
      time: 'Время',
      status: 'Статус',
      rating: 'Рейтинг',
      review: 'Отзыв',
      photo: 'Фото',
      video: 'Видео',
      file: 'Файл',
      upload: 'Загрузить',
      download: 'Скачать',
      share: 'Поделиться',
      copy: 'Копировать',
      paste: 'Вставить',
      cut: 'Вырезать',
      selectAll: 'Выбрать все',
      light_theme: 'Светлая тема',
      dark_theme: 'Темная тема',
      city: 'Город',
      delivery_only_banos: 'Доставка только в Баньос-де-Агуа-Санта'
    },
    languages: {
      spanish: 'Español',
      english: 'English',
      russian: 'Русский',
      changeLanguage: 'Сменить язык'
    },
    cart: {
      title: 'Корзина',
      empty: 'Пуста',
      emptyMessage: 'Ваша корзина пуста',
      continueShopping: 'Продолжить покупки',
      proceedToCheckout: 'Перейти к оплате',
      itemsCount: 'Товары',
      remove: 'Убрать',
      moveToWishlist: 'В список желаний',
      updateQuantity: 'Изменить количество',
      pricePerItem: 'Цена за товар',
      subtotal: 'Подытог',
      checkoutTitle: 'Оформление',
      deliveryInfo: 'Инфо о доставке',
      paymentInfo: 'Инфо об оплате',
      orderReview: 'Проверка заказа',
      placeOrder: 'Оформить заказ',
      processing: 'Обработка',
      orderPlaced: 'Заказ оформлен',
      orderPlacedMessage: 'Ваш заказ успешно обработан',
      paymentFailed: 'Ошибка оплаты',
      paymentFailedMessage: 'Возникла проблема с оплатой',
      retryPayment: 'Повторить оплату'
    },
    profile: {
      title: 'Профиль',
      personalInfo: 'Личная информация',
      accountSettings: 'Настройки аккаунта',
      orderHistory: 'История заказов',
      paymentMethods: 'Способы оплаты',
      addresses: 'Адреса',
      notifications: 'Уведомления',
      help: 'Помощь',
      about: 'О приложении',
      termsOfService: 'Условия использования',
      privacyPolicy: 'Политика конфиденциальности',
      logout: 'Выход',
      editProfile: 'Редактировать профиль',
      changePassword: 'Изменить пароль',
      deleteAccount: 'Удалить аккаунт',
      language: 'Язык',
      theme: 'Тема',
      pushNotifications: 'Push уведомления',
      emailNotifications: 'Email уведомления',
      smsNotifications: 'SMS уведомления',
      contactSupport: 'Связаться с поддержкой',
      faq: 'Частые вопросы',
      version: 'Версия'
    },
    errors: {
      networkError: 'Ошибка сети',
      serverError: 'Ошибка сервера',
      notFound: 'Не найдено',
      unauthorized: 'Не авторизован',
      forbidden: 'Запрещено',
      badRequest: 'Неверный запрос',
      timeout: 'Тайм-аут',
      unknownError: 'Неизвестная ошибка',
      validationError: 'Ошибка валидации',
      paymentError: 'Ошибка оплаты',
      locationError: 'Ошибка геолокации',
      cameraError: 'Ошибка камеры',
      storageError: 'Ошибка хранилища'
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