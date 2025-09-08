import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/AuthContext';
import { MegaBodegaI18nProvider } from '../contexts/MegaBodegaI18nContext';

export default function RootLayout() {
  return (
    <MegaBodegaI18nProvider>
      <AuthProvider>
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
          <Stack.Screen name="browse/index" />
          <Stack.Screen name="products" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="customer/home" />
          <Stack.Screen name="courier/dashboard" />
          <Stack.Screen name="staff/dashboard" />
        </Stack>
      </AuthProvider>
    </MegaBodegaI18nProvider>
  );
}