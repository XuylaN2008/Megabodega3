import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>EcuaDelivery</Text>
          <Text style={styles.subtitle}>
            Tu app de delivery favorita en Ecuador
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <Text style={styles.featureText}>🛒 Catálogo completo de productos</Text>
          <Text style={styles.featureText}>💳 Pagos seguros con tarjeta</Text>
          <Text style={styles.featureText}>🚚 Entrega rápida a domicilio</Text>
          <Text style={styles.featureText}>📱 Seguimiento en tiempo real</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/register" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/browse" asChild>
            <TouchableOpacity style={styles.tertiaryButton}>
              <Text style={styles.tertiaryButtonText}>Explorar sin cuenta</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    marginBottom: 60,
    alignItems: 'flex-start',
  },
  featureText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 16,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    color: '#999',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});