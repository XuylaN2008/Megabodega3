import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SplashScreen() {
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const sloganOpacity = useSharedValue(0);
  const backgroundGradient = useSharedValue(0);

  const navigateToWelcome = () => {
    router.replace('/welcome');
  };

  useEffect(() => {
    // Sequence of animations
    const startAnimations = () => {
      // Background gradient
      backgroundGradient.value = withTiming(1, { duration: 1000 });
      
      // Logo appears with spring effect
      logoScale.value = withDelay(
        300,
        withSpring(1, {
          damping: 15,
          stiffness: 200,
        })
      );
      
      logoOpacity.value = withDelay(
        300,
        withTiming(1, { duration: 600 })
      );

      // Title appears
      titleOpacity.value = withDelay(
        800,
        withTiming(1, { duration: 500 })
      );

      // Slogan appears
      sloganOpacity.value = withDelay(
        1200,
        withTiming(1, { duration: 500 }, () => {
          // Navigate to welcome after animations complete
          runOnJS(navigateToWelcome)();
        })
      );
    };

    // Start animations after a short delay
    setTimeout(startAnimations, 500);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(titleOpacity.value, [0, 1], [20, 0]);
    return {
      opacity: titleOpacity.value,
      transform: [{ translateY }],
    };
  });

  const sloganAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(sloganOpacity.value, [0, 1], [20, 0]);
    return {
      opacity: sloganOpacity.value,
      transform: [{ translateY }],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundGradient.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundGradient, backgroundAnimatedStyle]}>
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a', '#1a1a1a']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <View style={styles.content}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>MB</Text>
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          MegaBodega
        </Animated.Text>

        {/* Slogan */}
        <Animated.Text style={[styles.slogan, sloganAnimatedStyle]}>
          Delivery a tu puerta
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
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
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: -2,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -1,
  },
  slogan: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});