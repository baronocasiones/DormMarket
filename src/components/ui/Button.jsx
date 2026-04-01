import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xlarge,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.default,
    minHeight: 48,
  },

  buttonPrimarySmall: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    minHeight: 40,
  },

  buttonPrimaryLarge: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    minHeight: 56,
  },

  buttonSecondary: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: borderRadius.xlarge,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  buttonSecondarySmall: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    minHeight: 40,
  },

  buttonSecondaryLarge: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    minHeight: 56,
  },

  buttonTertiary: {
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.xlarge,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  buttonTertiarySmall: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    minHeight: 40,
  },

  buttonOutline: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xlarge,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  buttonOutlineSmall: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    minHeight: 40,
  },

  textPrimary: {
    color: colors.white,
    fontSize: typography.sizes.bodyLarge,
    fontWeight: '600',
    fontFamily: typography.fonts.body,
  },

  textPrimarySmall: {
    fontSize: typography.sizes.bodyMedium,
  },

  textPrimaryLarge: {
    fontSize: typography.sizes.titleLarge,
  },

  textSecondary: {
    color: colors.secondary,
    fontSize: typography.sizes.bodyLarge,
    fontWeight: '600',
    fontFamily: typography.fonts.body,
  },

  textSecondarySmall: {
    fontSize: typography.sizes.bodyMedium,
  },

  textTertiary: {
    color: colors.primary,
    fontSize: typography.sizes.bodyLarge,
    fontWeight: '600',
    fontFamily: typography.fonts.body,
  },

  textTertiarySmall: {
    fontSize: typography.sizes.bodyMedium,
  },

  textOutline: {
    color: colors.primary,
    fontSize: typography.sizes.bodyLarge,
    fontWeight: '600',
    fontFamily: typography.fonts.body,
  },

  textOutlineSmall: {
    fontSize: typography.sizes.bodyMedium,
  },

  disabledButton: {
    opacity: 0.5,
  },

  iconSpacing: {
    marginRight: spacing[2],
  },
});

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  fullWidth = false,
  style = {},
  textStyle = {},
}) => {
  const getButtonStyle = () => {
    const variantStyle = {
      primary: [styles.buttonPrimary],
      secondary: [styles.buttonSecondary],
      tertiary: [styles.buttonTertiary],
      outline: [styles.buttonOutline],
    }[variant] || [styles.buttonPrimary];

    if (size === 'small') {
      variantStyle.push({
        primary: styles.buttonPrimarySmall,
        secondary: styles.buttonSecondarySmall,
        tertiary: styles.buttonTertiarySmall,
        outline: styles.buttonOutlineSmall,
      }[variant]);
    } else if (size === 'large') {
      variantStyle.push({
        primary: styles.buttonPrimaryLarge,
        secondary: [styles.buttonSecondary],
        tertiary: [styles.buttonTertiary],
        outline: [styles.buttonOutline],
      }[variant]);
    }

    return variantStyle;
  };

  const getTextStyle = () => {
    const textVariantStyle = {
      primary: [styles.textPrimary],
      secondary: [styles.textSecondary],
      tertiary: [styles.textTertiary],
      outline: [styles.textOutline],
    }[variant] || [styles.textPrimary];

    if (size === 'small') {
      textVariantStyle.push({
        primary: styles.textPrimarySmall,
        secondary: styles.textSecondarySmall,
        tertiary: styles.textTertiarySmall,
        outline: styles.textOutlineSmall,
      }[variant]);
    } else if (size === 'large') {
      textVariantStyle.push({
        primary: styles.textPrimaryLarge,
        secondary: [styles.textSecondary],
        tertiary: [styles.textTertiary],
        outline: [styles.textOutline],
      }[variant]);
    }

    return textVariantStyle;
  };

  const buttonStyle = [
    ...getButtonStyle(),
    fullWidth && { width: '100%' },
    (disabled || loading) && styles.disabledButton,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.white : colors.primary}
          size="small"
        />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {icon && <View style={styles.iconSpacing}>{icon}</View>}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
