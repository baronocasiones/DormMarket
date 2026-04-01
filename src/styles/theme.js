// DormMarket Design System Theme
// Primary color: #2563EB (blue)
// Background: #f8f5ff (light purple)
// Font: Plus Jakarta Sans (headlines), Manrope (body)
// Roundness: 8px borders
export const colors = {
  // Primary (Blue)
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  primaryContainer: '#DBEAFE',
  
  // Secondary (Purple)
  secondary: '#6366F1',
  secondaryContainer: '#E0E7FF',
  
  // Tertiary (Pink)
  tertiary: '#EC4899',
  tertiaryContainer: '#FCE7F3',
  
  // Surface & Background
  surface: '#f8f5ff',
  surfaceContainer: '#E5E1FF',
  surfaceContainerLow: '#F3F0FF',
  surfaceContainerLowest: '#FFFFFF',
  background: '#f8f5ff',
  
  // Text
  onSurface: '#1F2937',
  onSurfaceLight: '#6B7280',
  onSurfaceLighter: '#9CA3AF',
  
  // Status
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Additional
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Glassmorphism tint
  glassLight: 'rgba(255, 255, 255, 0.8)',
  glassDark: 'rgba(37, 99, 235, 0.05)',
};

export const typography = {
  fonts: {
    headline: '-apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif',
    headlineBold: '-apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif',
    body: '-apple-system, BlinkMacSystemFont, Manrope, sans-serif',
    bodyBold: '-apple-system, BlinkMacSystemFont, Manrope, sans-serif',
    label: '-apple-system, BlinkMacSystemFont, Manrope, sans-serif',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    displayLarge: 56,
    headlineLarge: 32,
    headlineMedium: 28,
    headlineSmall: 24,
    titleLarge: 22,
    titleMedium: 16,
    titleSmall: 14,
    bodyLarge: 16,
    bodyMedium: 14,
    bodySmall: 12,
    labelLarge: 14,
    labelMedium: 12,
    labelSmall: 11,
  },
  lineHeights: {
    displayLarge: 64,
    headlineLarge: 40,
    headlineMedium: 36,
    headlineSmall: 32,
    titleLarge: 28,
    titleMedium: 24,
    titleSmall: 20,
    bodyLarge: 24,
    bodyMedium: 20,
    bodySmall: 16,
    labelLarge: 20,
    labelMedium: 16,
    labelSmall: 16,
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  16: 64,
};

export const borderRadius = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 24,
  full: 9999,
};

export const shadows = {
  subtle: {
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    boxShadow: '0 1px 2px 0 rgba(31, 41, 55, 0.05)',
  },
  default: {
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    boxShadow: '0 4px 12px 0 rgba(31, 41, 55, 0.08)',
  },
  elevated: {
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    boxShadow: '0 12px 24px 0 rgba(31, 41, 55, 0.12)',
  },
  glassmorphic: {
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    boxShadow: '0 8px 32px 0 rgba(31, 41, 55, 0.06)',
    backdrop: 'blur(10px)',
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;
