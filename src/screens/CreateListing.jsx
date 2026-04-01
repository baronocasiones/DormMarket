import React, { useState } from 'react';
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
import TextInputField from '../components/ui/TextInputField';
import Button from '../components/ui/Button';
import CategoryChip from '../components/ui/CategoryChip';
import BottomSheet from '../components/ui/BottomSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    paddingBottom: spacing[6],
  },

  section: {
    marginBottom: spacing[6],
  },

  sectionTitle: {
    fontSize: typography.sizes.titleLarge,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing[3],
    fontFamily: typography.fonts.headline,
  },

  sectionSubtitle: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.body,
  },

  imageUploadArea: {
    borderWidth: 2,
    borderColor: colors.surfaceContainer,
    borderRadius: borderRadius.large,
    borderStyle: 'dashed',
    padding: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLow,
    minHeight: 150,
    marginBottom: spacing[3],
  },

  uploadIcon: {
    fontSize: 48,
    marginBottom: spacing[2],
  },

  uploadText: {
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[1],
    fontFamily: typography.fonts.body,
  },

  uploadSubtext: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    textAlign: 'center',
    fontFamily: typography.fonts.body,
  },

  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.large,
    marginRight: spacing[2],
    marginBottom: spacing[2],
    position: 'relative',
    overflow: 'hidden',
  },

  removeButton: {
    position: 'absolute',
    top: spacing[1],
    right: spacing[1],
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeIcon: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

  categoryContainer: {
    marginBottom: spacing[3],
  },

  categoryScroll: {
    marginTop: spacing[2],
  },

  priceInputContainer: {
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'flex-end',
  },

  currencySymbol: {
    fontSize: typography.sizes.bodyLarge,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
    paddingBottom: spacing[2],
  },

  conditionContainer: {
    flexDirection: 'row',
    gap: spacing[2],
  },

  conditionButton: {
    flex: 1,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: borderRadius.large,
    borderWidth: 1.5,
    borderColor: colors.surfaceContainer,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },

  conditionButtonActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },

  conditionButtonText: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: '600',
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  conditionButtonTextActive: {
    color: colors.primary,
  },

  previewContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    padding: spacing[3],
    marginTop: spacing[3],
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
  },

  previewLabel: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: '600',
    color: colors.onSurfaceLight,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.body,
  },

  previewContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    padding: spacing[3],
  },

  previewTitle: {
    fontSize: typography.sizes.titleMedium,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.body,
  },

  previewPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing[1],
    fontFamily: typography.fonts.headline,
  },

  previewMeta: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  buttonContainer: {
    gap: spacing[2],
    paddingTop: spacing[2],
  },

  requiredIndicator: {
    color: colors.error,
  },
});

const CONDITIONS = [
  { id: 'new', label: 'New' },
  { id: 'like-new', label: 'Like New' },
  { id: 'good', label: 'Good' },
  { id: 'fair', label: 'Fair' },
];

const CATEGORIES = [
  { id: 'books', label: 'Books', icon: '📚' },
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'furniture', label: 'Furniture', icon: '🛏️' },
  { id: 'clothing', label: 'Clothing', icon: '👕' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'other', label: 'Other', icon: '📦' },
];

export const CreateListingScreen = ({
  onBack,
  onPublish,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'good',
    category: 'books',
    meetupLocation: '',
  });

  const [showImageUpload, setShowImageUpload] = useState(true);
  const [images, setImages] = useState([]);

  const handleImageUpload = () => {
    // Placeholder for image upload
    setImages([...images, { uri: 'https://via.placeholder.com/300x300' }]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    onPublish?.(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Create Listing"
        subtitle="Sell your items"
        showBackButton={true}
        onBackPress={onBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Images Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Photos <Text style={styles.requiredIndicator}>*</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Add clear photos of your item (up to 5)
          </Text>

          {showImageUpload && (
            <TouchableOpacity
              style={styles.imageUploadArea}
              onPress={handleImageUpload}
              activeOpacity={0.7}
            >
              <Text style={styles.uploadIcon}>📸</Text>
              <Text style={styles.uploadText}>Upload Photos</Text>
              <Text style={styles.uploadSubtext}>
                Tap to select or drag images here
              </Text>
            </TouchableOpacity>
          )}

          {images.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {images.map((image, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={image} style={{ width: '100%', height: '100%' }} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Details <Text style={styles.requiredIndicator}>*</Text>
          </Text>

          <TextInputField
            label="Item Title"
            placeholder="What are you selling?"
            value={formData.title}
            onChangeText={(title) =>
              setFormData({ ...formData, title })
            }
            required
            maxLength={100}
          />

          <TextInputField
            label="Description"
            placeholder="Describe your item..."
            value={formData.description}
            onChangeText={(description) =>
              setFormData({ ...formData, description })
            }
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Category <Text style={styles.requiredIndicator}>*</Text>
          </Text>
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
                isActive={formData.category === category.id}
                onPress={() =>
                  setFormData({ ...formData, category: category.id })
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* Price & Condition Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Price & Condition <Text style={styles.requiredIndicator}>*</Text>
          </Text>

          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <View style={{ flex: 1 }}>
              <TextInputField
                label="Price"
                placeholder="0.00"
                value={formData.price}
                onChangeText={(price) =>
                  setFormData({ ...formData, price })
                }
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <Text style={[styles.sectionSubtitle, { marginTop: spacing[3] }]}>
            Condition
          </Text>
          <View style={styles.conditionContainer}>
            {CONDITIONS.map((condition) => (
              <TouchableOpacity
                key={condition.id}
                style={[
                  styles.conditionButton,
                  formData.condition === condition.id &&
                    styles.conditionButtonActive,
                ]}
                onPress={() =>
                  setFormData({ ...formData, condition: condition.id })
                }
              >
                <Text
                  style={[
                    styles.conditionButtonText,
                    formData.condition === condition.id &&
                      styles.conditionButtonTextActive,
                  ]}
                >
                  {condition.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Meetup Location */}
        <View style={styles.section}>
          <TextInputField
            label="Preferred Meetup Location"
            placeholder="e.g., Library, Dorm A, Main Campus"
            value={formData.meetupLocation}
            onChangeText={(meetupLocation) =>
              setFormData({ ...formData, meetupLocation })
            }
            icon="📍"
          />
        </View>

        {/* Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewContainer}>
            <Text style={styles.previewLabel}>How your listing will look</Text>
            <View style={styles.previewContent}>
              {formData.title ? (
                <Text style={styles.previewTitle}>{formData.title}</Text>
              ) : (
                <Text style={[styles.previewTitle, { color: colors.onSurfaceLight }]}>
                  Your item title
                </Text>
              )}
              {formData.price && (
                <Text style={styles.previewPrice}>
                  ${formData.price}
                </Text>
              )}
              <Text style={styles.previewMeta}>
                {CONDITIONS.find((c) => c.id === formData.condition)?.label} •{' '}
                {CATEGORIES.find((c) => c.id === formData.category)?.label}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Publish Listing"
            onPress={handlePublish}
            variant="primary"
            fullWidth
          />
          <Button
            title="Save as Draft"
            onPress={onBack}
            variant="secondary"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateListingScreen;
