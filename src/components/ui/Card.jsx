import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    ...shadows.default,
  },

  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: colors.surfaceContainer,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  badgeContainer: {
    position: 'absolute',
    top: spacing[2],
    right: spacing[2],
    backgroundColor: colors.primary,
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },

  badgeText: {
    fontSize: typography.sizes.labelSmall,
    fontWeight: '600',
    color: colors.white,
    fontFamily: typography.fonts.body,
  },

  content: {
    padding: spacing[3],
  },

  title: {
    fontSize: typography.sizes.titleMedium,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
    lineHeight: 22,
    fontFamily: typography.fonts.body,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: typography.fonts.headline,
  },

  conditionBadge: {
    fontSize: typography.sizes.labelMedium,
    fontWeight: '500',
    color: colors.secondary,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.small,
    overflow: 'hidden',
    fontFamily: typography.fonts.body,
  },

  divider: {
    height: 1,
    backgroundColor: colors.surfaceContainer,
    marginVertical: spacing[2],
  },

  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryContainer,
    marginRight: spacing[2],
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: typography.fonts.body,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.full,
  },

  sellerInfo: {
    flex: 1,
  },

  sellerName: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    fontFamily: typography.fonts.body,
  },

  sellerMeta: {
    fontSize: typography.sizes.labelSmall,
    color: colors.onSurfaceLight,
    marginTop: 2,
    fontFamily: typography.fonts.body,
  },

  rating: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  verifiedBadge: {
    marginLeft: spacing[1],
    color: colors.success,
  },
});

export const Card = ({
  title,
  price,
  image,
  condition = 'Used',
  seller,
  sellerAvatar,
  location,
  rating,
  isVerified = false,
  onPress,
  badge = null,
}) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image || 'https://via.placeholder.com/300x180?text=Product',
          }}
          style={styles.image}
          defaultSource={require('../../assets/placeholder.png')}
        />
        {badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.conditionBadge}>{condition}</Text>
        </View>

        <View style={styles.divider} />

        {/* Seller Info */}
        <View style={styles.sellerRow}>
          {sellerAvatar ? (
            <Image
              source={{ uri: sellerAvatar }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(seller)}
              </Text>
            </View>
          )}
          <View style={styles.sellerInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.sellerName}>{seller}</Text>
              {isVerified && (
                <Text style={styles.verifiedBadge}>✓</Text>
              )}
            </View>
            {location && (
              <Text style={styles.sellerMeta}>{location}</Text>
            )}
          </View>
          {rating && (
            <Text style={styles.rating}>⭐ {rating}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
