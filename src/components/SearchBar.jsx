import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, borderRadius } from '../styles/theme';

export const SearchBar = ({
  placeholder = 'Search items...',
  onChangeText,
  value,
  onSearch,
  style = {},
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceContainerLowest,
      borderRadius: borderRadius.large,
      paddingHorizontal: spacing[3],
      marginVertical: spacing[2],
      borderWidth: 1,
      borderColor: colors.surfaceContainer,
    },
    
    searchInput: {
      flex: 1,
      paddingVertical: spacing[3],
      fontSize: 14,
      color: colors.onSurface,
    },
    
    placeholder: {
      color: colors.onSurfaceLight,
    },
    
    searchIcon: {
      marginRight: spacing[2],
      fontSize: 18,
      color: colors.onSurfaceLight,
    },
  });
  
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceLight}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSearch}
      />
    </View>
  );
};

export default SearchBar;
