# Expo Development Guide for DormMarket

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI: `npm install -g expo-cli` (optional, npx works too)
- For iOS: Xcode + Apple Developer Account (for building)
- For Android: Android Studio + Android SDK (for building)

### Getting Started

```bash
# Install dependencies
npm install

# Start development server (choose platform)
npm start              # Shows platform menu
npm run ios           # iOS simulator (macOS only)
npm run android       # Android emulator
npm run web           # Web browser (http://localhost:8081)

# Build for production
npm run build:android # Android APK/AAB
npm run build:ios     # iOS IPA
npm run build:web     # Web static export
```

---

## Project Structure

```
dormmarket/
├── index.js                         # Expo entry point (registerRootComponent)
├── app.json                         # Expo configuration (platforms, icons, etc.)
├── eas.json                         # EAS Build configuration (CI/CD)
├── babel.config.js                  # Babel configuration for Metro bundler
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
│
├── src/
│   ├── App.jsx                      # Main app component with screen navigation
│   ├── components/
│   │   └── ui/                      # 11 reusable UI components
│   │       ├── Avatar.jsx
│   │       ├── Badge.jsx
│   │       ├── BottomSheet.jsx
│   │       ├── BottomTabBar.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── CategoryChip.jsx
│   │       ├── Header.jsx
│   │       ├── Rating.jsx
│   │       ├── SearchBar.jsx
│   │       └── TextInputField.jsx
│   ├── screens/                     # 7 complete screens
│   │   ├── WelcomeScreen.jsx
│   │   ├── EmailVerification.jsx
│   │   ├── SelectCampusScreen.jsx
│   │   ├── MarketplaceBrowseScreen.jsx
│   │   ├── StudentProfile.jsx
│   │   ├── CreateListing.jsx
│   │   ├── InAppMessaging.jsx
│   │   └── index.js
│   ├── styles/
│   │   ├── theme.js                 # Design tokens (colors, typography, spacing)
│   │   └── globalStyles.js          # Global StyleSheet definitions
│   └── navigation/                  # Future navigation setup (if using React Navigation)
│
├── assets/                          # App icons, splash screens, images
│   ├── icon.png                     # 1024x1024 app icon
│   ├── splash.png                   # 1284x2778 splash screen
│   ├── adaptive-icon.png            # 108x108 Android adaptive icon
│   └── favicon.png                  # 192x192 web favicon
│
└── README.md                        # Project overview
```

---

## Key Configuration Files

### app.json (Expo Configuration)
```json
{
  "expo": {
    "name": "DormMarket",
    "slug": "dormmarket",
    "version": "1.0.0",
    "orientation": "portrait",
    "ios": { "supportsTabletMode": true, "bundleIdentifier": "com.dormmarket.app" },
    "android": { "package": "com.dormmarket.app" },
    "web": { "bundler": "metro" },
    "scheme": "dormmarket",
    "primaryColor": "#2563EB"
  }
}
```

Key fields:
- **slug**: Used in URLs and store listings (lowercase, no spaces)
- **bundleIdentifier** (iOS): Unique identifier for App Store
- **package** (Android): Unique identifier for Play Store
- **primaryColor**: Brand color for branding elements

### eas.json (Build Service Configuration)
Controls how Expo builds your app for iOS/Android:
- **development**: Internal testing builds
- **preview**: Beta/staging builds for TestFlight/Google Play Beta
- **production**: App Store/Play Store production builds

### babel.config.js
Configures the Metro bundler for React Native:
```javascript
module.exports = function(api) {
  return {
    presets: ['babel-preset-expo'],
    plugins: [['module-resolver', { alias: { '@': './src' } }]],
  };
};
```

Enables:
- JSX transformation
- Module aliasing (@/ shortcuts)
- Platform-specific imports (.ios.js, .android.js)

---

## Development Workflow

### 1. Start Local Development

```bash
npm start
# Shows menu:
# › Select an option:
# ›   w - start web
# ›   i - start iOS simulator
# ›   a - start Android emulator
```

Or directly:
```bash
npm run web      # Web at http://localhost:8081
npm run ios      # iOS simulator (macOS only)
npm run android  # Android emulator
```

### 2. Hot Module Reloading (HMR)
Changes to component files automatically reload:
- **Fast Refresh**: JavaScript-only changes (instant)
- **Full Reload**: Native module changes (5-10 seconds)

### 3. Development Tips

**Add a new screen:**
```javascript
// src/screens/MyScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing[4], backgroundColor: colors.background },
});

export const MyScreen = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <Text>New Screen</Text>
    </View>
  );
};

export default MyScreen;
```

**Add a new UI component:**
```javascript
// src/components/ui/MyComponent.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles/theme';

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
});

export const MyComponent = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

export default MyComponent;
```

### 4. Testing Different Platforms

```bash
# Web (browser)
npm run web

# iOS Simulator (requires macOS + Xcode)
npm run ios

# Android Emulator (requires Android Studio + emulator)
npm run android
```

---

## Building for Production

### Web Export
```bash
npm run build:web
# Output: web-build/ directory (static files ready for deployment)
```

Deploy to:
- Netlify: `netlify deploy --prod --dir web-build`
- Vercel: `vercel --prod`
- AWS S3: `aws s3 sync web-build s3://my-bucket --delete`

### iOS Build (App Store)

**Prerequisites:**
- Apple Developer Account ($99/year)
- Provisioning profile configured in Xcode

**Build steps:**
```bash
# One-time setup (configure signing)
eas build --platform ios --setup

# Build for App Store
npm run build:ios

# Or via EAS CLI directly
eas build --platform ios --auto-submit
```

### Android Build (Play Store)

**Prerequisites:**
- Google Play Developer Account ($25 one-time)
- Signing keystore configured

