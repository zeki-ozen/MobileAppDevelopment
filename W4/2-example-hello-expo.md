# "Hello React Native" with Expo - Advanced Example

This example shows how to set up your first React Native screen using Expo. Students gain motivation by getting output immediately after setup.

## Project Setup and Running

### 1. Basic Setup
```bash
# Expo CLI installation (global)
npm install -g @expo/cli

# Create new project
npx create-expo-app hello-rn

# Navigate to project directory
cd hello-rn

# Install dependencies
npm install
```

### 2. Starting Development Server
```bash
# Start Expo development server
npx expo start

# Alternative commands:
# npx expo start --tunnel    # Tunnel mode (access over internet)
# npx expo start --lan       # LAN mode (local network)
# npx expo start --localhost  # Localhost only
```

### 3. Testing the Application
- **Expo Go**: Download Expo Go app on your phone and scan QR code
- **iOS Simulator**: Press `i` to open in iOS simulator
- **Android Emulator**: Press `a` to open in Android emulator
- **Web**: Press `w` to open in web browser

## Advanced Code Example

### Basic App.js
```tsx
// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hello React Native 🚀</Text>
        <Text style={styles.subtitle}>
          Platform: {Platform.OS} {Platform.Version}
        </Text>
        <Text style={styles.description}>
          This app is created with Expo and works cross-platform.
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
});
```

### Interactive Version
```tsx
// App.js - Interactive version
import React, { useState } from 'react';
import { 
  StatusBar, 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Welcome to React Native!');

  const handlePress = () => {
    setCount(count + 1);
    if (count >= 5) {
      Alert.alert('Congratulations!', 'You clicked 5 times! 🎉');
      setCount(0);
    }
  };

  const handleLongPress = () => {
    Alert.alert(
      'Platform Information',
      `Platform: ${Platform.OS}\nVersion: ${Platform.Version}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{message}</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handlePress}
          onLongPress={handleLongPress}
        >
          <Text style={styles.buttonText}>
            Click Count: {count}
          </Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Long press: Platform info{'\n'}
          Short press: Increment counter
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4299e1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
});
```

## Expo Features and Advantages

### 1. Hot Reloading and Fast Refresh
- **Hot Reloading**: See code changes instantly
- **Fast Refresh**: Reload components while preserving state
- **Live Reloading**: Complete app restart

### 2. Expo Go Application
- Ability to test on real device
- Quick connection with QR code
- Access to native features like camera, location
- OTA (Over-The-Air) updates

### 3. Expo CLI Commands
```bash
# Help and command list
npx expo --help

# View project information
npx expo whoami

# Check project configuration
npx expo doctor

# Clear cache
npx expo r -c

# Open in web
npx expo start --web
```

## Project Structure and Organization

### Recommended Folder Structure
```
hello-rn/
├── App.js                 # Main component
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── assets/               # Static files
│   ├── images/
│   └── fonts/
├── components/           # Reusable components
│   ├── Button.js
│   └── Card.js
├── screens/             # Screen components
│   ├── HomeScreen.js
│   └── ProfileScreen.js
├── hooks/               # Custom hooks
│   └── useCounter.js
├── utils/               # Helper functions
│   └── helpers.js
└── constants/           # Constants
    └── Colors.js
```
