# Introduction to React Native

## Lesson Objectives
- Understand React Native architecture and working principles
- Perform basic setups using Expo and React Native CLI
- Create and run the first mobile application skeleton
- Introduction to platform-specific features and design principles

## Quick Review of Previous Weeks
| Week | Topic | Importance for React Native |
|------|-------|----------------------------|
| 1 | Introduction to Mobile App Development | Understanding mobile ecosystem and tools |
| 2 | JavaScript and ES6 Fundamentals | Forms the linguistic foundation of React Native |
| 3 | React Fundamentals and JSX | Understanding component logic and JSX is critical for RN |

## What is React Native?
React Native is an open-source mobile application development framework developed by Facebook (Meta) in 2015. Key features:

### Main Characteristics
- **Cross-platform**: Develop both iOS and Android applications with a single codebase
- **Native Performance**: Access to real native components through JavaScript bridge
- **Hot Reloading**: Ability to see code changes instantly
- **Rich Ecosystem**: Thousands of third-party libraries and community support
- **Platform-specific APIs**: Access to device features like camera, GPS, sensors

### Technical Architecture
React Native adapts React's web approach to mobile platforms:
- **JavaScript Thread**: React logic and state management runs here
- **Bridge**: Communication bridge between JavaScript and native code
- **Native Thread**: Layer where platform-specific UI components are rendered

### React Native vs. React
| Topic | React | React Native |
|-------|-------|--------------|
| Target Platform | Web | iOS & Android |
| UI Creation | DOM | Native components (View, Text, ScrollView) |
| Style Definition | CSS | Flexbox-like style objects |
| Navigation | React Router | React Navigation (3rd Party) |
| Build Process | Webpack/Vite | Metro bundler + Xcode/Android Studio |

## Architecture Fundamentals
- **JavaScript Thread**: React logic and UI updates are calculated here.
- **Shadow Thread**: Layout calculations (Yoga engine) are performed here.
- **Native Main Thread**: Processing of native components and user interactions.

## Installation Options

### 1. Expo (Recommended for Beginners)
Expo is a platform and toolset that accelerates React Native development.

#### Advantages:
- **Quick Start**: Start coding immediately with minimal setup
- **OTA Updates**: Send updates without uploading to app store
- **Ready Modules**: Features like camera, location, notifications are ready
- **Cross-platform**: Same code for iOS and Android
- **Expo Go**: Ability to test on real device

#### Installation:
```bash
# Expo CLI installation
npm install -g @expo/cli

# Create new project
npx create-expo-app MyFirstApp

# Navigate to project directory
cd MyFirstApp

# Start development server
npx expo start
```

#### Expo Limitations:
- Restrictions on adding native modules
- Bundle size limitations
- Limited access to some platform-specific features

### 2. React Native CLI (Advanced)
React Native CLI is used for full native control.

#### Requirements:
**macOS (for iOS development):**
- Xcode 12 or higher
- iOS Simulator
- CocoaPods

**For Android development:**
- Android Studio
- Android SDK
- Java Development Kit (JDK)

#### Installation:
```bash
# React Native CLI installation
npm install -g @react-native-community/cli

# Create new project
npx react-native@latest init MyNativeApp

# For iOS (macOS only)
cd ios && pod install && cd ..

# For Android
npx react-native run-android
# For iOS
npx react-native run-ios
```

## Basic Project Structure
```
MyApp/
├── App.js
├── app.json
├── package.json
├── assets/
└── node_modules/
```
- `App.js`: Entry component
- `app.json`: Project metadata
- `assets/`: Images and static files

## Running the First Application
1. `npm install` or `yarn`
2. For Expo: `npx expo start`
3. For CLI: `npx react-native run-android` or `run-ios`
4. Interpreting Metro bundler screen (logs, errors)

## Component Logic
- React Native components: `View`, `Text`, `Image`, `ScrollView`, `TextInput`, `Button`
- Props, state, hooks (`useState`, `useEffect`) are used the same way in RN.
- Platform-independent UI is defined with JSX.

## Style Management
- Flexbox defaults to vertical axis (`flexDirection: 'column'`)
- Reusable style objects are created with StyleSheet API.
- Platform-specific styles: `Platform.select`, `StyleSheet.hairlineWidth`

## Platform Specificities
- `Platform` API (iOS vs Android control)
- `SafeAreaView` (iPhone notches)
- Native component libraries (React Native Paper, Native Base, etc.)
