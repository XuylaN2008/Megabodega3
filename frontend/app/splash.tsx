import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMegaBodegaI18n } from '../contexts/MegaBodegaI18nContext';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { t } = useMegaBodegaI18n();
  
  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const sloganOpacity = useRef(new Animated.Value(0)).current;
  const backgroundScale = useRef(new Animated.Value(1.2)).current;

  useEffect(() => {
    // Start animation sequence
    startAnimations();
    
    // Navigate to main screen after animation
    const timer = setTimeout(() => {
      router.replace('/');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const startAnimations = () => {
    // Background zoom in
    Animated.timing(backgroundScale, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Logo entrance with bounce
    Animated.sequence([
      Animated.delay(300),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo subtle rotation
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoRotation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Title fade in and slide up
    Animated.sequence([
      Animated.delay(800),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Subtitle fade in
    Animated.sequence([
      Animated.delay(1400),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Slogan fade in
    Animated.sequence([
      Animated.delay(2000),
      Animated.timing(sloganOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const logoRotationInterpolate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Background */}
      <Animated.View 
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ scale: backgroundScale }] }
        ]}
      >
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a', '#1a1a1a']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Floating particles background effect */}
      <View style={styles.particlesContainer}>
        {[...Array(8)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                opacity: subtitleOpacity,
              }
            ]}
          />
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: logoScale },
                { rotate: logoRotationInterpolate }
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#007AFF', '#0051D5']}
            style={styles.logoGradient}
          >
            <Text style={styles.logoEmoji}>🏪</Text>
          </LinearGradient>
        </Animated.View>

        {/* Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          <Text style={styles.title}>{t('welcome.title')}</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View
          style={[
            styles.subtitleContainer,
            { opacity: subtitleOpacity },
          ]}
        >
          <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
        </Animated.View>

        {/* Slogan */}
        <Animated.View
          style={[
            styles.sloganContainer,
            { opacity: sloganOpacity },
          ]}
        >
          <Text style={styles.slogan}>{t('welcome.slogan')}</Text>
        </Animated.View>
      </View>

      {/* Loading indicator */}
      <Animated.View 
        style={[
          styles.loadingContainer,
          { opacity: sloganOpacity }
        ]}
      >
        <View style={styles.loadingBar}>
          <Animated.View
            style={[
              styles.loadingProgress,
              {
                transform: [{
                  scaleX: titleOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                }],
              },
            ]}
          />
        </View>
        <Text style={styles.loadingText}>Cargando...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 16,
  },
  logoEmoji: {
    fontSize: 60,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleContainer: {
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sloganContainer: {
    marginBottom: 60,
  },
  slogan: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  loadingBar: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  loadingProgress: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 2,
    transformOrigin: 'left',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
});