import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  chip: {
    borderRadius: borderRadius.xlarge,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    marginRight: spacing[2],
    marginBottom: spacing[2],
    justifyContent: 'center',
    alignItems: 'center',
  },

  chipInactive: {
    backgroundColor: colors.surfaceContainer,
  },

  chipActive: {
    backgroundColor: colors.primary,
  },

  textInactive: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  textActive: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.white,
    fontFamily: typography.fonts.body,
  },
});

export const CategoryChip = ({
  label,
  isActive = false,
  onPress,
  icon = null,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isActive ? styles.chipActive : styles.chipInactive,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={isActive ? styles.textActive : styles.textInactive}>
        {icon ? `${icon} ${label}` : label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryChip;
