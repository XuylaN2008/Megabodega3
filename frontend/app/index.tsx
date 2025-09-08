import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
} from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MegaBodegaLanguageSelector } from '../components/MegaBodegaLanguageSelector';
import { useMegaBodegaI18n } from '../contexts/MegaBodegaI18nContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function WelcomeScreen() {
  const { t } = useMegaBodegaI18n();
  const { user } = useAuth();
  const { state } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        {/* Language Selector */}
        <View style={styles.languageSelectorContainer}>
          <MegaBodegaLanguageSelector />
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🏪</Text>
          <Text style={styles.title}>{t('welcome.title')}</Text>
          <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
        </View>

        {/* User Welcome */}
        {user && (
          <View style={styles.userWelcome}>
            <Text style={styles.userWelcomeText}>
              {t('welcome.greeting')}, {user.full_name}! 👋
            </Text>
            <Text style={styles.userRoleText}>
              {user.role === 'customer' ? t('auth.customer') : 
               user.role === 'courier' ? t('auth.courier') : 
               t('auth.staff')}
            </Text>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.buttonContainer}>
          <Link href="/catalog" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                🛒 {t('nav.catalog')}
              </Text>
            </TouchableOpacity>
          </Link>

          {user ? (
            <>
              <Link href="/cart" asChild>
                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>
                    🛒 {t('nav.cart')} {state.itemCount > 0 ? `(${state.itemCount})` : ''}
                  </Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/profile" asChild>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>
                    👤 {t('nav.profile')}
                  </Text>
                </TouchableOpacity>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login" asChild>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>
                    👤 {t('auth.login')}
                  </Text>
                </TouchableOpacity>
              </Link>

              <Link href="/auth/register" asChild>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>
                    📝 {t('auth.register')}
                  </Text>
                </TouchableOpacity>
              </Link>
            </>
          )}
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
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  languageSelectorContainer: {
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 60,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: -2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: '600',
  },
  userWelcome: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  userWelcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  userRoleText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cartButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});