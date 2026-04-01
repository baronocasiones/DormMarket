import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  starsContainer: {
    flexDirection: 'row',
    marginRight: spacing[2],
  },

  star: {
    fontSize: 24,
    marginRight: spacing[1],
  },

  label: {
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  ratingText: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    fontFamily: typography.fonts.body,
  },
});

export const Rating = ({
  rating = 0,
  maxRating = 5,
  size = 'medium',
  interactive = false,
  onRatingChange,
  showLabel = true,
  label = 'Rating',
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarPress = (star) => {
    if (interactive) {
      onRatingChange?.(star);
      setHoverRating(0);
    }
  };

  const handleStarHover = (star) => {
    if (interactive) {
      setHoverRating(star);
    }
  };

  const getStarSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 32;
      case 'medium':
      default:
        return 24;
    }
  };

  const currentRating = hoverRating || rating;

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {Array.from({ length: maxRating }).map((_, index) => {
          const starIndex = index + 1;
          const isFilled = starIndex <= currentRating;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleStarPress(starIndex)}
              onMouseEnter={() => handleStarHover(starIndex)}
              onMouseLeave={() => handleStarHover(0)}
              disabled={!interactive}
              activeOpacity={interactive ? 0.7 : 1}
            >
              <Text
                style={[
                  styles.star,
                  {
                    fontSize: getStarSize(),
                    color: isFilled ? '#FFB800' : colors.surfaceContainer,
                  },
                ]}
              >
                ★
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showLabel && (
        <>
          <Text style={styles.label}>{label}</Text>
          {rating > 0 && (
            <Text style={styles.ratingText}> {rating.toFixed(1)}</Text>
          )}
        </>
      )}
    </View>
  );
};

export default Rating;
