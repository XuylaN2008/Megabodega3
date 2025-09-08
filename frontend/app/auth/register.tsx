import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useMegaBodegaI18n } from '../../contexts/MegaBodegaI18nContext';
import { MegaBodegaLanguageSelector } from '../../components/MegaBodegaLanguageSelector';

export default function RegisterScreen() {
  const { t } = useMegaBodegaI18n();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    role: 'customer' as 'customer' | 'courier' | 'staff',
  });

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.full_name) {
      Alert.alert(t('common.error'), 'Por favor complete todos los campos requeridos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert(t('common.error'), 'Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert(t('common.error'), 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const success = await register({
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      phone: formData.phone,
      role: formData.role,
    });

    if (success) {
      Alert.alert(t('common.success'), t('auth.registerSuccess'));
      router.replace('/customer/home');
    } else {
      Alert.alert(t('common.error'), t('auth.registerError'));
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={StyleSheet.absoluteFill}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <MegaBodegaLanguageSelector compact />
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🏪</Text>
            <Text style={styles.title}>{t('auth.createAccount')}</Text>
            <Text style={styles.subtitle}>Únete a MegaBodega</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('auth.fullName')} *</Text>
              <TextInput
                style={styles.input}
                value={formData.full_name}
                onChangeText={(value) => updateFormData('full_name', value)}
                placeholder="Tu nombre completo"
                placeholderTextColor="#999"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('auth.email')} *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="tu@email.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('auth.phone')}</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                placeholder="+593 99 123 4567"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('auth.password')} *</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#999"
                secureTextEntry
                autoComplete="new-password"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('auth.confirmPassword')} *</Text>
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>

            {/* Role Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('auth.selectRole')}</Text>
              <View style={styles.roleContainer}>
                {[
                  { key: 'customer', label: t('auth.customer'), desc: t('auth.customerDesc') },
                  { key: 'courier', label: t('auth.courier'), desc: t('auth.courierDesc') },
                  { key: 'staff', label: t('auth.staff'), desc: t('auth.staffDesc') },
                ].map((role) => (
                  <TouchableOpacity
                    key={role.key}
                    style={[
                      styles.roleOption,
                      formData.role === role.key && styles.roleOptionSelected,
                    ]}
                    onPress={() => updateFormData('role', role.key)}
                  >
                    <Text style={[
                      styles.roleLabel,
                      formData.role === role.key && styles.roleLabelSelected,
                    ]}>
                      {role.label}
                    </Text>
                    <Text style={styles.roleDescription}>{role.desc}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.registerButton, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#007AFF', '#0051D5']}
                style={styles.gradientButton}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? t('common.loading') : t('auth.register')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>{t('auth.alreadyHaveAccount')}</Text>
              <Link href="/auth/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>{t('auth.login')}</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  form: {
    flex: 1,
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
  },
  roleContainer: {
    gap: 12,
  },
  roleOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  roleOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  roleLabelSelected: {
    color: '#007AFF',
  },
  roleDescription: {
    fontSize: 14,
    color: '#999',
  },
  registerButton: {
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  loginText: {
    color: '#999',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});