import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMegaBodegaI18n } from '../contexts/MegaBodegaI18nContext';
import { useAuth } from '../contexts/AuthContext';
import { MegaBodegaLanguageSelector } from '../components/MegaBodegaLanguageSelector';

export default function ProfileScreen() {
  const { t, language, setLanguage } = useMegaBodegaI18n();
  const { user, logout, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSaveProfile = async () => {
    const success = await updateProfile(profileData);
    if (success) {
      Alert.alert(t('common.success'), 'Perfil actualizado correctamente');
      setIsEditing(false);
    } else {
      Alert.alert(t('common.error'), 'Error al actualizar el perfil');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('profile.logout'),
      t('auth.logoutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('profile.logout'), 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/');
          }
        },
      ]
    );
  };

  const profileSections = [
    {
      title: t('profile.personalInfo'),
      items: [
        { icon: '👤', label: t('auth.fullName'), value: user?.full_name, key: 'full_name' },
        { icon: '📧', label: t('auth.email'), value: user?.email, key: 'email' },
        { icon: '📱', label: t('auth.phone'), value: user?.phone, key: 'phone' },
        { icon: '👔', label: 'Rol', value: user?.role === 'customer' ? 'Cliente' : user?.role === 'courier' ? 'Repartidor' : 'Personal', readonly: true },
      ]
    },
    {
      title: t('profile.accountSettings'),
      items: [
        { icon: '🌐', label: t('profile.language'), action: 'language' },
        { icon: '🔔', label: t('profile.notifications'), action: 'notifications', toggle: true },
        { icon: '📦', label: t('profile.orderHistory'), action: 'orders' },
        { icon: '❓', label: t('profile.help'), action: 'help' },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t('profile.title')}</Text>
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          disabled={isLoading}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? t('common.save') : t('common.edit')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#007AFF', '#0051D5']}
            style={styles.avatarContainer}
          >
            <Text style={styles.avatarText}>
              {user?.full_name?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </LinearGradient>
          <Text style={styles.userName}>{user?.full_name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>
              {user?.role === 'customer' ? '👤 Cliente' : 
               user?.role === 'courier' ? '🚴 Repartidor' : 
               '👩‍💼 Personal'}
            </Text>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <View style={styles.settingItem}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      {isEditing && item.key && !item.readonly ? (
                        <TextInput
                          style={styles.settingInput}
                          value={profileData[item.key as keyof typeof profileData]}
                          onChangeText={(text) => setProfileData(prev => ({
                            ...prev,
                            [item.key!]: text
                          }))}
                          placeholder={item.label}
                          placeholderTextColor="#666"
                        />
                      ) : item.toggle ? (
                        <Switch
                          value={notifications}
                          onValueChange={setNotifications}
                          trackColor={{ false: '#767577', true: '#007AFF' }}
                          thumbColor={notifications ? '#fff' : '#f4f3f4'}
                        />
                      ) : item.action === 'language' ? (
                        <MegaBodegaLanguageSelector compact />
                      ) : (
                        <Text style={styles.settingValue} numberOfLines={1}>
                          {item.value || 'No especificado'}
                        </Text>
                      )}
                    </View>
                    {item.action && !item.toggle && item.action !== 'language' && (
                      <TouchableOpacity 
                        style={styles.settingAction}
                        onPress={() => {
                          if (item.action === 'orders') {
                            router.push('/customer/orders');
                          } else if (item.action === 'help') {
                            Alert.alert('Ayuda', 'Contacta con soporte: support@megabodega.com');
                          }
                        }}
                      >
                        <Text style={styles.settingArrow}>→</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.settingDivider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la app</Text>
          <View style={styles.sectionCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingIcon}>📱</Text>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>{t('profile.version')}</Text>
                <Text style={styles.settingValue}>MegaBodega v1.0.0</Text>
              </View>
            </View>
            <View style={styles.settingDivider} />
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>📄</Text>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>{t('profile.termsOfService')}</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.settingDivider} />
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔒</Text>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>{t('profile.privacyPolicy')}</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>{t('profile.logout')}</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#999',
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roleBadgeText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: '#999',
  },
  settingInput: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingAction: {
    paddingLeft: 12,
  },
  settingArrow: {
    fontSize: 16,
    color: '#999',
  },
  settingDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 56,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});