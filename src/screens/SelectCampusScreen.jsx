import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../styles/theme';
import Header from '../components/ui/Header';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },

  description: {
    fontSize: typography.sizes.bodyMedium,
    color: colors.onSurfaceLight,
    lineHeight: 22,
    marginBottom: spacing[4],
    fontFamily: typography.fonts.body,
  },

  sectionLabel: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: '600',
    color: colors.onSurfaceLight,
    marginBottom: spacing[2],
    marginTop: spacing[4],
    fontFamily: typography.fonts.body,
  },

  campusList: {
    marginBottom: spacing[4],
  },

  campusItem: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    padding: spacing[3],
    marginBottom: spacing[2],
    borderWidth: 1.5,
    borderColor: colors.surfaceContainer,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.subtle,
  },

  campusItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLow,
  },

  campusIcon: {
    fontSize: 28,
    marginRight: spacing[3],
  },

  campusContent: {
    flex: 1,
  },

  campusName: {
    fontSize: typography.sizes.titleMedium,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[1],
    fontFamily: typography.fonts.body,
  },

  campusLocation: {
    fontSize: typography.sizes.bodySmall,
    color: colors.onSurfaceLight,
    fontFamily: typography.fonts.body,
  },

  checkmark: {
    fontSize: 24,
    color: colors.primary,
  },

  selectionCounter: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: '600',
    color: colors.onSurfaceLight,
    marginBottom: spacing[3],
    fontFamily: typography.fonts.body,
  },

  buttonContainer: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
    gap: spacing[2],
  },
});

const CAMPUSES = [
  {
    id: 1,
    name: 'Main Campus',
    location: 'Downtown',
    icon: '🏫',
  },
  {
    id: 2,
    name: 'North Campus',
    location: 'North District',
    icon: '🏢',
  },
  {
    id: 3,
    name: 'East Campus',
    location: 'East Side',
    icon: '🏛️',
  },
  {
    id: 4,
    name: 'West Campus',
    location: 'West Side',
    icon: '🎓',
  },
  {
    id: 5,
    name: 'Medical Campus',
    location: 'Hospital District',
    icon: '🏥',
  },
];

export const CampusSelectionScreen = ({
  onContinue,
  onBack,
  onMultipleSelect = true,
}) => {
  const [selectedCampuses, setSelectedCampuses] = useState([1]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCampus = (campusId) => {
    if (onMultipleSelect) {
      setSelectedCampuses((prev) =>
        prev.includes(campusId)
          ? prev.filter((id) => id !== campusId)
          : [...prev, campusId]
      );
    } else {
      setSelectedCampuses([campusId]);
    }
  };

  const filteredCampuses = CAMPUSES.filter((campus) =>
    campus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campus.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Select Campus"
        subtitle="Choose where you study"
        showBackButton={true}
        onBackPress={onBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          {onMultipleSelect
            ? 'Select one or more campuses to browse items. You can change this anytime in your settings.'
            : 'Select your primary campus to get started.'}
        </Text>

        <SearchBar
          placeholder="Search campuses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Text style={styles.sectionLabel}>
          Available Campuses ({selectedCampuses.length} selected)
        </Text>

        <View style={styles.campusList}>
          {filteredCampuses.map((campus) => (
            <TouchableOpacity
              key={campus.id}
              style={[
                styles.campusItem,
                selectedCampuses.includes(campus.id) &&
                  styles.campusItemSelected,
              ]}
              onPress={() => toggleCampus(campus.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.campusIcon}>{campus.icon}</Text>
              <View style={styles.campusContent}>
                <Text style={styles.campusName}>{campus.name}</Text>
                <Text style={styles.campusLocation}>{campus.location}</Text>
              </View>
              {selectedCampuses.includes(campus.id) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={() => onContinue?.(selectedCampuses)}
          variant="primary"
          fullWidth
        />
        <Button
          title="Cancel"
          onPress={onBack}
          variant="outline"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

export default CampusSelectionScreen;
