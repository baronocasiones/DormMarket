import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../styles/theme';
import Button from './ui/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[6],
  },

  heroSection: {
    marginBottom: spacing[6],
  },

  heroImage: {
    width: '100%',
    height: 280,
    borderRadius: borderRadius.large,
    backgroundColor: colors.primaryContainer,
    marginBottom: spacing[4],
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.default,
  },

  heroEmoji: {
    fontSize: 96,
  },

  headline: {
    fontSize: typography.sizes.headlineLarge,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing[2],
    fontFamily: typography.fonts.headline,
  },

  subtitle: {
    fontSize: typography.sizes.bodyLarge,
    color: colors.onSurfaceLight,
    lineHeight: 24,
    fontFamily: typography.fonts.body,
  },

  featureList: {
    marginVertical: spacing[6],
  },

  featureItem: {
    flexDirection: 'row',
    marginBottom: spacing[3],
    alignItems: 'flex-start',
  },

  featureIcon: {
    fontSize: 20,
    marginRight: spacing[3],
    marginTop: 2,
  },

  featureText: {
    flex: 1,
    fontSize: typography.sizes.bodyMedium,
    fontWeight: '500',
    color: colors.onSurface,
    lineHeight: 20,
    fontFamily: typography.fonts.body,
  },

  buttonContainer: {
    gap: spacing[3],
  },

  divider: {
    fontSize: typography.sizes.labelMedium,
    color: colors.onSurfaceLight,
    textAlign: 'center',
    fontFamily: typography.fonts.body,
  },

  campusTag: {
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.large,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    alignSelf: 'flex-start',
    marginTop: spacing[3],
  },

  campusTagText: {
    fontSize: typography.sizes.labelMedium,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: typography.fonts.body,
  },
});

export const WelcomeScreen = ({ onSignUp, onLogin, onCampusSelect }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroImage}>
            <Text style={styles.heroEmoji}>📚</Text>
          </View>

          <Text style={styles.headline}>DormMarket</Text>
          <Text style={styles.subtitle}>
            Buy and sell items with fellow students on campus. Trust, community,
            and convenience in one place.
          </Text>

          {/* Features */}
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>
                Browse student listings in your dorm
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>
                Safe, verified student sellers
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>
                Real-time messaging with buyers/sellers
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>
                Quick, easy meetups on campus
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={onSignUp}
            variant="primary"
            fullWidth
          />

          <Text style={styles.divider}>or</Text>

          <Button
            title="Log In"
            onPress={onLogin}
            variant="secondary"
            fullWidth
          />

          <TouchableOpacity
            style={styles.campusTag}
            onPress={onCampusSelect}
          >
            <Text style={styles.campusTagText}>🎓 Select Campus</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
