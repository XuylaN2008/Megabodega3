import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL || 'https://megabodega-delivery.preview.emergentagent.com';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category_id: string;
  store_id: string;
  in_stock: boolean;
  quantity_available?: number;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface Store {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  rating?: number;
}

interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  delivery_address?: string;
  phone?: string;
  notes?: string;
}

interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}

class ApiService {
  private async getAuthHeader(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint}`;
    const authHeaders = await this.getAuthHeader();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Products
  async getProducts(filters?: {
    category_id?: string;
    store_id?: string;
    search?: string;
  }): Promise<Product[]> {
    const params = new URLSearchParams();
    if (filters?.category_id) params.append('category_id', filters.category_id);
    if (filters?.store_id) params.append('store_id', filters.store_id);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Product[]>(endpoint);
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories');
  }

  async getCategory(id: string): Promise<Category> {
    return this.request<Category>(`/categories/${id}`);
  }

  // Stores
  async getStores(): Promise<Store[]> {
    return this.request<Store[]>('/stores');
  }

  async getStore(id: string): Promise<Store> {
    return this.request<Store>(`/stores/${id}`);
  }

  // Orders
  async createOrder(orderData: {
    items: Array<{
      product_id: string;
      quantity: number;
    }>;
    delivery_address?: string;
    phone?: string;
    notes?: string;
  }): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getUserOrders(): Promise<Order[]> {
    return this.request<Order[]>('/orders/me');
  }

  async getOrder(id: string): Promise<Order> {
    return this.request<Order>(`/orders/${id}`);
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    return this.request<Order>(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Courier specific
  async getAvailableOrders(): Promise<Order[]> {
    return this.request<Order[]>('/orders/available');
  }

  async acceptOrder(orderId: string): Promise<Order> {
    return this.request<Order>(`/orders/${orderId}/accept`, {
      method: 'POST',
    });
  }

  // Staff specific
  async getAllOrders(filters?: {
    status?: Order['status'];
    date_from?: string;
    date_to?: string;
  }): Promise<Order[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.date_from) params.append('date_from', filters.date_from);
    if (filters?.date_to) params.append('date_to', filters.date_to);

    const queryString = params.toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Order[]>(endpoint);
  }

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    return this.request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    return this.request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string): Promise<void> {
    await this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics (Staff)
  async getAnalytics(period: 'day' | 'week' | 'month' = 'week'): Promise<{
    total_revenue: number;
    total_orders: number;
    top_products: Array<{
      product_id: string;
      product_name: string;
      quantity_sold: number;
      revenue: number;
    }>;
    orders_by_status: Record<Order['status'], number>;
  }> {
    return this.request(`/analytics?period=${period}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export type { Product, Category, Store, Order, OrderItem };