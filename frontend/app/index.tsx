import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SimpleLanguageSelector } from '../components/SimpleLanguageSelector';
import { useSimpleI18n } from '../contexts/SimpleI18nContext';

export default function WelcomeScreen() {
  const { t } = useSimpleI18n();

  const features = [
    t('features.catalog'),
    t('features.payments'),
    t('features.delivery'),
    t('features.tracking'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Language Selector */}
        <View style={styles.languageSelectorContainer}>
          <SimpleLanguageSelector />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('welcomeTitle')}</Text>
          <Text style={styles.subtitle}>{t('welcomeSubtitle')}</Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {features.map((feature, index) => (
            <Text key={index} style={styles.featureText}>
              {feature}
            </Text>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/auth/login" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                {t('buttons.login')}
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/register" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>
                {t('buttons.register')}
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/browse" asChild>
            <TouchableOpacity style={styles.tertiaryButton}>
              <Text style={styles.tertiaryButtonText}>
                {t('buttons.browseWithoutAccount')}
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/products" asChild>
            <TouchableOpacity style={styles.catalogButton}>
              <Text style={styles.catalogButtonText}>
                🛒 Каталог товаров
              </Text>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  languageSelectorContainer: {
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    marginBottom: 50,
    alignItems: 'flex-start',
    width: '100%',
  },
  featureText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 16,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
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
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    color: '#999',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  catalogButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  catalogButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});