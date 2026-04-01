import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../../styles/theme';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
    ...shadows.subtle,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    minHeight: 56,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  titleContainer: {
    flex: 1,
    marginLeft: spacing[3],
  },

  title: {
    fontSize: typography.sizes.titleLarge,
    fontWeight: '700',
    color: colors.onSurface,
    fontFamily: typography.fonts.headline,
  },

  subtitle: {
    fontSize: typography.sizes.labelMedium,
    color: colors.onSurfaceLight,
    marginTop: spacing[1],
    fontFamily: typography.fonts.body,
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },

  backButton: {
    padding: spacing[2],
    marginLeft: -spacing[2],
  },

  backButtonText: {
    fontSize: 20,
  },

  actionButton: {
    padding: spacing[2],
    marginRight: -spacing[2],
  },

  actionButtonText: {
    fontSize: 20,
  },

  actionIconButton: {
    padding: spacing[2],
    marginLeft: spacing[2],
  },
});

export const Header = ({
  title,
  subtitle = null,
  onBackPress = null,
  showBackButton = false,
  rightActions = [],
  onRightActionPress = null,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.headerContainer, style]}>
      <View style={styles.headerContent}>
        {/* Left - Back Button & Title */}
        <View style={styles.leftContainer}>
          {showBackButton && onBackPress && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>

        {/* Right - Action Buttons */}
        {rightActions.length > 0 && (
          <View style={styles.rightContainer}>
            {rightActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionIconButton}
                onPress={() => onRightActionPress?.(action.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>{action.icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
