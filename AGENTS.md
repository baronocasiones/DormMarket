# Agent Operations Guide

Instructions for agentic coding agents operating in this React Native Web + Vite repository.

## 📋 Build, Lint & Test Commands

### Development
```bash
npm run dev          # Start Vite dev server (http://localhost:3000)
npm run build        # Build for production → dist/
npm run preview      # Preview production build locally
npm run lint         # Lint all src files (.js, .jsx, .ts, .tsx)
npm run type-check   # TypeScript type checking (no emit)
```

### Single Test Execution
```bash
# Note: Testing infrastructure not yet configured in this project
# To add testing:
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
# Then create: npm run test -- src/path/to/component.test.jsx
```

### Quick Verification
```bash
npm run lint && npm run type-check  # Check quality
npm run build                       # Verify production build works
```

---

## 🎨 Code Style Guidelines

### Imports & Module Resolution

**Order (top to bottom):**
1. External packages (React, React Native)
2. Internal modules (components, styles, utils)
3. Relative imports with @ alias or relative paths

**Required patterns:**
```javascript
// ✅ CORRECT
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';
import Button from './ui/Button';

// ❌ WRONG
import Button from './ui/Button';
import { colors } from '../styles/theme';
import React from 'react';
```

**Module alias:**
- Use `@/` for src root: `import { colors } from '@/styles/theme'`
- React Native Web is aliased as 'react-native' (automatic)

### Formatting & Structure

**Files:**
- Named exports for components: `export const MyComponent = () => {}`
- Default export optional: `export default MyComponent`
- JSX files only: `.jsx` (not `.js`)
- Max line length: 100 characters (soft limit)

**Whitespace:**
- 2-space indentation (not tabs)
- Semicolons required
- Trailing commas in multi-line objects/arrays
- One blank line between functions/sections

**Example structure:**
```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing[4],
  },
});

export const MyComponent = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
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

**Props:**
- Destructure props in function signature
- Use default parameters for optional props
- Prop drilling acceptable (state mgmt not implemented)

**Rendering:**
- Use keys for lists: `key={id}` not `key={index}`
- Memoize expensive components if needed later
- Avoid inline function definitions (for performance)

### Component Organization

**Directory structure:**
```
src/
├── screens/           # Full-screen components
├── components/
│   ├── ui/           # Reusable UI components
│   └── index.js      # Export barrel file
├── styles/
│   ├── theme.js      # Design tokens (edit here for globals)
│   └── globalStyles.js
└── App.jsx           # Main app with navigation state
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

## 🎭 Special Rules for This Project

### React Native Web Specifics
- Use `react-native` components (automatically aliased to web)
- StyleSheet for all CSS (not inline or .css files)
- No HTML tags (View, Text, TouchableOpacity instead)

### Theme System
- **Never hardcode colors/spacing** - use `theme.js`
- Update `src/styles/theme.js` for global changes
- All tokens centralized: colors, typography, spacing, shadows

### UI-Only Project
- No backend calls (app is UI showcase)
- No external state management needed
- Navigation via `setCurrentScreen` in App.jsx
- Sample data in component files is okay for demo

---

## 🔍 Code Review Checklist for Agents

Before committing:
- [ ] Imports ordered correctly (external → internal)
- [ ] No hardcoded colors/spacing (use theme)
- [ ] Components are JSX files
- [ ] All components exported properly
- [ ] Props destructured in signature
- [ ] StyleSheet.create used for styles
- [ ] No console.log in production code (use console.error/warn)
- [ ] Files follow naming conventions
- [ ] JSDoc comments for complex components

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
2. Use SafeAreaView as root
3. Import theme tokens
4. Export as named export
5. Add case in App.jsx switch statement

### Modifying Theme
1. Edit `src/styles/theme.js` only
2. All components automatically reflect changes
3. Avoid creating new color tokens - use existing palette

### Debugging
- Check console for errors/warnings
- Vite dev server at http://localhost:3000
- React DevTools extension useful
- Check HMR working (hot reload on file save)

---

## 📝 Additional Notes

- **No tests configured yet** - this is a UI showcase project
- **No linter config** - default ESLint would need setup
- **No backend** - purely frontend React Native Web
- **Mobile-first** - 390px primary viewport target
- **Production ready** - can run `npm run build` immediately

**When in doubt:** Follow existing component patterns in `/src/screens/` or `/src/components/ui/`

---

**Last Updated:** April 2026 | Framework: React 18 + React Native Web | Build: Vite 5
