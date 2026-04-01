# Agent Operations Guide - Expo Edition

Instructions for agentic coding agents operating in this **Expo (React Native) cross-platform** repository.

**Framework**: React Native 0.73 + Expo 50 | **Build**: Metro Bundler | **Platforms**: iOS, Android, Web

---

## 📋 Build, Lint & Test Commands

### Development

```bash
npm start             # Show platform selection menu
npm run web          # Start web development server (http://localhost:8081)
npm run ios          # Start iOS simulator (macOS only)
npm run android      # Start Android emulator
npm run eject        # Eject from Expo managed workflow (one-way!)
```

### Verification & Building

```bash
npm run lint         # Lint all src files (.js, .jsx, .ts, .tsx)
npm run type-check   # TypeScript type checking (no emit)

# Production builds
npm run build:web    # Export web static files → web-build/
npm run build:android # Build Android APK/AAB (requires EAS account)
npm run build:ios    # Build iOS IPA (requires EAS account + Apple Developer)
```

### Quick Verification

```bash
npm run lint && npm run type-check  # Check code quality
npm start -- --clear                # Clear Metro cache and rebuild
```

---

## 🎨 Code Style Guidelines

### Imports & Module Resolution

**Order (top to bottom):**
1. External packages (React, React Native, Expo)
2. Internal modules (components, styles, utils)
3. Relative imports with @ alias or relative paths

**Required patterns:**
```javascript
// ✅ CORRECT
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing } from '../styles/theme';
import { MyComponent } from '../components/ui/MyComponent';

// ❌ WRONG - Import order incorrect
import { MyComponent } from '../components/ui/MyComponent';
import { colors } from '../styles/theme';
import React from 'react';
```

**Module alias:**
- Use `@/` for src root: `import { colors } from '@/styles/theme'`
- Configured in `babel.config.js`

### Formatting & Structure

**Files:**
- Named exports for components: `export const MyComponent = () => {}`
- Default export optional: `export default MyComponent`
- **JSX files only**: `.jsx` (not `.js`)
- Max line length: 100 characters (soft limit)

**Whitespace:**
- 2-space indentation (not tabs)
- Semicolons required
- Trailing commas in multi-line objects/arrays
- One blank line between functions/sections

**Example component structure:**
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
    fontSize: 16,
    color: colors.onSurface,
  },
});

/**
 * MyComponent description
 * @param {Object} props
 * @param {string} props.title - Component title (required)
 * @param {Function} props.onPress - Press handler (required)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @returns {React.ReactElement}
 */
