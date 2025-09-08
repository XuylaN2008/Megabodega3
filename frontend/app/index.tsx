import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MegaBodegaLanguageSelector } from '../components/MegaBodegaLanguageSelector';
import { useMegaBodegaI18n } from '../contexts/MegaBodegaI18nContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { t } = useMegaBodegaI18n();
  const { user } = useAuth();
  const { state } = useCart();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    { 
      icon: '🛒', 
      text: t('customer.categories'),
      color: '#007AFF'
    },
    { 
      icon: '💳', 
      text: t('customer.payWithStripe'),
      color: '#34C759'
    },
    { 
      icon: '🚚', 
      text: t('courier.route'),
      color: '#FF9500'
    },
    { 
      icon: '📱', 
      text: t('customer.orderStatus'),
      color: '#AF52DE'
    }
  ];

  // Quick actions based on user role
  const getQuickActions = () => {
    if (!user) {
      return [
        { label: t('auth.login'), route: '/auth/login', icon: '👤', color: '#007AFF' },
        { label: t('auth.register'), route: '/auth/register', icon: '📝', color: '#34C759' },
        { label: t('nav.catalog'), route: '/catalog', icon: '🛒', color: '#FF9500' },
      ];
    }

    const commonActions = [
      { label: t('nav.catalog'), route: '/catalog', icon: '🛒', color: '#007AFF' },
      { label: t('nav.profile'), route: '/profile', icon: '👤', color: '#AF52DE' },
    ];

    if (user.role === 'customer') {
      return [
        { label: t('nav.home'), route: '/customer/home', icon: '🏠', color: '#34C759' },
        ...commonActions,
        { 
          label: `${t('nav.cart')} ${state.itemCount > 0 ? `(${state.itemCount})` : ''}`, 
          route: '/cart', 
          icon: '🛒', 
          color: '#FF9500',
          badge: state.itemCount 
        },
      ];
    } else if (user.role === 'courier') {
      return [
        { label: 'Dashboard', route: '/courier/dashboard', icon: '🚴', color: '#34C759' },
        ...commonActions,
      ];
    } else if (user.role === 'staff') {
      return [
        { label: 'Panel Admin', route: '/staff/dashboard', icon: '👩‍💼', color: '#34C759' },
        ...commonActions,
      ];
    }

    return commonActions;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a', '#1a1a1a']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Language Selector */}
        <Animated.View 
          style={[
            styles.languageSelectorContainer,
            { opacity: fadeAnim }
          ]}
        >
          <MegaBodegaLanguageSelector compact />
        </Animated.View>

        {/* Logo and Title */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: logoScale }
              ]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#007AFF', '#0051D5']}
              style={styles.logoGradient}
            >
              <Text style={styles.logoEmoji}>🏪</Text>
            </LinearGradient>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{t('welcome.title')}</Text>
              <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
            </View>
          </View>
          <Text style={styles.slogan}>{t('welcome.slogan')}</Text>
        </Animated.View>

        {/* User Welcome */}
        {user && (
          <Animated.View 
            style={[
              styles.userWelcome,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.userWelcomeText}>
              ¡Hola, {user.full_name}! 👋
            </Text>
            <Text style={styles.userRoleText}>
              {user.role === 'customer' ? '👤 Cliente' : 
               user.role === 'courier' ? '🚴 Repartidor' : 
               '👩‍💼 Personal'}
            </Text>
          </Animated.View>
        )}

        {/* Features Grid */}
        <Animated.View 
          style={[
            styles.featuresContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {features.map((feature, index) => (
            <Animated.View
              key={index}
              style={[
                styles.featureCard,
                {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: Animated.add(slideAnim, new Animated.Value(index * 10))
                  }]
                }
              ]}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureText}>{feature.text}</Text>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          style={[
            styles.buttonContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.actionsTitle}>Acciones rápidas</Text>
          
          {getQuickActions().map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={() => router.push(action.route as any)}
            >
              <LinearGradient
                colors={[action.color, `${action.color}CC`]}
                style={styles.actionGradient}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionText}>{action.label}</Text>
                {action.badge && action.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{action.badge}</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}

          {/* Google Sign In for non-authenticated users */}
          {!user && (
            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.googleButtonText}>
                {t('auth.signInWithGoogle')}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
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
  languageSelectorContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 28,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 4,
  },
  slogan: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  userWelcome: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  userWelcomeText: {
    fontSize: 20,
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
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: (width - 48 - 16) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  actionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 8,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});