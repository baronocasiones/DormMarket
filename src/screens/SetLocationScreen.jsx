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
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollContent: {
    flexGrow: 1,
    padding: spacing[4],
  },
  
  description: {
    fontSize: 14,
    color: colors.onSurfaceLight,
    lineHeight: 22,
    marginBottom: spacing[4],
  },
  
  locationItem: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.large,
    padding: spacing[3],
    marginBottom: spacing[3],
    borderWidth: 2,
    borderColor: colors.surfaceContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.subtle,
  },
  
  locationItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLow,
  },
  
  locationInfo: {
    flex: 1,
  },
  
  dormName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[1],
  },
  
  dormDetails: {
    fontSize: 12,
    color: colors.onSurfaceLight,
  },
  
  checkmark: {
    fontSize: 20,
    color: colors.primary,
  },
  
  categorySection: {
    marginBottom: spacing[6],
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing[3],
    marginTop: spacing[4],
  },
  
  buttonContainer: {
    marginTop: spacing[6],
  },
});

const DORM_DATA = {
  'Main Campus': [
    { id: '1', name: 'North Tower', building: 'Building A', distance: '5 min walk' },
    { id: '2', name: 'South Tower', building: 'Building B', distance: '10 min walk' },
    { id: '3', name: 'East Wing', building: 'Building C', distance: '8 min walk' },
    { id: '4', name: 'West Hall', building: 'Building D', distance: '12 min walk' },
  ],
  'North Campus': [
    { id: '5', name: 'Engineers Hall', building: 'Tech Building', distance: '3 min walk' },
    { id: '6', name: 'Innovation Hub', building: 'Innovation Center', distance: '7 min walk' },
  ],
  'South Campus': [
    { id: '7', name: 'Arts House', building: 'Arts Building', distance: '4 min walk' },
    { id: '8', name: 'Creative Commons', building: 'Commons Building', distance: '9 min walk' },
  ],
};

export const SetLocationScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('Main Campus');
  
  const filteredDorms = expandedCategory
    ? DORM_DATA[expandedCategory]?.filter((dorm) =>
        dorm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dorm.building.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    : [];
  
  const handleContinue = () => {
    if (selectedLocation) {
      navigation.navigate('MarketplaceBrowse');
    }
  };
  
  const renderLocationItem = ({ item }) => {
    const isSelected = selectedLocation?.id === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.locationItem, isSelected && styles.locationItemSelected]}
        onPress={() => setSelectedLocation(item)}
        activeOpacity={0.7}
      >
        <View style={styles.locationInfo}>
          <Text style={styles.dormName}>{item.name}</Text>
          <Text style={styles.dormDetails}>{item.building} • {item.distance}</Text>
        </View>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Set Your Location"
        subtitle="Which dorm or building?"
        onBackPress={() => navigation.goBack()}
        showBackButton={true}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Select your dorm or building to see nearby listings and be
          discoverable to other students.
        </Text>
        
        <SearchBar
          placeholder="Search dorm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        {Object.keys(DORM_DATA).map((category) => (
          <View key={category}>
            <TouchableOpacity
              style={{ marginVertical: spacing[2] }}
              onPress={() =>
                setExpandedCategory(
                  expandedCategory === category ? null : category
                )
              }
            >
              <Text style={styles.sectionTitle}>
                {category}{' '}
                {expandedCategory === category ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>
            
            {expandedCategory === category && (
              <View>
                <FlatList
                  data={
                    searchQuery
                      ? filteredDorms
                      : DORM_DATA[category]
                  }
                  renderItem={renderLocationItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            )}
          </View>
        ))}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Complete Setup"
            onPress={handleContinue}
            disabled={!selectedLocation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetLocationScreen;
