import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { MegaBodegaI18nProvider } from '../contexts/MegaBodegaI18nContext';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function RootLayout() {
  return (
    <MegaBodegaI18nProvider>
      <AuthProvider>
        <CartProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#1a1a1a' },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="splash" />
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/register" />
            <Stack.Screen name="catalog/index" />
            <Stack.Screen name="cart/index" />
            <Stack.Screen name="checkout/index" />
            <Stack.Screen name="profile/index" />
            <Stack.Screen name="customer/home" />
            <Stack.Screen name="courier/dashboard" />
            <Stack.Screen name="staff/dashboard" />
          </Stack>
        </CartProvider>
      </AuthProvider>
    </MegaBodegaI18nProvider>
  );
}