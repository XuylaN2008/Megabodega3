import React, { useState, useEffect } from 'react';
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
import { Link } from 'expo-router';
import { useSimpleI18n } from '../contexts/SimpleI18nContext';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  store_id: string;
  category_id: string;
  is_available: boolean;
  stock_quantity: number;
  unit: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
}

interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  delivery_fee: number;
  min_order_amount: number;
}

export default function ProductsScreen() {
  const { t } = useSimpleI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cart, setCart] = useState<{[productId: string]: number}>({});

  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL + '/api';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes, storesRes] = await Promise.all([
        axios.get(`${backendUrl}/products`),
        axios.get(`${backendUrl}/categories`),
        axios.get(`${backendUrl}/stores`)
      ]);
      
      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
      setStores(storesRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Информация', 'Загружаем демо-товары...');
      
      // Fallback demo data if API fails
      setProducts([
        {
          id: '1',
          name: 'Empanada de Queso',
          description: 'Вкусная эмпанада с сыром',
          price: 1.25,
          store_id: 'store1',
          category_id: 'cat1',
          is_available: true,
          stock_quantity: 50,
          unit: 'шт'
        },
        {
          id: '2',
          name: 'Ceviche de Camarón',
          description: 'Свежий севиче с креветками',
          price: 8.50,
          store_id: 'store1',
          category_id: 'cat1',
          is_available: true,
          stock_quantity: 20,
          unit: 'порция'
        }
      ]);
      setCategories([{ id: 'cat1', name: 'Еда', description: 'Вкусная еда', is_active: true }]);
      setStores([{ id: 'store1', name: 'Местная кухня', description: 'Лучшие блюда', address: 'Кито', phone: '+593', delivery_fee: 2.5, min_order_amount: 10 }]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    
    const product = products.find(p => p.id === productId);
    Alert.alert('✅ Добавлено!', `${product?.name} добавлен в корзину`);
  };

  const getStoreById = (storeId: string) => {
    return stores.find(store => store.id === storeId);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory && product.is_available;
  });

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Загружаем товары...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Link href="/" asChild>
              <TouchableOpacity style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            </Link>
            <Text style={styles.title}>🛒 Каталог товаров</Text>
            <View style={styles.cartButton}>
              <Ionicons name="basket" size={24} color="#fff" />
              {getCartItemCount() > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск товаров..."
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Категории</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <TouchableOpacity
              style={[styles.categoryChip, !selectedCategory && styles.categoryChipSelected]}
              onPress={() => setSelectedCategory('')}
            >
              <Text style={[styles.categoryChipText, !selectedCategory && styles.categoryChipTextSelected]}>
                Все
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryChip, selectedCategory === category.id && styles.categoryChipSelected]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[styles.categoryChipText, selectedCategory === category.id && styles.categoryChipTextSelected]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            Товары ({filteredProducts.length})
          </Text>
          
          {filteredProducts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="basket-outline" size={64} color="#666" />
              <Text style={styles.emptyText}>Товары не найдены</Text>
              <Text style={styles.emptySubtext}>Попробуйте изменить фильтры поиска</Text>
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {filteredProducts.map((product) => {
                const store = getStoreById(product.store_id);
                return (
                  <View key={product.id} style={styles.productCard}>
                    {/* Product Image */}
                    <View style={styles.productImageContainer}>
                      <View style={styles.productImagePlaceholder}>
                        <Ionicons name="restaurant" size={32} color="#007AFF" />
                      </View>
                    </View>
                    
                    {/* Product Info */}
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.productDescription} numberOfLines={2}>
                        {product.description}
                      </Text>
                      
                      {/* Store Info */}
                      {store && (
                        <Text style={styles.storeInfo} numberOfLines={1}>
                          📍 {store.name}
                        </Text>
                      )}
                      
                      {/* Price and Add Button */}
                      <View style={styles.productFooter}>
                        <View style={styles.priceContainer}>
                          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                          <Text style={styles.unit}>/ {product.unit}</Text>
                        </View>
                        
                        <TouchableOpacity
                          style={styles.addToCartButton}
                          onPress={() => addToCart(product.id)}
                        >
                          <Ionicons name="add" size={20} color="#fff" />
                        </TouchableOpacity>
                      </View>
                      
                      {/* Stock Info */}
                      <Text style={styles.stockInfo}>
                        {product.stock_quantity > 0 
                          ? `${product.stock_quantity} в наличии`
                          : 'Нет в наличии'
                        }
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Login prompt */}
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>
            Хотите оформить заказ? Войдите в аккаунт!
          </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.loginPromptButton}>
              <Text style={styles.loginPromptButtonText}>Войти в аккаунт</Text>
            </TouchableOpacity>
          </Link>
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
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 24,
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
  },
  categoryChip: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryChipText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  productsSection: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  productsGrid: {
    paddingHorizontal: 24,
    gap: 16,
  },
  productCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  productImageContainer: {
    height: 120,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 18,
    marginBottom: 8,
  },
  storeInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  unit: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockInfo: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  loginPrompt: {
    margin: 24,
    padding: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  loginPromptText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  loginPromptButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  loginPromptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});