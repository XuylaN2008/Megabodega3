import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useMegaBodegaI18n } from '../../contexts/MegaBodegaI18nContext';
import { MegaBodegaLanguageSelector } from '../../components/MegaBodegaLanguageSelector';

export default function CourierDashboardScreen() {
  const { t } = useMegaBodegaI18n();
  const [isOnline, setIsOnline] = useState(false);

  const availableOrders = [
    {
      id: 1,
      customer: 'María González',
      address: 'Av. 10 de Agosto 123',
      items: 3,
      distance: '1.2 km',
      payment: '$15.50',
      time: '20 min',
      status: 'pending'
    },
    {
      id: 2,
      customer: 'Carlos Rodríguez',
      address: 'Calle Bolívar 456',
      items: 2,
      distance: '0.8 km',
      payment: '$12.00',
      time: '15 min',
      status: 'pending'
    },
    {
      id: 3,
      customer: 'Ana Morales',
      address: 'Av. Amazonas 789',
      items: 5,
      distance: '2.1 km',
      payment: '$28.75',
      time: '35 min',
      status: 'pending'
    }
  ];

  const currentDelivery = {
    id: 4,
    customer: 'Pedro Silva',
    address: 'Calle García Moreno 321',
    phone: '+593 99 123 4567',
    items: 4,
    payment: '$22.30',
    status: 'in_progress'
  };

  const todayStats = {
    deliveries: 8,
    earnings: '$95.40',
    hours: '6.5h',
    rating: 4.8
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.welcomeText}>¡Hola Courier! 🚴</Text>
            <Text style={styles.headerTitle}>Panel de Control</Text>
          </View>
          <MegaBodegaLanguageSelector compact />
        </View>
        
        {/* Online Status Toggle */}
        <View style={styles.statusContainer}>
          <View style={styles.statusToggle}>
            <Text style={[styles.statusText, { color: isOnline ? '#34C759' : '#999' }]}>
              {isOnline ? 'En línea' : 'Desconectado'}
            </Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor={isOnline ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas de Hoy</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{todayStats.deliveries}</Text>
              <Text style={styles.statLabel}>Entregas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{todayStats.earnings}</Text>
              <Text style={styles.statLabel}>{t('courier.earnings')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{todayStats.hours}</Text>
              <Text style={styles.statLabel}>Horas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>⭐ {todayStats.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Current Delivery */}
        {currentDelivery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Entrega Actual</Text>
            <View style={styles.currentDeliveryCard}>
              <LinearGradient
                colors={['#007AFF', '#0051D5']}
                style={styles.deliveryGradient}
              >
                <View style={styles.deliveryHeader}>
                  <Text style={styles.deliveryCustomer}>{currentDelivery.customer}</Text>
                  <Text style={styles.deliveryPayment}>{currentDelivery.payment}</Text>
                </View>
                <Text style={styles.deliveryAddress}>📍 {currentDelivery.address}</Text>
                <Text style={styles.deliveryPhone}>📞 {currentDelivery.phone}</Text>
                
                <View style={styles.deliveryActions}>
                  <TouchableOpacity style={styles.routeButton}>
                    <Text style={styles.routeButtonText}>🗺️ {t('courier.route')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deliveredButton}>
                    <Text style={styles.deliveredButtonText}>{t('courier.markDelivered')}</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Available Orders */}
        {isOnline && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('courier.availableOrders')}</Text>
            {availableOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderCustomer}>{order.customer}</Text>
                    <Text style={styles.orderAddress}>📍 {order.address}</Text>
                  </View>
                  <View style={styles.orderMeta}>
                    <Text style={styles.orderPayment}>{order.payment}</Text>
                    <Text style={styles.orderDistance}>{order.distance}</Text>
                  </View>
                </View>
                
                <View style={styles.orderDetails}>
                  <Text style={styles.orderItems}>{order.items} productos</Text>
                  <Text style={styles.orderTime}>⏱️ ~{order.time}</Text>
                </View>
                
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>{t('courier.acceptOrder')}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Offline Message */}
        {!isOnline && (
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineIcon}>😴</Text>
            <Text style={styles.offlineTitle}>Estás desconectado</Text>
            <Text style={styles.offlineMessage}>
              Activa el modo en línea para recibir pedidos
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    marginHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  currentDeliveryCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  deliveryGradient: {
    padding: 20,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryCustomer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  deliveryPayment: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  deliveryAddress: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    opacity: 0.9,
  },
  deliveryPhone: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    opacity: 0.9,
  },
  deliveryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  routeButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  routeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deliveredButton: {
    flex: 1,
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  deliveredButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  orderAddress: {
    fontSize: 14,
    color: '#999',
  },
  orderMeta: {
    alignItems: 'flex-end',
  },
  orderPayment: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 4,
  },
  orderDistance: {
    fontSize: 14,
    color: '#007AFF',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderItems: {
    fontSize: 14,
    color: '#999',
  },
  orderTime: {
    fontSize: 14,
    color: '#FF9500',
  },
  acceptButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  offlineContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  offlineIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  offlineTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  offlineMessage: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
});