export const MyComponent = ({ title, onPress, disabled = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default MyComponent;
```

### Types & PropTypes

**Status:** No TypeScript in component files (vanilla JS/JSX)
- Use JSDoc comments for prop documentation
- Keep props simple and well-named

**JSDoc template:**
```javascript
/**
 * Display a button with multiple variants
 * @param {Object} props
 * @param {string} props.title - Button label (required)
 * @param {Function} props.onPress - Click handler (required)
 * @param {'primary'|'secondary'|'tertiary'|'outline'} props.variant - Style variant
 * @param {boolean} [props.disabled=false] - Disabled state
 * @returns {React.ReactElement}
 */
export const Button = ({ title, onPress, variant = 'primary', disabled = false }) => {
  // ...
};
```

### Naming Conventions

**Components:**
- PascalCase: `WelcomeScreen`, `Button`, `ProductCard`
- File matches export: `Button.jsx` exports `Button`

**Variables/Functions:**
- camelCase: `handlePress`, `backgroundColor`, `isVerified`
- Private functions: prefix with underscore if needed

**Constants:**
- UPPER_SNAKE_CASE for true constants: `MAX_ITEMS = 50`
- camelCase for theme imports: `colors`, `spacing`, `borderRadius`

**Booleans:**
- Prefix with `is`, `has`, `can`: `isActive`, `hasError`, `canSubmit`

### Error Handling

**Try-Catch (UI layer):**
```javascript
try {
  // React component logic
} catch (error) {
  console.error('Component error:', error);
  // Fallback UI
  return <ErrorFallback />;
}
```

**Validation:**
```javascript
if (!title || typeof title !== 'string') {
  console.warn('Button: title prop is required and must be string');
  return null;
}
```

**No silent failures:**
- Always log errors for debugging
- Provide meaningful error messages
- Consider user feedback (UI indicators)

### React Best Practices

**Hooks:**
- Use functional components with hooks only
- `useState` for local component state
- Store theme values in `src/styles/theme.js` (global)
- Avoid setState in useEffect without dependencies

**Props:**
- Destructure props in function signature
- Use default parameters for optional props
- Prop drilling acceptable (state mgmt not implemented yet)

**Rendering:**
- Use keys for lists: `key={id}` not `key={index}`
- Memoize expensive components if needed
- Avoid inline function definitions

### Component Organization

**Directory structure:**
```
src/
├── screens/           # Full-screen components (7 total)
├── components/
│   └── ui/           # Reusable UI components (11 total)
├── styles/
│   ├── theme.js      # Design tokens (edit here for globals)
│   └── globalStyles.js
└── App.jsx           # Main app with screen navigation
```

**Component template:**
```javascript
// 1. Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

// 2. Styles (StyleSheet.create for performance)
const styles = StyleSheet.create({
  container: { /* ... */ },
});

// 3. Component
export const MyComponent = ({ prop1, prop2 = 'default' }) => {
  // Component logic here
  return <View style={styles.container}>{/* ... */}</View>;
};

// 4. Export
export default MyComponent;
```

---

## 🎭 Expo-Specific Rules

### Platform-Specific Code
Create separate files for platform implementations:

```javascript
// MyComponent.ios.jsx - iOS only
export const MyComponent = () => <Text>iOS version</Text>;

// MyComponent.android.jsx - Android only  
export const MyComponent = () => <Text>Android version</Text>;

// MyComponent.web.jsx - Web only (optional)
export const MyComponent = () => <Text>Web version</Text>;

// Generic import works across all platforms
import { MyComponent } from './MyComponent';
```

### Expo-Specific Components
```javascript
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

// StatusBar in SafeAreaView
<SafeAreaView style={{ flex: 1 }}>
  <StatusBar barStyle="dark-content" />
  {/* Rest of app */}
</SafeAreaView>
```

### SafeAreaView Usage
```javascript
import { SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export const MyScreen = () => (
  <SafeAreaView style={styles.container}>
    {/* Content stays within safe area */}
  </SafeAreaView>
);
```

### Avoid Web-Only APIs
```javascript
// ❌ AVOID - Only works on web
<View style={{ width: '100%', height: '100vh' }} />

// ✅ PREFER - Works cross-platform
<View style={{ flex: 1 }} />
```

---

## 🎨 Theme System

**Never hardcode colors/spacing** - Use `theme.js`

```javascript
// ✅ Correct
import { colors, spacing } from '../styles/theme';
<View style={{ padding: spacing[4], backgroundColor: colors.primary }} />

// ❌ Wrong
<View style={{ padding: 16, backgroundColor: '#2563EB' }} />
```

### Update Theme Globally
Edit `src/styles/theme.js`:
- **colors**: Primary (#2563EB), secondary, background, surfaces, text
- **spacing**: 4, 8, 12, 16, 24, 32, 40, 48, 56, 64
- **typography**: Font families, sizes, line heights
- **borderRadius**: small, medium, large, full
- **shadows**: subtle, default, elevated

All components automatically reflect changes.

---

## 🔍 Code Review Checklist for Agents

Before committing:
- [ ] Imports ordered correctly (React → RN → Expo → internal)
- [ ] No hardcoded colors/spacing (use theme)
- [ ] Components are JSX files
- [ ] All components exported properly
- [ ] Props destructured in function signature
- [ ] StyleSheet.create used for styles
- [ ] SafeAreaView used on mobile screens
- [ ] No console.log in production (use console.error/warn)
- [ ] Files follow naming conventions
- [ ] JSDoc comments for complex components
- [ ] Platform-specific code in .ios/.android/.web files when needed

---

## 🚀 Common Agent Tasks

### Adding a New Component
1. Create `src/components/ui/ComponentName.jsx`
2. Use StyleSheet.create for styles
3. Import colors/spacing from theme
4. Export default + named export
5. Add JSDoc comments

### Adding a New Screen
1. Create `src/screens/ScreenName.jsx`
2. Import and wrap with `SafeAreaView` + `StatusBar`
3. Use theme tokens
4. Export as named export
5. Add case in App.jsx switch statement

### Platform-Specific Implementation
1. Create base component `MyComponent.jsx`
2. Create `MyComponent.ios.jsx` (iOS version)
3. Create `MyComponent.android.jsx` (Android version)
4. Import normally - Expo automatically picks correct version

### Modifying Theme
1. Edit `src/styles/theme.js` only
2. All components automatically reflect changes
3. Avoid creating new color tokens - use existing palette
4. Test on all platforms: `npm run web`, `npm run ios`, `npm run android`

### Debugging
- **Web**: Chrome DevTools (F12)
- **iOS/Android**: Expo DevTools (Shift+M in Metro terminal)
- Check console: `npm start` terminal shows logs
- React Native Debugger: https://github.com/jhen0409/react-native-debugger
- Logs: `adb logcat` (Android) or Xcode console (iOS)

### Running Tests (When Implemented)
```bash
npm test -- src/components/ui/Button.test.jsx
npm test -- --watch  # Watch mode
npm test -- --coverage  # Coverage report
```

---

## 📝 File Structure Rules

### ✅ CORRECT Structure
```
src/
├── screens/              (7 screens)
├── components/ui/        (11 components)
├── styles/               (theme.js + globalStyles.js)
├── App.jsx               (Main app + navigation)
└── navigation/           (Placeholder for future routing)

Root:
├── index.js              (Expo entry point)
├── app.json              (Expo config)
├── eas.json              (Build config)
├── babel.config.js       (Babel/Metro config)
├── tsconfig.json
├── package.json
├── EXPO_GUIDE.md
└── AGENTS.md
```

### ❌ AVOID
```
src/
├── components/           (Deprecated location for UI)
├── src/index.jsx         (Old Vite entry)
├── src/App.css           (CSS files - use StyleSheet)
├── vite.config.js        (Vite - not used with Expo)
└── agents/               (Docs in wrong location)
```

---

## 🎯 Build Optimization

### Bundle Size
```bash
# Check bundle size
npx expo-bundle-analyzer
```

### Code Splitting
- Expo handles automatic code splitting for web
- Use React.lazy() for route-based splitting if needed

### Image Optimization
```javascript
// Use optimized, properly sized images
<Image 
  source={require('./icon.png')} 
  style={{ width: 48, height: 48 }}
  resizeMode="contain"
/>
```

---

## 🚀 Quick Verification

```bash
# Check everything works
npm install                  # Install deps
npm run type-check          # TS check
npm run lint                # Lint
npm start -- --clear        # Clear cache and start

# Test each platform
npm run web                 # Web: http://localhost:8081
npm run ios                 # iOS Simulator
npm run android             # Android Emulator
```

---

## 📱 Platform Testing Matrix

| Feature | iOS | Android | Web |
|---------|-----|---------|-----|
| Layout | ✅ | ✅ | ✅ |
| Touch Events | ✅ | ✅ | ✅ (mouse) |
| Safe Area | ✅ | ✅ | ⚠️ (CSS) |
| Fonts | ✅ | ✅ | ✅ |
| Images | ✅ | ✅ | ✅ |
| Colors | ✅ | ✅ | ✅ |
| Shadows | ✅ | ✅ | ✅ (CSS) |

**Always test on all platforms before committing!**

---

## 🔄 Deployment Workflow

1. **Version Bump**: Update `app.json` version
2. **Test Build**: `npm run build:web` (or build:ios/android)
3. **Deploy Web**: `npm run build:web && vercel --prod`
4. **Submit to Stores**: EAS handles iOS/Android submission

---

## 📚 Additional Notes

- **Testing**: Not yet configured - add Jest + React Testing Library when needed
- **State Management**: Not yet configured - add Redux/Zustand if needed
- **Navigation**: Not yet configured - add React Navigation if complex routing needed
- **Backend**: UI-only for now - integrate API endpoints as needed
- **Mobile-first**: 390px primary viewport target

**When in doubt:** Follow existing component patterns in `/src/screens/` or `/src/components/ui/`

---

## Resources

- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Metro Bundler**: https://metrobundler.dev
- **Expo Router**: https://expo.github.io/router/ (navigation)

---

**Last Updated:** April 2026 | **Framework**: React Native 0.73 + Expo 50 | **Status**: Production Ready
