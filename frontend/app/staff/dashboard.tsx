import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useMegaBodegaI18n } from '../../contexts/MegaBodegaI18nContext';
import { MegaBodegaLanguageSelector } from '../../components/MegaBodegaLanguageSelector';

export default function StaffDashboardScreen() {
  const { t } = useMegaBodegaI18n();
  const [selectedTab, setSelectedTab] = useState('orders');

  const todayStats = {
    orders: 25,
    revenue: '$485.50',
    products: 127,
    lowStock: 8
  };

  const recentOrders = [
    {
      id: '#001',
      customer: 'María González',
      items: 3,
      total: '$25.50',
      status: 'preparing',
      time: '5 min ago'
    },
    {
      id: '#002',
      customer: 'Carlos Rodríguez', 
      items: 2,
      total: '$18.00',
      status: 'ready',
      time: '8 min ago'
    },
    {
      id: '#003',
      customer: 'Ana Morales',
      items: 5,
      total: '$42.75',
      status: 'delivered',
      time: '15 min ago'
    }
  ];

  const lowStockProducts = [
    { name: 'Pizza Margherita', stock: 2, category: 'Comida' },
    { name: 'Coca Cola 500ml', stock: 5, category: 'Bebidas' },
    { name: 'Pan Integral', stock: 3, category: 'Panadería' },
    { name: 'Leche Entera', stock: 1, category: 'Lácteos' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return '#FF9500';
      case 'ready': return '#34C759';
      case 'delivered': return '#007AFF';
      default: return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'Preparando';
      case 'ready': return 'Listo';
      case 'delivered': return 'Entregado';
      default: return status;
    }
  };

  const handleOrderAction = (orderId: string, action: string) => {
    Alert.alert(
      'Confirmar Acción',
      `¿Deseas ${action} el pedido ${orderId}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log(`${action} order ${orderId}`) }
      ]
    );
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
          <View>
            <Text style={styles.welcomeText}>Panel Staff 👩‍💼</Text>
            <Text style={styles.headerTitle}>MegaBodega Admin</Text>
          </View>
          <MegaBodegaLanguageSelector compact />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'orders' && styles.activeTab]}
          onPress={() => setSelectedTab('orders')}
        >
          <Text style={[styles.tabText, selectedTab === 'orders' && styles.activeTabText]}>
            {t('staff.orders')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'products' && styles.activeTab]}
          onPress={() => setSelectedTab('products')}
        >
          <Text style={[styles.tabText, selectedTab === 'products' && styles.activeTabText]}>
            Productos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'analytics' && styles.activeTab]}
          onPress={() => setSelectedTab('analytics')}
        >
          <Text style={[styles.tabText, selectedTab === 'analytics' && styles.activeTabText]}>
            {t('staff.analytics')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Hoy</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{todayStats.orders}</Text>
              <Text style={styles.statLabel}>Pedidos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{todayStats.revenue}</Text>
              <Text style={styles.statLabel}>Ingresos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{todayStats.products}</Text>
              <Text style={styles.statLabel}>Productos</Text>
            </View>
            <View style={[styles.statCard, { borderColor: '#FF3B30' }]}>
              <Text style={[styles.statNumber, { color: '#FF3B30' }]}>{todayStats.lowStock}</Text>
              <Text style={styles.statLabel}>Bajo Stock</Text>
            </View>
          </View>
        </View>

        {/* Orders Tab */}
        {selectedTab === 'orders' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pedidos Recientes</Text>
            {recentOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderCustomer}>{order.customer}</Text>
                    <Text style={styles.orderId}>{order.id}</Text>
                  </View>
                  <View style={styles.orderMeta}>
                    <Text style={styles.orderTotal}>{order.total}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                      <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.orderDetails}>
                  <Text style={styles.orderItems}>{order.items} productos</Text>
                  <Text style={styles.orderTime}>{order.time}</Text>
                </View>
                
                {order.status === 'preparing' && (
                  <View style={styles.orderActions}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleOrderAction(order.id, 'marcar como listo')}
                    >
                      <Text style={styles.actionButtonText}>Marcar Listo</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Products Tab */}
        {selectedTab === 'products' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('staff.manageProducts')}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Agregar</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.subsectionTitle}>Productos con Bajo Stock</Text>
            {lowStockProducts.map((product, index) => (
              <View key={index} style={styles.productCard}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                </View>
                <View style={styles.productStock}>
                  <Text style={[styles.stockNumber, { color: product.stock <= 2 ? '#FF3B30' : '#FF9500' }]}>
                    {product.stock}
                  </Text>
                  <Text style={styles.stockLabel}>en stock</Text>
                </View>
                <TouchableOpacity style={styles.restockButton}>
                  <Text style={styles.restockButtonText}>Reabastecer</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('staff.analytics')}</Text>
            
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsTitle}>Ventas de la Semana</Text>
              <Text style={styles.analyticsValue}>$2,480.50</Text>
              <Text style={styles.analyticsChange}>+15.2% vs semana anterior</Text>
            </View>
            
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsTitle}>Producto Más Vendido</Text>
              <Text style={styles.analyticsValue}>Pizza Margherita</Text>
              <Text style={styles.analyticsChange}>45 unidades vendidas</Text>
            </View>
            
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsTitle}>Horario Pico</Text>
              <Text style={styles.analyticsValue}>6:00 PM - 8:00 PM</Text>
              <Text style={styles.analyticsChange}>35% de pedidos diarios</Text>
            </View>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    marginHorizontal: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  orderId: {
    fontSize: 14,
    color: '#999',
  },
  orderMeta: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderItems: {
    fontSize: 14,
    color: '#999',
  },
  orderTime: {
    fontSize: 14,
    color: '#999',
  },
  orderActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  productCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#999',
  },
  productStock: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  stockNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stockLabel: {
    fontSize: 12,
    color: '#999',
  },
  restockButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  restockButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  analyticsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  analyticsTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  analyticsChange: {
    fontSize: 14,
    color: '#34C759',
  },
});