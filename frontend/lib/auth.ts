import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'customer' | 'store_admin' | 'delivery';
  is_active: boolean;
  store_id?: string;
  delivery_zone?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  token_type: string;
}

class AuthService {
  private baseURL = process.env.EXPO_PUBLIC_BACKEND_URL + '/api';
  
  constructor() {
    this.setupAxiosInterceptors();
  }

  private setupAxiosInterceptors() {
    // Request interceptor to add auth token
    axios.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  async register(userData: {
    email: string;
    full_name: string;
    phone: string;
    role: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/register`, userData);
      const authData = response.data;
      
      // Store auth token
      await AsyncStorage.setItem('auth_token', authData.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(authData.user));
      
      return authData;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/login`, {
        email,
        password,
      });
      const authData = response.data;
      
      // Store auth token
      await AsyncStorage.setItem('auth_token', authData.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(authData.user));
      
      return authData;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem('auth_token');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAuthToken();
    return !!token;
  }
}

export const authService = new AuthService();