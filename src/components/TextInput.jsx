import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
  },
  
  input: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    fontSize: 14,
    color: colors.onSurface,
    minHeight: 44,
  },
  
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: spacing[3],
  },
  
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: spacing[1],
  },
  
  helperText: {
    fontSize: 12,
    color: colors.onSurfaceLight,
    marginTop: spacing[1],
  },
});

export const TextInput_Custom = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  editable = true,
  error = null,
  helperText = null,
  style = {},
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceLight}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        editable={editable}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default TextInput_Custom;
