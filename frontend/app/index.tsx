import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageSelector } from '../components/LanguageSelector';
import { useI18n } from '../contexts/I18nContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { t } = useI18n();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
      <View style={styles.languageSelectorContainer}>
        <LanguageSelector style={styles.languageSelector} />
      </View>

      <View style={[styles.content, isLoaded && styles.contentLoaded]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('welcomeTitle')}
          </Text>
          <Text style={styles.subtitle}>
            {t('welcomeSubtitle')}
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {features.map((feature, index) => (
            <Text
              key={index}
              style={styles.featureText}
            >
              {feature}
            </Text>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/auth/login" asChild>
            <TouchableOpacity 
              style={styles.primaryButton}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>
                {t('buttons.login')}
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/register" asChild>
            <TouchableOpacity 
              style={styles.secondaryButton}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>
                {t('buttons.register')}
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/browse" asChild>
            <TouchableOpacity 
              style={styles.tertiaryButton}
              activeOpacity={0.7}
            >
              <Text style={styles.tertiaryButtonText}>
                {t('buttons.browseWithoutAccount')}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
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
    opacity: 0,
  },
  contentLoaded: {
    opacity: 1,
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