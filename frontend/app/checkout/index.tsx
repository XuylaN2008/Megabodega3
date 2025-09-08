import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMegaBodegaI18n } from '../../contexts/MegaBodegaI18nContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import { MegaBodegaLanguageSelector } from '../../components/MegaBodegaLanguageSelector';

export default function CheckoutScreen() {
  const { t } = useMegaBodegaI18n();
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    phone: user?.phone || '',
    notes: '',
  });

  const deliveryFee = 2.50;
  const finalTotal = state.total + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!deliveryInfo.address.trim()) {
      Alert.alert(t('common.error'), 'Por favor ingresa tu dirección de entrega');
      return;
    }

    if (!deliveryInfo.phone.trim()) {
      Alert.alert(t('common.error'), 'Por favor ingresa tu número de teléfono');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: state.items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        delivery_address: deliveryInfo.address,
        phone: deliveryInfo.phone,
        notes: deliveryInfo.notes,
      };

      const order = await apiService.createOrder(orderData);
      
      Alert.alert(
        t('cart.orderPlaced'),
        `Pedido #${order.id.slice(-6)} creado exitosamente. Total: $${finalTotal.toFixed(2)}`,
        [
          {
            text: 'Ver Pedido',
            onPress: () => {
              clearCart();
              router.replace('/customer/home');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert(t('common.error'), 'Error al crear el pedido. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    router.replace('/cart');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t('cart.checkoutTitle')}</Text>
          <Text style={styles.headerSubtitle}>Confirma tu pedido</Text>
        </View>
        <MegaBodegaLanguageSelector compact />
      </View>

      <ScrollView style={styles.content}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('cart.orderReview')}</Text>
          <View style={styles.summaryCard}>
            {state.items.map((item) => (
              <View key={item.id} style={styles.summaryItem}>
                <Text style={styles.summaryItemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.summaryItemDetails}>
                  {item.quantity}x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${state.total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Envío</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>{t('common.total')}</Text>
              <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('cart.deliveryInfo')}</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('customer.deliveryAddress')} *</Text>
              <TextInput
                style={styles.input}
                value={deliveryInfo.address}
                onChangeText={(text) => setDeliveryInfo(prev => ({...prev, address: text}))}
                placeholder="Ej: Av. 10 de Agosto 123, Quito"
                placeholderTextColor="#999"
                multiline
                numberOfLines={2}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('common.phone')} *</Text>
              <TextInput
                style={styles.input}
                value={deliveryInfo.phone}
                onChangeText={(text) => setDeliveryInfo(prev => ({...prev, phone: text}))}
                placeholder="+593 99 123 4567"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notas adicionales</Text>
              <TextInput
                style={styles.input}
                value={deliveryInfo.notes}
                onChangeText={(text) => setDeliveryInfo(prev => ({...prev, notes: text}))}
                placeholder="Ej: Casa azul, timbre roto"
                placeholderTextColor="#999"
                multiline
                numberOfLines={2}
              />
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('customer.paymentMethod')}</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentOption}>
              <Text style={styles.paymentIcon}>💳</Text>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>Pago contra entrega</Text>
                <Text style={styles.paymentDescription}>
                  Paga en efectivo cuando recibas tu pedido
                </Text>
              </View>
              <Text style={styles.paymentSelected}>✓</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[styles.placeOrderButton, loading && styles.buttonDisabled]}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          <LinearGradient
            colors={['#34C759', '#28A745']}
            style={styles.gradientButton}
          >
            <Text style={styles.placeOrderText}>
              {loading ? t('cart.processing') : `${t('cart.placeOrder')} - $${finalTotal.toFixed(2)}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryItem: {
    marginBottom: 8,
  },
  summaryItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  summaryItemDetails: {
    fontSize: 14,
    color: '#999',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#999',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 8,
    marginTop: 4,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
  },
  form: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    textAlignVertical: 'top',
  },
  paymentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#999',
  },
  paymentSelected: {
    fontSize: 20,
    color: '#34C759',
    fontWeight: 'bold',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  placeOrderButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});