import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors, spacing } from '../styles/theme';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  
  subtitle: {
    fontSize: 12,
    color: colors.onSurfaceLight,
    marginTop: 4,
  },
  
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: spacing[2],
  },
  
  actionButtonText: {
    fontSize: 20,
  },
});

export const Header = ({
  title,
  subtitle = null,
  onBackPress = null,
  rightAction = null,
  rightActionIcon = '⋯',
  onRightActionPress = null,
  showBackButton = true,
}) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {/* Left - Back Button & Title */}
        <View style={styles.leftContainer}>
          {showBackButton && onBackPress && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackPress}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        
        {/* Right - Action Button */}
        {rightAction && onRightActionPress && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onRightActionPress}
          >
            <Text style={styles.actionButtonText}>{rightActionIcon}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