**Build steps:**
```bash
# One-time setup (configure signing)
eas build --platform android --setup

# Build for Play Store
npm run build:android

# Or via EAS CLI directly
eas build --platform android --auto-submit
```

---

## Code Style & Guidelines

### Imports
```javascript
// ✅ Correct order
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing } from '../styles/theme';
import { MyComponent } from '../components/ui/MyComponent';

// ❌ Wrong order
import { MyComponent } from '../components/ui/MyComponent';
import { colors } from '../styles/theme';
import React from 'react';
```

### Component Template
```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing[4],
    backgroundColor: colors.background,
  },
  text: {
    ...typography.headlineMedium,
    color: colors.onSurface,
  },
});

/**
 * MyComponent description
 * @param {Object} props
 * @param {string} props.title - Component title
 * @param {Function} props.onPress - Press handler
 * @returns {React.ReactElement}
 */
export const MyComponent = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default MyComponent;
```

### Design Tokens (Never Hardcode Colors!)
```javascript
// ✅ Correct
import { colors, spacing } from '../styles/theme';
<View style={{ padding: spacing[4], backgroundColor: colors.primary }} />

// ❌ Wrong
<View style={{ padding: 16, backgroundColor: '#2563EB' }} />
```

All design tokens in `src/styles/theme.js`:
- **colors**: Primary, secondary, background, surfaces, text
- **spacing**: 4, 8, 12, 16, 24, 32, 40, 48, 56, 64
- **typography**: Fonts, sizes, line heights
- **borderRadius**: small, medium, large, full
- **shadows**: subtle, default, elevated

---

## Common Tasks

### Add a New Dependency
```bash
# For native modules
npx expo install react-native-gesture-handler

# For JS-only packages
npm install lodash
```

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest
```

### Debug on Device

**iOS:**
```bash
# Get device ID
xcrun xcode-select --print-path

# Run on device
npm run ios -- --device
```

**Android:**
```bash
# List connected devices
adb devices

# Run on device
npm run android -- --device
```

### Use Debugger
```bash
# 1. Start dev server
npm start

# 2. Press 'j' in terminal to open Debugger
# 3. Open Chrome DevTools (if using web)
# 4. Set breakpoints and inspect variables
```

---

## Platform-Specific Code

### iOS-Only Code
```javascript
// MyComponent.ios.jsx
export const MyComponent = () => <Text>iOS version</Text>;
```

### Android-Only Code
```javascript
// MyComponent.android.jsx
export const MyComponent = () => <Text>Android version</Text>;
```

### Platform Detection
```javascript
import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const isWeb = Platform.OS === 'web';

if (isIOS) {
  // iOS-specific code
}
```

---

## Performance Optimization

### 1. Image Optimization
```javascript
// ❌ Bad
<Image source={require('./large-image.png')} style={{ width: 100, height: 100 }} />

// ✅ Good
<Image 
  source={require('./small-image.png')} 
  style={{ width: 100, height: 100 }} 
  resizeMode="contain"
/>
```

### 2. List Performance
```javascript
import { FlashList } from '@shopify/flash-list';

// Use FlashList for large lists instead of ScrollView
<FlashList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={(item) => item.id}
  estimatedItemSize={100}
/>
```

### 3. Memoization
```javascript
import { memo, useMemo } from 'react';

// Memoize expensive components
export const MyComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(d => ({ ...d, computed: d.value * 2 }));
  }, [data]);

  return <View>{/* ... */}</View>;
});
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9

# Or use different port
EXPO_PACKAGER_PORT=8082 npm start
```

### Metro Bundler Errors
```bash
# Clear cache and rebuild
npm start -- --clear

# Or manually
rm -rf node_modules/.cache
npm start
```

### Dependency Issues
```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Build Failures
```bash
# Check Expo version compatibility
npx expo diagnostics

# Update EAS
npm install -g eas-cli@latest

# Rebuild from scratch
eas build --platform android --clear-cache
```

---

## Environment Variables

Create `.env` file:
```env
API_URL=https://api.dormmarket.com
API_KEY=your_api_key_here
```

Use in code:
```javascript
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

Reference in app.json:
```json
{
  "expo": {
    "extra": {
      "apiUrl": "@env API_URL",
      "apiKey": "@env API_KEY"
    }
  }
}
```

---

## Release Checklist

- [ ] Update version in `app.json` and `package.json`
- [ ] Test on iOS simulator (`npm run ios`)
- [ ] Test on Android emulator (`npm run android`)
- [ ] Test on web (`npm run web`)
- [ ] Run linter (`npm run lint`)
- [ ] Type check (`npm run type-check`)
- [ ] Update `CHANGELOG.md` with release notes
- [ ] Build production APK/IPA (`eas build --platform android/ios`)
- [ ] Submit to app stores (automatic with `--auto-submit`)
- [ ] Tag git release (`git tag v1.0.0`)

---

## Resources

- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Expo Router**: https://expo.github.io/router/ (navigation library)
- **Expo SDK**: https://docs.expo.dev/versions/latest/

---

## Next Steps

1. **Authentication**: Implement user login/signup with Firebase or custom backend
2. **Navigation**: Set up React Navigation for proper screen transitions
3. **Backend**: Connect to REST API or GraphQL server
4. **Database**: Set up AsyncStorage for local data, or cloud database
5. **Testing**: Add unit tests with Jest and component tests with React Testing Library
6. **Analytics**: Integrate analytics (Amplitude, Mixpanel, Firebase)
7. **Push Notifications**: Implement with Expo Notifications
8. **Maps**: Add map features with react-native-maps

---

Last updated: April 2026
Expo SDK Version: 50+
Platform: iOS, Android, Web
