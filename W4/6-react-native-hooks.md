# React Native Hooks - Simple Guide

In React Native, Hooks are special functions that allow us to use state and lifecycle features in function components.

## What are Hooks?

Hooks are functions that allow us to use "state" and other React features in React function components. We can manage state without needing class components.

## 📱 How to Use?

### 1. Project Creation
```bash
# Create Expo project
npx create-expo-app HooksExampleApp
cd HooksExampleApp
```

### 2. File Structure
```
HooksExampleApp/
├── App.js                 # Main application file
├── components/            # Components folder
│   ├── Counter.js
│   ├── TextInputExample.js
│   ├── WelcomeMessage.js
│   └── Timer.js
└── package.json
```

### 3. Creating Component Files
1. Create `components` folder
2. Create separate file for each hook example
3. Copy the codes below

### 4. Calling from App.js
```tsx
// App.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import Counter from './components/Counter';
import TextInputExample from './components/TextInputExample';
import WelcomeMessage from './components/WelcomeMessage';
import Timer from './components/Timer';

export default function App() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Counter />
      <TextInputExample />
      <WelcomeMessage />
      <Timer />
    </ScrollView>
  );
}
```

### 5. Running the Application
```bash
npm start
# Open Expo Go app on your phone and scan QR code
```

## Basic Hooks

### 1. useState Hook

The `useState` hook allows us to manage state (condition) in the component.

#### Example 1: Simple Counter
```tsx
// Counter.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Counter: {count}</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCount(count - 1)}
      >
        <Text style={styles.buttonText}>Decrement</Text>
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
  countText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## 📱 How to Use Example 2?

### 1. Creating TextInputExample.js File
1. Create `TextInputExample.js` file in `components` folder
2. Copy the code below

### 2. What Does This Example Do?
- **Text Input**: Gets text from user with TextInput
- **Real-time Update**: Written text appears instantly
- **useState Hook**: Manages text state
- **Simple Interface**: Clean and understandable design

### 3. Testing
1. Run the app: `npm start`
2. Write something in text field
3. Your written text appears instantly below
4. Delete text and write again
5. Try different texts

### 4. Features
- **Placeholder**: "Write something..." hint text
- **Real-time**: Updates on every character change
- **Clearing**: You can clear the text field

#### Example 2: Text Input
```tsx
// TextInputExample.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function TextInputExample() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text Input</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Write something..."
        value={text}
        onChangeText={setText}
      />
      
      <Text style={styles.displayText}>
        You wrote: {text}
      </Text>
      
      <Text style={styles.countText}>
        Character count: {text.length}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  countText: {
    fontSize: 14,
    color: '#666',
  },
});
```

## 📱 How to Use useEffect Example 1?

### 1. Creating WelcomeMessage.js File
1. Create `WelcomeMessage.js` file in `components` folder
2. Copy the code below

### 2. What Does This Example Do?
- **Delayed Message**: Shows "Welcome!" message after 2 seconds
- **useEffect Hook**: Runs when component loads
- **setTimeout**: Delay effect
- **State Update**: Changes message dynamically

### 3. Testing
1. Run the app: `npm start`
2. See "Loading..." text initially
3. Wait 2 seconds
4. "Welcome!" message appears
5. Check console (console.log messages)

### 4. Features
- **Empty Dependency Array**: `[]` - runs only once
- **Cleanup Function**: Runs when component is removed
- **Console Log**: Messages in developer console

### 2. useEffect Hook

The `useEffect` hook allows us to write code that runs when the component mounts, updates, or unmounts.

#### Example 1: Message on Page Load
```tsx
// WelcomeMessage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeMessage() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // Runs when component first loads
    setTimeout(() => {
      setMessage('Welcome!');
    }, 2000);
  }, []); // Empty array = runs only on first load

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
```

## 📱 How to Use useEffect Example 2?

### 1. Creating Timer.js File
1. Create `Timer.js` file in `components` folder
2. Copy the code below

### 2. What Does This Example Do?
- **Timer**: Start/stop/reset buttons
- **Real-time Counting**: Counter that increases every second
- **useEffect Hook**: Timer management with setInterval
- **Cleanup**: Clears interval when component is removed

### 3. Testing
1. Run the app: `npm start`
2. Press "Start" button
3. Watch seconds increase
4. Press "Stop" button
5. Return to start with "Reset" button

### 4. Features
- **Start/Stop**: Controls the timer
- **Reset**: Returns counter to 0
- **Automatic Cleanup**: Prevents memory leaks
- **State Management**: Control with isRunning state

### 5. Test Scenarios
- **Normal Usage**: Start → Stop → Reset
- **Long Duration**: Run timer for a long time
- **Quick Control**: Change Start/Stop quickly

#### Example 2: Timer
```tsx
// Timer.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{seconds} seconds</Text>
      
      <TouchableOpacity 
        style={[styles.button, styles.startButton]} 
        onPress={startTimer}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.stopButton]} 
        onPress={stopTimer}
      >
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.resetButton]} 
        onPress={resetTimer}
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
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    margin: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#28A745',
  },
  stopButton: {
    backgroundColor: '#DC3545',
  },
  resetButton: {
    backgroundColor: '#6C757D',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## Hook Rules

1. **Use hooks only in function components**
2. **Always call hooks at the top level of the component**
3. **Don't call hooks inside conditions, loops, or nested functions**

## Summary

- `useState`: For state management in components
- `useEffect`: For side effects (API calls, timers)
- Hooks make function components powerful
- We can manage state without needing class components
