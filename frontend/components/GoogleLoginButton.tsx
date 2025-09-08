import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

interface GoogleLoginButtonProps {
  onPress?: () => void;
  style?: any;
  disabled?: boolean;
  text?: string;
}

export function GoogleLoginButton({ 
  onPress, 
  style, 
  disabled = false,
  text = "Continuar con Google"
}: GoogleLoginButtonProps) {
  
  const handleGoogleLogin = async () => {
    try {
      // Get current app URL for redirect
      const redirectUrl = Linking.createURL('/profile');
      
      // Create Google login URL with redirect
      const googleLoginUrl = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
      
      // Open Google login page
      const supported = await Linking.canOpenURL(googleLoginUrl);
      
      if (supported) {
        await Linking.openURL(googleLoginUrl);
      } else {
        console.error('Cannot open Google login URL');
      }
      
      if (onPress) {
        onPress();
      }
    } catch (error) {
      console.error('Error opening Google login:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.buttonDisabled]}
      onPress={handleGoogleLogin}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="logo-google" size={20} color="#4285F4" />
        </View>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});