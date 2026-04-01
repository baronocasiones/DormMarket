import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    alignSelf: 'flex-start',
  },

  badgePrimary: {
    backgroundColor: colors.primaryContainer,
  },

  badgeSecondary: {
    backgroundColor: colors.secondaryContainer,
  },

  badgeSuccess: {
    backgroundColor: '#D1FAE5',
  },

  badgeWarning: {
    backgroundColor: '#FEF3C7',
  },

  badgeError: {
    backgroundColor: '#FEE2E2',
  },

  text: {
    fontSize: typography.sizes.labelSmall,
    fontWeight: '600',
    fontFamily: typography.fonts.body,
  },

  textPrimary: {
    color: colors.primary,
  },

  textSecondary: {
    color: colors.secondary,
  },

  textSuccess: {
    color: colors.success,
  },

  textWarning: {
    color: colors.warning,
  },

  textError: {
    color: colors.error,
  },

  icon: {
    marginRight: spacing[1],
    fontSize: 12,
  },
});

export const Badge = ({
  label,
  variant = 'primary',
  icon = null,
  style,
  textStyle,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.badgeSecondary;
      case 'success':
        return styles.badgeSuccess;
      case 'warning':
        return styles.badgeWarning;
      case 'error':
        return styles.badgeError;
      case 'primary':
      default:
        return styles.badgePrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'success':
        return styles.textSuccess;
      case 'warning':
        return styles.textWarning;
      case 'error':
        return styles.textError;
      case 'primary':
      default:
        return styles.textPrimary;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.text, getTextStyle(), textStyle]}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;
