import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    marginBottom: spacing[3],
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
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
  
  content: {
    padding: spacing[3],
  },
  
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
    lineHeight: 20,
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
  },
  
  condition: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.secondary,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.small,
  },
  
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing[2],
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
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
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  
  sellerInfo: {
    flex: 1,
  },
  
  sellerName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
  },
  
  location: {
    fontSize: 11,
    color: colors.onSurfaceLight,
    marginTop: 2,
  },
  
  rating: {
    fontSize: 12,
    color: colors.onSurfaceLight,
  },
});

export const ProductCard = ({
  title,
  price,
  image,
  condition = 'Used',
  seller,
  location,
  rating,
  onPress,
  badge = null,
}) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
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
          <Text style={styles.condition}>{condition}</Text>
        </View>
        
        {/* Seller Info */}
        <View style={styles.sellerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(seller)}
            </Text>
          </View>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>{seller}</Text>
            <Text style={styles.location}>{location}</Text>
          </View>
          {rating && (
            <Text style={styles.rating}>⭐ {rating}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
