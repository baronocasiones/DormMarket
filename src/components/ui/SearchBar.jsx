import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xlarge,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    marginHorizontal: spacing[4],
    marginVertical: spacing[2],
  },

  containerWithBorder: {
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
  },

  containerFocused: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  iconLeft: {
    fontSize: 18,
    marginRight: spacing[2],
    color: colors.onSurfaceLight,
  },

  input: {
    flex: 1,
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurface,
    paddingVertical: spacing[2],
    fontFamily: typography.fonts.body,
    fontWeight: '400',
  },

  placeholder: {
    color: colors.onSurfaceLight,
  },

  clearButton: {
    padding: spacing[2],
    marginRight: -spacing[2],
  },

  clearIcon: {
    fontSize: 18,
    color: colors.onSurfaceLight,
  },
});

export const SearchBar = ({
  placeholder = 'Search items...',
  onChangeText,
  onSubmit,
  value = '',
  icon = '🔍',
  showClearButton = true,
  showBorder = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText?.('');
  };

  return (
    <View
      style={[
        styles.container,
        showBorder && styles.containerWithBorder,
        isFocused && styles.containerFocused,
      ]}
    >
      <Text style={styles.iconLeft}>{icon}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceLight}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {showClearButton && value?.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
        >
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
