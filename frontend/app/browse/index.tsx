import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { useI18n } from '../../contexts/I18nContext';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  interpolate,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function BrowseScreen() {
  const { t } = useI18n();
  
  // Animation values
  const headerAnimation = useSharedValue(0);
  const contentAnimation = useSharedValue(0);

  useEffect(() => {
    headerAnimation.value = withDelay(100, withSpring(1, { damping: 15, stiffness: 200 }));
    contentAnimation.value = withDelay(300, withSpring(1, { damping: 15, stiffness: 200 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(headerAnimation.value, [0, 1], [-30, 0]) }],
    opacity: headerAnimation.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(contentAnimation.value, [0, 1], [40, 0]) }],
    opacity: contentAnimation.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.title}>Explorar Productos</Text>
          <Text style={styles.subtitle}>Descubre lo que tenemos para ti</Text>
        </Animated.View>

        {/* Content */}
        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          <View style={styles.comingSoonContainer}>
            <Ionicons name="construct" size={64} color="#007AFF" />
            <Text style={styles.comingSoonTitle}>¡Próximamente!</Text>
            <Text style={styles.comingSoonText}>
              Estamos trabajando en traerte el mejor catálogo de productos.
              Mientras tanto, puedes crear una cuenta para estar al día.
            </Text>
            
            <View style={styles.buttonContainer}>
              <Link href="/auth/register" asChild>
                <AnimatedTouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>
                    {t('buttons.register')}
                  </Text>
                </AnimatedTouchableOpacity>
              </Link>
              
              <Link href="/auth/login" asChild>
                <AnimatedTouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>
                    {t('buttons.login')}
                  </Text>
                </AnimatedTouchableOpacity>
              </Link>
            </View>
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
  header: {
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  comingSoonContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  comingSoonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
    marginBottom: 16,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 16,
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
    borderRadius: 16,
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
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
});