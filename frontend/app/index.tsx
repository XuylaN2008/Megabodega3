import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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
import { LanguageSelector } from '../components/LanguageSelector';
import { useI18n } from '../contexts/I18nContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function WelcomeScreen() {
  const { t } = useI18n();
  
  // Animation values
  const titleAnimation = useSharedValue(0);
  const subtitleAnimation = useSharedValue(0);
  const featuresAnimation = useSharedValue(0);
  const buttonsAnimation = useSharedValue(0);
  const languageSelectorAnimation = useSharedValue(0);

  useEffect(() => {
    // Staggered entrance animations
    titleAnimation.value = withDelay(200, withSpring(1, {
      damping: 15,
      stiffness: 200,
    }));
    
    subtitleAnimation.value = withDelay(400, withSpring(1, {
      damping: 15,
      stiffness: 200,
    }));
    
    featuresAnimation.value = withDelay(600, withSpring(1, {
      damping: 15,
      stiffness: 200,
    }));
    
    buttonsAnimation.value = withDelay(800, withSpring(1, {
      damping: 15,
      stiffness: 200,
    }));

    languageSelectorAnimation.value = withDelay(1000, withSpring(1, {
      damping: 15,
      stiffness: 200,
    }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(titleAnimation.value, [0, 1], [50, 0]);
    const scale = interpolate(titleAnimation.value, [0, 1], [0.8, 1]);
    
    return {
      transform: [{ translateY }, { scale }],
      opacity: titleAnimation.value,
    };
  });

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(subtitleAnimation.value, [0, 1], [30, 0]);
    
    return {
      transform: [{ translateY }],
      opacity: subtitleAnimation.value,
    };
  });

  const featuresAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(featuresAnimation.value, [0, 1], [-SCREEN_WIDTH * 0.3, 0]);
    
    return {
      transform: [{ translateX }],
      opacity: featuresAnimation.value,
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(buttonsAnimation.value, [0, 1], [50, 0]);
    
    return {
      transform: [{ translateY }],
      opacity: buttonsAnimation.value,
    };
  });

  const languageSelectorAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(languageSelectorAnimation.value, [0, 1], [-30, 0]);
    const scale = interpolate(languageSelectorAnimation.value, [0, 1], [0.9, 1]);
    
    return {
      transform: [{ translateY }, { scale }],
      opacity: languageSelectorAnimation.value,
    };
  });

  // Button press animations
  const createButtonPressAnimation = () => {
    const scale = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const onPressIn = () => {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
    };

    const onPressOut = () => {
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    return { animatedStyle, onPressIn, onPressOut };
  };

  const primaryButtonAnim = createButtonPressAnimation();
  const secondaryButtonAnim = createButtonPressAnimation();
  const tertiaryButtonAnim = createButtonPressAnimation();

  const features = [
    t('features.catalog'),
    t('features.payments'),
    t('features.delivery'),
    t('features.tracking'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Language Selector */}
      <Animated.View style={[styles.languageSelectorContainer, languageSelectorAnimatedStyle]}>
        <LanguageSelector style={styles.languageSelector} />
      </Animated.View>

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Animated.Text style={[styles.title, titleAnimatedStyle]}>
            {t('welcomeTitle')}
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>
            {t('welcomeSubtitle')}
          </Animated.Text>
        </View>

        {/* Features */}
        <Animated.View style={[styles.features, featuresAnimatedStyle]}>
          {features.map((feature, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.featureText,
                {
                  opacity: featuresAnimation,
                  transform: [
                    {
                      translateX: featuresAnimation.value
                        ? withDelay(
                            index * 100,
                            withSpring(0, { damping: 15, stiffness: 200 })
                          )
                        : -50,
                    },
                  ],
                },
              ]}
            >
              {feature}
            </Animated.Text>
          ))}
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View style={[styles.buttonContainer, buttonsAnimatedStyle]}>
          <Link href="/auth/login" asChild>
            <AnimatedTouchableOpacity
              style={[styles.primaryButton, primaryButtonAnim.animatedStyle]}
              onPressIn={primaryButtonAnim.onPressIn}
              onPressOut={primaryButtonAnim.onPressOut}
              activeOpacity={1}
            >
              <Text style={styles.primaryButtonText}>
                {t('buttons.login')}
              </Text>
            </AnimatedTouchableOpacity>
          </Link>

          <Link href="/auth/register" asChild>
            <AnimatedTouchableOpacity
              style={[styles.secondaryButton, secondaryButtonAnim.animatedStyle]}
              onPressIn={secondaryButtonAnim.onPressIn}
              onPressOut={secondaryButtonAnim.onPressOut}
              activeOpacity={1}
            >
              <Text style={styles.secondaryButtonText}>
                {t('buttons.register')}
              </Text>
            </AnimatedTouchableOpacity>
          </Link>

          <Link href="/browse" asChild>
            <AnimatedTouchableOpacity
              style={[styles.tertiaryButton, tertiaryButtonAnim.animatedStyle]}
              onPressIn={tertiaryButtonAnim.onPressIn}
              onPressOut={tertiaryButtonAnim.onPressOut}
              activeOpacity={1}
            >
              <Text style={styles.tertiaryButtonText}>
                {t('buttons.browseWithoutAccount')}
              </Text>
            </AnimatedTouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  languageSelectorContainer: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
  },
  languageSelector: {
    minWidth: 120,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  features: {
    marginBottom: 60,
    alignItems: 'flex-start',
    width: '100%',
  },
  featureText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    lineHeight: 24,
    paddingLeft: 4,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
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
    letterSpacing: 0.5,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    color: '#999',
    fontSize: 16,
    textDecorationLine: 'underline',
    letterSpacing: 0.3,
  },
});