import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useMegaBodegaI18n } from '../contexts/MegaBodegaI18nContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface LanguageSelectorProps {
  compact?: boolean;
  style?: any;
}

export function MegaBodegaLanguageSelector({ compact = false, style }: LanguageSelectorProps) {
  const { language, setLanguage, languages, t } = useMegaBodegaI18n();
  const [isVisible, setIsVisible] = useState(false);
  
  const modalAnimation = useSharedValue(0);
  const backdropAnimation = useSharedValue(0);

  const openModal = () => {
    setIsVisible(true);
    modalAnimation.value = withSpring(1, {
      damping: 20,
      stiffness: 200,
    });
    backdropAnimation.value = withTiming(1, { duration: 300 });
  };

  const closeModal = () => {
    modalAnimation.value = withSpring(0, {
      damping: 20,
      stiffness: 200,
    });
    backdropAnimation.value = withTiming(0, { duration: 200 });
    
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleLanguageSelect = async (langCode: string) => {
    await setLanguage(langCode as Language);
    closeModal();
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  const modalAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      modalAnimation.value,
      [0, 1],
      [SCREEN_HEIGHT, 0]
    );
    
    const scale = interpolate(
      modalAnimation.value,
      [0, 1],
      [0.9, 1]
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity: modalAnimation.value,
    };
  });

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropAnimation.value,
    };
  });

  if (compact) {
    return (
      <>
        <TouchableOpacity
          style={[styles.compactSelector, style]}
          onPress={openModal}
          activeOpacity={0.8}
        >
          <Text style={styles.compactFlag}>{currentLanguage?.flag}</Text>
          <Ionicons name="chevron-down" size={16} color="#007AFF" />
        </TouchableOpacity>

        <Modal
          visible={isVisible}
          transparent
          animationType="none"
          statusBarTranslucent
        >
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
              <TouchableOpacity
                style={styles.backdropTouchable}
                onPress={closeModal}
              />
            </Animated.View>

            <Animated.View style={[styles.modalContent, modalAnimatedStyle]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('languages.changeLanguage')}</Text>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#999" />
                </TouchableOpacity>
              </View>

              <View style={styles.languageList}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.languageOption,
                      language === lang.code && styles.languageOptionSelected,
                    ]}
                    onPress={() => handleLanguageSelect(lang.code)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.languageFlag}>{lang.flag}</Text>
                    <Text
                      style={[
                        styles.languageOptionText,
                        language === lang.code && styles.languageOptionTextSelected,
                      ]}
                    >
                      {lang.nativeName}
                    </Text>
                    {language === lang.code && (
                      <Ionicons name="checkmark" size={20} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </View>
        </Modal>
      </>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.selector, style]}
        onPress={openModal}
        activeOpacity={0.8}
      >
        <Text style={styles.flag}>{currentLanguage?.flag}</Text>
        <Text style={styles.languageName}>{currentLanguage?.nativeName}</Text>
        <Ionicons name="chevron-down" size={16} color="#999" />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
            <TouchableOpacity
              style={styles.backdropTouchable}
              onPress={closeModal}
            />
          </Animated.View>

          <Animated.View style={[styles.modalContent, modalAnimatedStyle]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('languages.changeLanguage')}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={styles.languageList}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    language === lang.code && styles.languageOptionSelected,
                  ]}
                  onPress={() => handleLanguageSelect(lang.code)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.languageFlag}>{lang.flag}</Text>
                  <Text
                    style={[
                      styles.languageOptionText,
                      language === lang.code && styles.languageOptionTextSelected,
                    ]}
                  >
                    {lang.nativeName}
                  </Text>
                  {language === lang.code && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  compactSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  compactFlag: {
    fontSize: 18,
    marginRight: 6,
  },
  languageName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    padding: 16,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
  },
  languageOptionSelected: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageOptionText: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
  },
  languageOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
});