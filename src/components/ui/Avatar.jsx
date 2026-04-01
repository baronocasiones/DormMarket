import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, borderRadius } from '../../styles/theme';

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
  },

  avatarMedium: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
  },

  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
  },

  avatarXLarge: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.full,
  },

  initialsContainer: {
    backgroundColor: colors.primaryContainer,
  },

  initialsText: {
    color: colors.primary,
    fontWeight: '600',
  },

  initialsSmall: {
    fontSize: 13,
  },

  initialsMedium: {
    fontSize: 16,
  },

  initialsLarge: {
    fontSize: 22,
  },

  initialsXLarge: {
    fontSize: 32,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.full,
  },

  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold',
  },

  verified: {
    backgroundColor: colors.primary,
  },
});

export const Avatar = ({
  name = '',
  image = null,
  size = 'medium',
  variant = 'initials',
  showBadge = false,
  badgeType = 'online',
  onPress,
}) => {
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.avatarSmall;
      case 'large':
        return styles.avatarLarge;
      case 'xlarge':
        return styles.avatarXLarge;
      case 'medium':
      default:
        return styles.avatarMedium;
    }
  };

  const getInitialsFontSize = () => {
    switch (size) {
      case 'small':
        return styles.initialsSmall;
      case 'large':
        return styles.initialsLarge;
      case 'xlarge':
        return styles.initialsXLarge;
      case 'medium':
      default:
        return styles.initialsMedium;
    }
  };

  const containerStyle = [
    styles.avatarContainer,
    getSizeStyle(),
    variant === 'initials' && styles.initialsContainer,
  ];

  return (
    <View style={containerStyle} onTouchEnd={onPress}>
      {image && variant === 'image' ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : (
        <Text
          style={[
            styles.initialsText,
            getInitialsFontSize(),
          ]}
        >
          {getInitials(name)}
        </Text>
      )}
      {showBadge && (
        <View
          style={[
            styles.badge,
            badgeType === 'verified' && styles.verified,
          ]}
        >
          {badgeType === 'online' ? (
            <Text style={styles.badgeText}>●</Text>
          ) : (
            <Text style={styles.badgeText}>✓</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Avatar;
