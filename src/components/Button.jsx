import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  style = {},
  textStyle = {},
}) => {
  const styles = StyleSheet.create({
    buttonPrimary: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.xlarge,
      paddingVertical: size === 'small' ? spacing[2] : spacing[3],
      paddingHorizontal: size === 'small' ? spacing[3] : spacing[6],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.default,
      opacity: disabled ? 0.6 : 1,
    },
    
    buttonSecondary: {
      backgroundColor: colors.secondaryContainer,
      borderRadius: borderRadius.xlarge,
      paddingVertical: size === 'small' ? spacing[2] : spacing[3],
      paddingHorizontal: size === 'small' ? spacing[3] : spacing[6],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
    },
    
    buttonOutline: {
      backgroundColor: colors.surfaceContainerLowest,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: borderRadius.xlarge,
      paddingVertical: size === 'small' ? spacing[2] : spacing[3],
      paddingHorizontal: size === 'small' ? spacing[3] : spacing[6],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
    },
    
    textPrimary: {
      color: colors.white,
      fontSize: size === 'small' ? 14 : 16,
      fontWeight: '600',
      marginLeft: icon ? spacing[2] : 0,
    },
    
    textSecondary: {
      color: colors.secondary,
      fontSize: size === 'small' ? 14 : 16,
      fontWeight: '600',
      marginLeft: icon ? spacing[2] : 0,
    },
    
    textOutline: {
      color: colors.primary,
      fontSize: size === 'small' ? 14 : 16,
      fontWeight: '600',
      marginLeft: icon ? spacing[2] : 0,
    },
  });
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'outline':
        return styles.buttonOutline;
      default:
        return styles.buttonPrimary;
    }
  };
  
  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'outline':
        return styles.textOutline;
      default:
        return styles.textPrimary;
    }
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
