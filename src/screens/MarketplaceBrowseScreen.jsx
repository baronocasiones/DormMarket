import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../styles/theme';
import Header from './ui/Header';
import SearchBar from './ui/SearchBar';
import CategoryChip from './ui/CategoryChip';
import Card from './ui/Card';
import BottomTabBar from './ui/BottomTabBar';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = (screenWidth - spacing[8] - spacing[4]) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  headerContent: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
  },

  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },

  locationText: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    fontFamily: typography.fonts.body,
  },

  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.xlarge,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },

  filterButtonText: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: spacing[1],
    fontFamily: typography.fonts.body,
  },

  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },

  categoryContainer: {
    marginBottom: spacing[3],
  },

  categoryLabel: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: '600',
    color: colors.onSurfaceLight,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.body,
  },

  categoryScroll: {
    marginBottom: spacing[2],
  },

  productsContainer: {
    marginTop: spacing[4],
  },

  productsLabel: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: '600',
    color: colors.onSurfaceLight,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.body,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },

  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: spacing[3],
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[12],
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing[3],
  },

  emptyText: {
    fontSize: typography.sizes.bodyLarge,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.body,
  },

  emptySubtext: {
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurfaceLight,
    textAlign: 'center',
    fontFamily: typography.fonts.body,
  },

  bottomTabBar: {
    paddingBottom: spacing[2],
  },
});

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🏪' },
  { id: 'books', label: 'Books', icon: '📚' },
  { id: 'furniture', label: 'Furniture', icon: '🛏️' },
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'clothing', label: 'Clothing', icon: '👕' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
];

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: 'Calculus Textbook',
    price: 45,
    image: 'https://via.placeholder.com/300x180?text=Calculus',
    condition: 'Like New',
    seller: 'John Smith',
    location: 'Dorm A',
    rating: 4.8,
    isVerified: true,
  },
  {
    id: 2,
    title: 'Desk Lamp',
    price: 15,
    image: 'https://via.placeholder.com/300x180?text=Lamp',
    condition: 'Used',
    seller: 'Sarah Jane',
    location: 'Dorm B',
    rating: 4.5,
    isVerified: true,
  },
  {
    id: 3,
    title: 'Wireless Mouse',
    price: 25,
    image: 'https://via.placeholder.com/300x180?text=Mouse',
    condition: 'Like New',
    seller: 'Mike Chen',
    location: 'Dorm C',
    rating: 4.9,
    isVerified: false,
  },
  {
    id: 4,
    title: 'Winter Jacket',
    price: 60,
    image: 'https://via.placeholder.com/300x180?text=Jacket',
    condition: 'Good',
    seller: 'Emma Wilson',
    location: 'Dorm A',
    rating: 4.6,
    isVerified: true,
  },
];

export const MarketplaceBrowseScreen = ({
  onTabPress,
  onProductPress,
  onFilterPress,
  activeTab = 'browse',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title="Browse Items"
        subtitle="Find great deals nearby"
        showBackButton={false}
      />

      {/* Location & Filter Bar */}
      <View style={styles.headerContent}>
        <View style={styles.locationBar}>
          <Text style={styles.locationText}>📍 All Campuses</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={onFilterPress}
            activeOpacity={0.7}
          >
            <Text style={styles.filterButtonText}>⚙️ Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          showBorder={false}
        />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {CATEGORIES.map((category) => (
              <CategoryChip
                key={category.id}
                label={category.label}
                icon={category.icon}
                isActive={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            <>
              <Text style={styles.productsLabel}>
                {filteredProducts.length} Items Available
              </Text>
              <View style={styles.gridContainer}>
                {filteredProducts.map((product) => (
                  <View key={product.id} style={styles.cardWrapper}>
                    <Card
                      title={product.title}
                      price={product.price}
                      image={product.image}
                      condition={product.condition}
                      seller={product.seller}
                      location={product.location}
                      rating={product.rating}
                      isVerified={product.isVerified}
                      onPress={() => onProductPress?.(product.id)}
                    />
                  </View>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>No items found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={onTabPress}
        badgeCount={{ messages: 3 }}
      />
    </SafeAreaView>
  );
};

export default MarketplaceBrowseScreen;
