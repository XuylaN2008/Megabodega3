import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useAuth } from './AuthContext';

export type Theme = 'light' | 'dark';

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  notification: string;
  error: string;
  success: string;
  warning: string;
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  isDark: boolean;
  isLoading: boolean;
  toggleTheme: () => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
}

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  primary: '#007AFF',
  secondary: '#5856D6',
  text: '#000000',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  card: '#FFFFFF',
  notification: '#FF3B30',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
};

const darkColors: ThemeColors = {
  background: '#000000',
  surface: '#1C1C1E',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  card: '#1C1C1E',
  notification: '#FF453A',
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const API_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL || 'https://megabodega-delivery.preview.emergentagent.com';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    loadTheme();
  }, [user, isAuthenticated]);

  const loadTheme = async () => {
    try {
      setIsLoading(true);
      
      if (isAuthenticated && user) {
        // Load theme from server for authenticated users
        await loadServerTheme();
      } else {
        // Load theme from local storage for guests
        await loadLocalTheme();
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Fallback to local theme
      await loadLocalTheme();
    } finally {
      setIsLoading(false);
    }
  };

  const loadServerTheme = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        await loadLocalTheme();
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/user/theme`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setThemeState(data.theme || 'light');
        // Also save to local storage as backup
        await AsyncStorage.setItem('theme_preference', data.theme || 'light');
      } else {
        await loadLocalTheme();
      }
    } catch (error) {
      console.error('Error loading server theme:', error);
      await loadLocalTheme();
    }
  };

  const loadLocalTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme_preference');
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setThemeState(storedTheme);
      }
    } catch (error) {
      console.error('Error loading local theme:', error);
    }
  };

  const saveThemeToServer = async (newTheme: Theme) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) return;

      await fetch(`${API_BASE_URL}/api/user/theme`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (error) {
      console.error('Error saving theme to server:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      
      // Save to local storage immediately
      await AsyncStorage.setItem('theme_preference', newTheme);
      
      // Save to server for authenticated users
      if (isAuthenticated && user) {
        await saveThemeToServer(newTheme);
      }
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await setTheme(newTheme);
  };

  const colors = theme === 'light' ? lightColors : darkColors;
  const isDark = theme === 'dark';

  const value: ThemeContextType = {
    theme,
    colors,
    isDark,
    isLoading,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}