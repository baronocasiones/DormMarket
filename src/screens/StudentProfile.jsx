import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../styles/theme';
import Header from '../components/ui/Header';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import BottomTabBar from '../components/ui/BottomTabBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingBottom: spacing[8],
  },

  profileHeader: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
    alignItems: 'center',
  },

  avatarContainer: {
    marginBottom: spacing[3],
    position: 'relative',
  },

  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.success,
    borderRadius: borderRadius.full,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },

  verifiedIcon: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  profileName: {
    fontSize: typography.sizes.headlineSmall,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing[1],
    fontFamily: typography.fonts.headline,
  },

  profileMeta: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    marginBottom: spacing[3],
    fontFamily: typography.fonts.body,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
    gap: spacing[2],
  },

  statsContainer: {
    flexDirection: 'row',
    gap: spacing[4],
    marginBottom: spacing[4],
  },

  stat: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontSize: typography.sizes.headlineSmall,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: typography.fonts.headline,
  },

  statLabel: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    marginTop: spacing[1],
    fontFamily: typography.fonts.body,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: spacing[2],
    marginBottom: spacing[3],
  },

  actionButton: {
    flex: 1,
  },

  section: {
    paddingHorizontal: spacing[4],
    marginVertical: spacing[4],
  },

  sectionTitle: {
    fontSize: typography.sizes.titleMedium,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing[3],
    fontFamily: typography.fonts.headline,
  },

  aboutText: {
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurface,
    lineHeight: 22,
    fontFamily: typography.fonts.body,
  },

  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginBottom: spacing[4],
  },

  reviewsContainer: {
    gap: spacing[3],
  },

  reviewItem: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
    gap: spacing[2],
  },

  reviewerName: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    flex: 1,
    fontFamily: typography.fonts.body,
  },

  reviewDate: {
    fontSize: typography.sizes.labelSmall,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  reviewText: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurface,
    lineHeight: 20,
    fontFamily: typography.fonts.body,
  },

  listingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },

  listingThumbnail: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: borderRadius.large,
    backgroundColor: colors.surfaceContainer,
    overflow: 'hidden',
  },

  listingImage: {
    width: '100%',
    height: '100%',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing[6],
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing[2],
  },

  emptyText: {
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },
});

const SAMPLE_REVIEWS = [
  {
    id: 1,
    reviewer: 'Alex Johnson',
    rating: 5,
    text: 'Great seller! Item arrived quickly and in perfect condition.',
    date: '2 weeks ago',
  },
  {
    id: 2,
    reviewer: 'Jordan Lee',
    rating: 4,
    text: 'Good communication, would buy again.',
    date: '1 month ago',
  },
];

export const StudentProfileScreen = ({
  profileName = 'Sarah Chen',
  isVerified = true,
  campus = 'Main Campus',
  rating = 4.8,
  reviewCount = 24,
  itemsSold = 12,
  responseTime = '< 2 hours',
  about = 'Junior majoring in Computer Science. I sell gently used textbooks and tech accessories.',
  onEditProfile,
  onContactClick,
  onViewMore,
  onTabPress,
  activeTab = 'profile',
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile"
        showBackButton={false}
        rightActions={[{ id: 'edit', icon: '✎' }]}
        onRightActionPress={(id) => {
          if (id === 'edit') onEditProfile?.();
        }}
      />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Avatar
              name={profileName}
              size="xlarge"
              variant="initials"
            />
            {isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>

          <Text style={styles.profileName}>{profileName}</Text>
          <Text style={styles.profileMeta}>📍 {campus}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Rating
              rating={rating}
              size="medium"
              showLabel={false}
            />
            <Text style={styles.profileMeta}>
              {rating} • {reviewCount} reviews
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{itemsSold}</Text>
              <Text style={styles.statLabel}>Items Sold</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{responseTime}</Text>
              <Text style={styles.statLabel}>Response Time</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{reviewCount}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <View style={styles.actionButton}>
              <Button
                title="Message"
                onPress={onContactClick}
                variant="primary"
              />
            </View>
            <View style={styles.actionButton}>
              <Button
                title="Follow"
                onPress={() => {}}
                variant="tertiary"
              />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{about}</Text>
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credentials</Text>
          <View style={styles.badgeContainer}>
            <Badge label="Fast Shipping" variant="success" icon="⚡" />
            <Badge label="Great Deals" variant="primary" icon="💰" />
            <Badge label="Verified" variant="primary" icon="✓" />
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] }}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            <TouchableOpacity onPress={onViewMore}>
              <Text style={{ color: colors.primary, fontWeight: '600', fontSize: typography.sizes.bodySmall, fontFamily: typography.fonts.body }}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewsContainer}>
            {SAMPLE_REVIEWS.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View>
                    <Text style={styles.reviewerName}>{review.reviewer}</Text>
                    <Rating rating={review.rating} size="small" showLabel={false} />
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Active Listings */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] }}>
            <Text style={styles.sectionTitle}>Active Listings</Text>
            <TouchableOpacity onPress={onViewMore}>
              <Text style={{ color: colors.primary, fontWeight: '600', fontSize: typography.sizes.bodySmall, fontFamily: typography.fonts.body }}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listingsGrid}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.listingThumbnail} activeOpacity={0.7}>
                <Image
                  source={{ uri: `https://via.placeholder.com/300x300?text=Item+${item}` }}
                  style={styles.listingImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={onTabPress}
        badgeCount={{ messages: 2 }}
      />
    </SafeAreaView>
  );
};

export default StudentProfileScreen;
