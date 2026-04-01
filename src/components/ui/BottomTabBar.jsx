import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
    paddingBottom: spacing[2],
    paddingTop: spacing[1],
    ...shadows.elevated,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[2],
  },

  tabContent: {
    alignItems: 'center',
  },

  icon: {
    fontSize: 24,
    marginBottom: spacing[1],
  },

  label: {
    fontSize: typography.sizes.labelSmall,
    fontWeight: '600',
    marginTop: 2,
    fontFamily: typography.fonts.body,
  },

  labelActive: {
    color: colors.primary,
  },

  labelInactive: {
    color: colors.onSurfaceLight,
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: '25%',
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: colors.white,
    fontSize: typography.sizes.labelSmall,
    fontWeight: '700',
    fontFamily: typography.fonts.body,
  },
});

export const BottomTabBar = ({
  tabs = [
    { id: 'browse', icon: '🏪', label: 'Browse' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ],
  activeTab = 'browse',
  onTabPress,
  badgeCount = {},
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabPress?.(tab.id)}
          activeOpacity={0.7}
        >
          <View style={styles.tabContent}>
            <Text style={styles.icon}>{tab.icon}</Text>
            {badgeCount[tab.id] > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {badgeCount[tab.id] > 9 ? '9+' : badgeCount[tab.id]}
                </Text>
              </View>
            )}
            <Text
              style={[
                styles.label,
                activeTab === tab.id ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {tab.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabBar;
