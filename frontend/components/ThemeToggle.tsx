import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useMegaBodegaI18n } from '../contexts/MegaBodegaI18nContext';

interface ThemeToggleProps {
  compact?: boolean;
  showLabel?: boolean;
}

export function ThemeToggle({ compact = false, showLabel = true }: ThemeToggleProps) {
  const { theme, toggleTheme, colors, isDark } = useTheme();
  const { t } = useMegaBodegaI18n();

  const handleToggle = async () => {
    await toggleTheme();
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compactButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Text style={[styles.compactIcon, { color: colors.text }]}>
          {isDark ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.icon, { color: colors.text }]}>
          {isDark ? '☀️' : '🌙'}
        </Text>
        {showLabel && (
          <Text style={[styles.label, { color: colors.text }]}>
            {isDark ? t('common.light_theme') : t('common.dark_theme')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 20,
  },
  compactIcon: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});