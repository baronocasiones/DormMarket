import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, typography } from './styles/theme';

// Import all UI components
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import SearchBar from './components/ui/SearchBar';
import Avatar from './components/ui/Avatar';
import Badge from './components/ui/Badge';
import CategoryChip from './components/ui/CategoryChip';
import BottomTabBar from './components/ui/BottomTabBar';
import Header from './components/ui/Header';
import TextInputField from './components/ui/TextInputField';
import Rating from './components/ui/Rating';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: typography.sizes.headlineSmall,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing[3],
    fontFamily: typography.fonts.headline,
  },
  componentGroup: {
    marginBottom: spacing[4],
    gap: spacing[2],
  },
});

/**
 * Component Showcase
 * 
 * This file demonstrates all available UI components in the DormMarket app.
 * Copy and paste individual component examples into your screens as needed.
 */
export const ComponentShowcase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('books');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('browse');
  const [rating, setRating] = useState(4);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <Header
        title="Component Showcase"
        subtitle="All UI components in one place"
        showBackButton={false}
      />

      {/* Button Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>
        
        <View style={styles.componentGroup}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.onSurfaceLight }}>Primary</Text>
          <Button title="Primary Button" onPress={() => {}} variant="primary" />
          <Button title="Small" size="small" onPress={() => {}} variant="primary" />
          <Button title="Large" size="large" onPress={() => {}} variant="primary" />
          <Button title="Disabled" disabled onPress={() => {}} variant="primary" />
          <Button title="Loading" loading onPress={() => {}} variant="primary" />
        </View>

        <View style={styles.componentGroup}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.onSurfaceLight }}>Secondary</Text>
          <Button title="Secondary Button" onPress={() => {}} variant="secondary" />
          <Button title="Small" size="small" onPress={() => {}} variant="secondary" />
        </View>

        <View style={styles.componentGroup}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.onSurfaceLight }}>Tertiary</Text>
          <Button title="Tertiary Button" onPress={() => {}} variant="tertiary" />
        </View>

        <View style={styles.componentGroup}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.onSurfaceLight }}>Outline</Text>
          <Button title="Outline Button" onPress={() => {}} variant="outline" />
        </View>
      </View>

      {/* Card Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Cards</Text>
        <Card
          title="Calculus Textbook - Pre-owned"
          price={45}
          image="https://via.placeholder.com/300x180?text=Textbook"
          condition="Like New"
          seller="John Smith"
          location="Dorm A"
          rating={4.8}
          isVerified={true}
          badge="Featured"
          onPress={() => console.log('Card pressed')}
        />
      </View>

      {/* SearchBar Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search Bar</Text>
        <SearchBar
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Avatar Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avatars</Text>
        
        <View style={{ flexDirection: 'row', gap: spacing[3], alignItems: 'center', marginBottom: spacing[3] }}>
          <Avatar name="John Smith" size="small" />
          <Avatar name="Sarah Chen" size="medium" />
          <Avatar name="Mike Lee" size="large" />
          <Avatar name="Emma Wilson" size="xlarge" />
        </View>

        <View style={{ flexDirection: 'row', gap: spacing[3], alignItems: 'center' }}>
          <Avatar name="John" size="medium" showBadge={true} badgeType="online" />
          <Avatar name="Sarah" size="medium" showBadge={true} badgeType="verified" />
        </View>
      </View>

      {/* Badge Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges</Text>
        
        <View style={{ gap: spacing[2] }}>
          <View style={{ flexDirection: 'row', gap: spacing[2], flexWrap: 'wrap' }}>
            <Badge label="Primary" variant="primary" />
            <Badge label="Secondary" variant="secondary" />
            <Badge label="Success" variant="success" />
            <Badge label="Warning" variant="warning" />
            <Badge label="Error" variant="error" />
          </View>

          <View style={{ flexDirection: 'row', gap: spacing[2], flexWrap: 'wrap' }}>
            <Badge label="Verified" variant="success" icon="✓" />
            <Badge label="New" variant="primary" icon="⭐" />
            <Badge label="Sale" variant="warning" icon="🏷️" />
          </View>
        </View>
      </View>

      {/* Category Chips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category Chips</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -spacing[4], paddingHorizontal: spacing[4] }}>
          <CategoryChip label="Books" icon="📚" isActive={selectedCategory === 'books'} onPress={() => setSelectedCategory('books')} />
          <CategoryChip label="Electronics" icon="📱" isActive={selectedCategory === 'electronics'} onPress={() => setSelectedCategory('electronics')} />
          <CategoryChip label="Furniture" icon="🛏️" isActive={selectedCategory === 'furniture'} onPress={() => setSelectedCategory('furniture')} />
          <CategoryChip label="Clothing" icon="👕" isActive={selectedCategory === 'clothing'} onPress={() => setSelectedCategory('clothing')} />
        </ScrollView>
      </View>

      {/* Text Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Input Fields</Text>
        
        <TextInputField
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          icon="📧"
          required
        />

        <TextInputField
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          icon="🔒"
          required
        />

        <TextInputField
          label="Description"
          placeholder="Describe your item..."
          multiline
          numberOfLines={4}
          maxLength={500}
          icon="✏️"
        />
      </View>

      {/* Rating */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rating</Text>
        
        <View style={{ gap: spacing[3] }}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.onSurfaceLight, marginBottom: spacing[2] }}>Display Only</Text>
            <Rating rating={4.5} showLabel={true} label="Your rating" />
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.onSurfaceLight, marginBottom: spacing[2] }}>Interactive</Text>
            <Rating 
              rating={rating} 
              interactive={true}
              onRatingChange={setRating}
              showLabel={true}
              label="Rate this item"
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.onSurfaceLight, marginBottom: spacing[2] }}>Different Sizes</Text>
            <Rating rating={3} size="small" showLabel={false} />
            <Rating rating={4} size="medium" showLabel={false} />
            <Rating rating={5} size="large" showLabel={false} />
          </View>
        </View>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bottom Tab Bar</Text>
        <BottomTabBar
          tabs={[
            { id: 'browse', icon: '🏪', label: 'Browse' },
            { id: 'messages', icon: '💬', label: 'Messages' },
            { id: 'profile', icon: '👤', label: 'Profile' },
          ]}
          activeTab={activeTab}
          onTabPress={setActiveTab}
          badgeCount={{ messages: 3 }}
        />
      </View>

      {/* Spacing Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spacing Scale</Text>
        <View style={{ gap: spacing[2] }}>
          {[1, 2, 3, 4, 5, 6].map((val) => (
            <View key={val} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[2] }}>
              <Text style={{ width: 40, color: colors.onSurfaceLight }}>sp[{val}]</Text>
              <View style={{ height: 20, backgroundColor: colors.primaryContainer, width: spacing[val] * 4 }} />
              <Text style={{ color: colors.onSurfaceLight }}>{spacing[val]}px</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Color Palette */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Palette</Text>
        <View style={{ gap: spacing[3] }}>
          {[
            { name: 'Primary', value: colors.primary },
            { name: 'Secondary', value: colors.secondary },
            { name: 'Tertiary', value: colors.tertiary },
            { name: 'Success', value: colors.success },
            { name: 'Error', value: colors.error },
            { name: 'Warning', value: colors.warning },
          ].map((color) => (
            <View key={color.name} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[3] }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: color.value,
                  borderRadius: 8,
                }}
              />
              <View>
                <Text style={{ fontWeight: '600', color: colors.onSurface }}>{color.name}</Text>
                <Text style={{ color: colors.onSurfaceLight, fontSize: 12 }}>{color.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: spacing[6] }} />
    </ScrollView>
  );
};

export default ComponentShowcase;
