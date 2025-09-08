import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/AuthContext';
import { SimpleI18nProvider } from '../contexts/SimpleI18nContext';

export default function RootLayout() {
  return (
    <SimpleI18nProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#1a1a1a' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/register" />
          <Stack.Screen name="browse/index" />
          <Stack.Screen name="products" />
          <Stack.Screen name="dashboard" />
        </Stack>
      </AuthProvider>
    </SimpleI18nProvider>
  );
}