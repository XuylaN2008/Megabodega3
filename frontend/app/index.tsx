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
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MegaBodegaLanguageSelector } from '../components/MegaBodegaLanguageSelector';
import { useMegaBodegaI18n } from '../contexts/MegaBodegaI18nContext';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { t } = useMegaBodegaI18n();
  
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
            <Text style={styles.logoEmoji}>🏪</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{t('welcome.title')}</Text>
              <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
            </View>
          </View>
          <Text style={styles.slogan}>{t('welcome.slogan')}</Text>
        </Animated.View>

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

        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.buttonContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <LinearGradient
                colors={['#007AFF', '#0051D5']}
                style={styles.gradientButton}
              >
                <Text style={styles.primaryButtonText}>
                  {t('auth.signInWithGoogle')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          <Link href="/products" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>
                🛒 {t('nav.catalog')}
              </Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.roleButtonsContainer}>
            <Text style={styles.roleTitle}>{t('auth.selectRole')}</Text>
            
            <Link href="/customer/home" asChild>
              <TouchableOpacity style={styles.roleButton}>
                <Text style={styles.roleEmoji}>👤</Text>
                <Text style={styles.roleButtonText}>{t('auth.customer')}</Text>
                <Text style={styles.roleDescription}>{t('auth.customerDesc')}</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/courier/dashboard" asChild>
              <TouchableOpacity style={styles.roleButton}>
                <Text style={styles.roleEmoji}>🚴</Text>
                <Text style={styles.roleButtonText}>{t('auth.courier')}</Text>
                <Text style={styles.roleDescription}>{t('auth.courierDesc')}</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/staff/dashboard" asChild>
              <TouchableOpacity style={styles.roleButton}>
                <Text style={styles.roleEmoji}>👩‍💼</Text>
                <Text style={styles.roleButtonText}>{t('auth.staff')}</Text>
                <Text style={styles.roleDescription}>{t('auth.staffDesc')}</Text>
              </TouchableOpacity>
            </Link>
          </View>
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
  logoEmoji: {
    fontSize: 48,
    marginRight: 16,
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
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: (width - 48 - 16) / 2, // Account for padding and gap
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
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderWidth: 2,
    borderColor: '#34C759',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#34C759',
    fontSize: 18,
    fontWeight: '600',
  },
  roleButtonsContainer: {
    marginTop: 32,
  },
  roleTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  roleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  roleEmoji: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  roleDescription: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
  },
});