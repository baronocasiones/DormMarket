import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import screens
import { WelcomeScreen } from './screens/WelcomeScreen';
import { MarketplaceBrowseScreen } from './screens/MarketplaceBrowseScreen';
import { CampusSelectionScreen } from './screens/SelectCampusScreen';
import { StudentProfileScreen } from './screens/StudentProfile';
import { CreateListingScreen } from './screens/CreateListing';
import { InAppMessagingScreen } from './screens/InAppMessaging';
import { EmailVerificationScreen } from './screens/EmailVerification';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [navigationParams, setNavigationParams] = useState({});

  const handleNavigation = (screenName, params = {}) => {
    setCurrentScreen(screenName);
    setNavigationParams(params);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onSignUp={() => handleNavigation('emailVerification')}
            onLogin={() => handleNavigation('emailVerification')}
            onCampusSelect={() => handleNavigation('campusSelection')}
          />
        );
      case 'emailVerification':
        return (
          <EmailVerificationScreen
            email="student@university.edu"
            onVerify={() => handleNavigation('campusSelection')}
            onBack={() => handleNavigation('welcome')}
          />
        );
      case 'campusSelection':
        return (
          <CampusSelectionScreen
            onContinue={() => handleNavigation('marketplace')}
            onBack={() => handleNavigation('emailVerification')}
          />
        );
      case 'marketplace':
        return (
          <MarketplaceBrowseScreen
            onTabPress={(tab) => {
              if (tab === 'profile') handleNavigation('profile');
              if (tab === 'messages') handleNavigation('messages');
            }}
            onProductPress={(productId) => {
              // Product detail logic would go here
            }}
            onFilterPress={() => {
              // Filter logic would go here
            }}
            activeTab="browse"
          />
        );
      case 'profile':
        return (
          <StudentProfileScreen
            onEditProfile={() => {
              // Edit profile logic
            }}
            onContactClick={() => handleNavigation('messages')}
            onViewMore={() => {
              // View more reviews/listings
            }}
            onTabPress={(tab) => {
              if (tab === 'browse') handleNavigation('marketplace');
              if (tab === 'messages') handleNavigation('messages');
            }}
            activeTab="profile"
          />
        );
      case 'messages':
        return (
          <InAppMessagingScreen
            view="list"
            onConversationPress={() => {
              handleNavigation('messages', { view: 'chat' });
            }}
            onBack={() => handleNavigation('marketplace')}
            onTabPress={(tab) => {
              if (tab === 'browse') handleNavigation('marketplace');
              if (tab === 'profile') handleNavigation('profile');
            }}
            activeTab="messages"
          />
        );
      case 'createListing':
        return (
          <CreateListingScreen
            onBack={() => handleNavigation('marketplace')}
            onPublish={(data) => {
              console.log('Publishing listing:', data);
              handleNavigation('marketplace');
            }}
          />
        );
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.safeArea}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}
