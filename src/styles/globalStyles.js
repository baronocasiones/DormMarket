import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  contentContainer: {
    padding: spacing[4],
  },
  
  // Typography
  displayLarge: {
    fontSize: typography.sizes.displayLarge,
    fontWeight: '700',
    lineHeight: typography.lineHeights.displayLarge,
    color: colors.onSurface,
  },
  
  headlineLarge: {
    fontSize: typography.sizes.headlineLarge,
    fontWeight: '700',
    lineHeight: typography.lineHeights.headlineLarge,
    color: colors.onSurface,
  },
  
  headlineMedium: {
    fontSize: typography.sizes.headlineMedium,
    fontWeight: '600',
    lineHeight: typography.lineHeights.headlineMedium,
    color: colors.onSurface,
  },
  
  headlineSmall: {
    fontSize: typography.sizes.headlineSmall,
    fontWeight: '600',
    lineHeight: typography.lineHeights.headlineSmall,
    color: colors.onSurface,
  },
  
  titleLarge: {
    fontSize: typography.sizes.titleLarge,
    fontWeight: '600',
    lineHeight: typography.lineHeights.titleLarge,
    color: colors.onSurface,
  },
  
  titleMedium: {
    fontSize: typography.sizes.titleMedium,
    fontWeight: '600',
    lineHeight: typography.lineHeights.titleMedium,
    color: colors.onSurface,
  },
  
  bodyMedium: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '400',
    lineHeight: typography.lineHeights.bodyMedium,
    color: colors.onSurface,
  },
  
  bodySmall: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: '400',
    lineHeight: typography.lineHeights.bodySmall,
    color: colors.onSurfaceLight,
  },
  
  labelSmall: {
    fontSize: typography.sizes.labelSmall,
    fontWeight: '500',
    lineHeight: typography.lineHeights.labelSmall,
    color: colors.onSurfaceLight,
  },
  
  // Spacing utilities
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Shadows
  shadowSubtle: shadows.subtle,
  shadowDefault: shadows.default,
  shadowElevated: shadows.elevated,
  
  // Cards
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    padding: spacing[4],
    ...shadows.default,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.surfaceContainer,
    marginVertical: spacing[4],
  },
});

export default globalStyles;
