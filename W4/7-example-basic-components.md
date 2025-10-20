# Basic React Native Components - Comprehensive Guide

This document shows how to use React Native's basic components (`View`, `Text`, `Image`, `ScrollView`, `FlatList`, `TouchableOpacity`, `TextInput`, etc.). You will learn each component's features, usage scenarios, and performance optimizations.

## 📱 How to Use?

### 1. Project Creation
```bash
# Create Expo project
npx create-expo-app ComponentsExampleApp
cd ComponentsExampleApp
```

### 2. File Structure
```
ComponentsExampleApp/
├── App.js                 # Main application file
├── components/            # Components folder
│   ├── View.js
│   ├── Text.js
│   ├── Image.js
│   ├── ScrollView.js
│   ├── FlatList.js
│   ├── TouchableOpacity.js
│   └── TextInput.js
└── package.json
```

### 3. Creating Component Files
1. Create `components` folder
2. Create separate file for each component
3. Copy the codes below

### 4. Calling from App.js
```tsx
// App.js
import React from 'react';
import { ScrollView } from 'react-native';
import BasicView from './components/View';
import TextExamples from './components/Text';
import ImageExamples from './components/Image';
import ScrollViewExamples from './components/ScrollView';
import FlatListExamples from './components/FlatList';
import TouchableOpacityExamples from './components/TouchableOpacity';
import TextInputExamples from './components/TextInput';

export default function App() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <BasicView />
      <TextExamples />
      <ImageExamples />
      <ScrollViewExamples />
      <FlatListExamples />
      <TouchableOpacityExamples />
      <TextInputExamples />
    </ScrollView>
  );
}
```

### 5. Running the Application
```bash
npm start
# Open Expo Go app on your phone and scan QR code
```

### 6. Testing
- Test each component individually
- Try different features
- Observe performance
- Check responsive design

## Basic Components and Features

### 1. View - Container Component
```tsx
// View.js - Basic container component
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function BasicView() {
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box1: {
    width: 50,
    height: 50,
    backgroundColor: '#ff6b6b',
  },
  box2: {
    width: 50,
    height: 50,
    backgroundColor: '#4ecdc4',
  },
  box3: {
    width: 50,
    height: 50,
    backgroundColor: '#45b7d1',
  },
});
```

### 2. Text - Text Component
```tsx
// Text.js - Text styling and properties
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function TextExamples() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title Text</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>
        This is normal paragraph text. Text styling in React Native 
        is different from CSS and includes platform-specific features.
      </Text>
      <Text style={styles.link}>Clickable link</Text>
      <Text style={styles.error}>Error message</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 15,
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: '#DC3545',
    fontWeight: '500',
  },
});
```

### 3. Image - Image Component
```tsx
// Image.js - Image display and properties
import React from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ImageExamples() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/300/200' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Image
        source={{ uri: 'https://picsum.photos/200/200' }}
        style={styles.squareImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  squareImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
```

### 4. ScrollView - Scrollable Container
```tsx
// ScrollView.js - Scrollable content container
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function ScrollViewExamples() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {Array.from({ length: 20 }, (_, i) => (
        <View key={i} style={styles.item}>
          <Text style={styles.itemText}>Item {i + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
```

### 5. TouchableOpacity - Touchable Component
```tsx
// TouchableOpacity.js - Touchable component with opacity effect
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function TouchableOpacityExamples() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TouchableOpacity Examples</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count + 1)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Press Me ({count})</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => setCount(0)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#6C757D',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
```

### 6. TextInput - Text Input Component
```tsx
// TextInput.js - Text input component
import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

export default function TextInputExamples() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TextInput Examples</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={text}
        onChangeText={setText}
        autoCapitalize="words"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <Text style={styles.displayText}>
        Name: {text}
      </Text>
      <Text style={styles.displayText}>
        Email: {email}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  displayText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});
```

## Component Properties Summary

| Component | Key Properties | Usage |
|-----------|---------------|-------|
| View | style, onLayout | Container, layout |
| Text | style, numberOfLines | Text display |
| Image | source, style, resizeMode | Image display |
| ScrollView | contentContainerStyle, showsVerticalScrollIndicator | Scrollable content |
| TouchableOpacity | onPress, activeOpacity | Touchable elements |
| TextInput | value, onChangeText, placeholder | Text input |

## Best Practices

1. **Use StyleSheet.create()** for better performance
2. **Optimize images** with appropriate resizeMode
3. **Handle keyboard** with KeyboardAvoidingView
4. **Use FlatList** for large lists instead of ScrollView
5. **Test on both platforms** (iOS and Android)
