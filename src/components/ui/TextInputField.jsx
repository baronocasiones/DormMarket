import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },

  label: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.body,
  },

  required: {
    color: colors.error,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },

  inputWrapperFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },

  inputWrapperError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },

  input: {
    flex: 1,
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurface,
    paddingVertical: spacing[2],
    fontFamily: typography.fonts.body,
    fontWeight: '400',
  },

  inputMultiline: {
    minHeight: 100,
    paddingTop: spacing[2],
    textAlignVertical: 'top',
  },

  icon: {
    marginRight: spacing[2],
    fontSize: 18,
  },

  clearButton: {
    padding: spacing[1],
    marginLeft: spacing[2],
  },

  clearIcon: {
    fontSize: 18,
    color: colors.onSurfaceLight,
  },

  visibilityButton: {
    padding: spacing[1],
    marginLeft: spacing[2],
  },

  visibilityIcon: {
    fontSize: 18,
    color: colors.onSurfaceLight,
  },

  helperText: {
    fontSize: typography.sizes.labelSmall,
    color: colors.onSurfaceLight,
    marginTop: spacing[1],
    fontFamily: typography.fonts.body,
  },

  helperTextError: {
    color: colors.error,
  },

  characterCount: {
    fontSize: typography.sizes.labelSmall,
    color: colors.onSurfaceLight,
    marginTop: spacing[1],
    textAlign: 'right',
    fontFamily: typography.fonts.body,
  },
});

export const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  required = false,
  disabled = false,
  icon = null,
  showClearButton = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  keyboardType = 'default',
  onFocus,
  onBlur,
  onSubmitEditing,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleClear = () => {
    onChangeText?.('');
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}

        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceLight}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          editable={!disabled}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.visibilityButton}
            onPress={() => setIsSecure(!isSecure)}
          >
            <Text style={styles.visibilityIcon}>
              {isSecure ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        )}

        {showClearButton && value?.length > 0 && !secureTextEntry && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
          >
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.helperText, styles.helperTextError]}>
          ⚠️ {error}
        </Text>
      )}

      {helperText && !error && (
        <Text style={styles.helperText}>
          {helperText}
        </Text>
      )}

      {maxLength && (
        <Text style={styles.characterCount}>
          {value?.length || 0} / {maxLength}
        </Text>
      )}
    </View>
  );
};

export default TextInputField;
