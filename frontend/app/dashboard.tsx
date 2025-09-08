import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useSimpleI18n } from '../contexts/SimpleI18nContext';
import { SimpleLanguageSelector } from '../components/SimpleLanguageSelector';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const { t } = useSimpleI18n();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'customer':
        return { icon: 'person', label: t('auth.customerRole'), color: '#007AFF' };
      case 'store_admin':
        return { icon: 'storefront', label: t('auth.storeRole'), color: '#FF9500' };
      case 'delivery':
        return { icon: 'bicycle', label: t('auth.deliveryRole'), color: '#34C759' };
      default:
        return { icon: 'person', label: 'User', color: '#999' };
    }
  };

  const roleInfo = getRoleDisplay(user?.role || 'customer');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.welcomeText}>Добро пожаловать!</Text>
            <SimpleLanguageSelector />
          </View>
          
          <View style={styles.userInfo}>
            <View style={[styles.roleIcon, { backgroundColor: roleInfo.color + '20' }]}>
              <Ionicons name={roleInfo.icon as any} size={32} color={roleInfo.color} />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.full_name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <View style={styles.roleContainer}>
                <Text style={[styles.roleText, { color: roleInfo.color }]}>
                  {roleInfo.label}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Success Message */}
        <View style={styles.successCard}>
          <Ionicons name="checkmark-circle" size={48} color="#34C759" />
          <Text style={styles.successTitle}>🎉 Успешная регистрация!</Text>
          <Text style={styles.successText}>
            Ваш аккаунт был успешно создан. Теперь вы можете пользоваться всеми функциями EcuaDelivery.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Доступные функции:</Text>
          
          <View style={styles.featureItem}>
            <Ionicons name="restaurant" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Каталог продуктов</Text>
              <Text style={styles.featureDescription}>Просматривайте товары от лучших магазинов</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="card" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Безопасные платежи</Text>
              <Text style={styles.featureDescription}>Оплачивайте заказы картой или наличными</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="location" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Быстрая доставка</Text>
              <Text style={styles.featureDescription}>Получайте заказы в удобное время</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="notifications" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Уведомления</Text>
              <Text style={styles.featureDescription}>Отслеживайте статус ваших заказов</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryAction}>
            <Ionicons name="search" size={20} color="#fff" />
            <Text style={styles.primaryActionText}>Начать покупки</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction}>
            <Ionicons name="person" size={20} color="#007AFF" />
            <Text style={styles.secondaryActionText}>Редактировать профиль</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#FF3B30" />
            <Text style={styles.logoutButtonText}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  roleContainer: {
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#333',
    borderRadius: 12,
    overflow: 'hidden',
  },
  successCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#34C759',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 12,
  },
  featureContent: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 18,
  },
  actionsContainer: {
    gap: 12,
  },
  primaryAction: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryAction: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryActionText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});