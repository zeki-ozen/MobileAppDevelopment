# React Native Props - Simple Guide

Props (Properties) are special features that allow us to transfer data between components in React Native.

## What are Props?

Props are the way to send data from one component to another. A component can customize another component by sending props to it.

## 📱 How to Use?

### 1. Project Creation
```bash
# Create Expo project
npx create-expo-app PropsExampleApp
cd PropsExampleApp
```

### 2. File Structure
```
PropsExampleApp/
├── App.js                 # Main application file
├── components/            # Components folder
│   ├── MessageExample.js
│   └── ButtonExample.js
└── package.json
```

### 3. Creating Component Files
1. Create `components` folder
2. Create `MessageExample.js` and `ButtonExample.js` files
3. Copy the codes below

### 4. Calling from App.js
```tsx
// App.js
import React from 'react';
import { View } from 'react-native';
import MessageExample from './components/MessageExample';
import ButtonExample from './components/ButtonExample';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <MessageExample />
      <ButtonExample />
    </View>
  );
}
```

### 5. Running the Application
```bash
npm start
# Open Expo Go app on your phone and scan QR code
```

## Basic Props Usage

### Example 1: Simple Message Component
```tsx
// MessageExample.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Message component - receives props
function Message({ title, message, color }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color }]}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

// Main component - sends props
export default function App() {
  return (
    <View style={styles.app}>
      <Message 
        title="Welcome" 
        message="You are learning React Native!" 
        color="#007AFF"
      />
      
      <Message 
        title="Success" 
        message="You learned props usage!" 
        color="#28A745"
      />
      
      <Message 
        title="Warning" 
        message="Props are read-only!" 
        color="#FFC107"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
});
```

## 📱 How to Use Example 2?

### 1. Creating ButtonExample.js File
1. Create `ButtonExample.js` file in `components` folder
2. Copy the code below

### 2. Updating App.js
```tsx
// App.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import MessageExample from './components/MessageExample';
import ButtonExample from './components/ButtonExample';

export default function App() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <MessageExample />
      <ButtonExample />
    </ScrollView>
  );
}
```

### 3. What Does This Example Do?
- **Customizable Button**: Creates buttons in different colors
- **Customization with Props**: Uses `title`, `color`, `onPress`, `disabled` props
- **Default Props**: Default values for color and disabled state
- **Dynamic Style**: Button color changes based on props

### 4. Testing
1. Run the app: `npm start`
2. Test different colored buttons
3. Check disabled button
4. See alert message when clicking each button

### 5. Customization Examples
```tsx
// Buttons in different colors
<CustomButton title="Save" color="#28A745" onPress={save} />
<CustomButton title="Delete" color="#DC3545" onPress={delete} />
<CustomButton title="Disabled" disabled={true} onPress={disabled} />
```

### Example 2: Button Component
```tsx
// ButtonExample.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// Customizable button component
function CustomButton({ title, onPress, color = '#007AFF', disabled = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? '#ccc' : color }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function ButtonExample() {
  const handlePress = () => {
    alert('Button clicked!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button Examples</Text>
      
      <CustomButton 
        title="Blue Button" 
        onPress={handlePress}
        color="#007AFF"
      />
      
      <CustomButton 
        title="Green Button" 
        onPress={handlePress}
        color="#28A745"
      />
      
      <CustomButton 
        title="Red Button" 
        onPress={handlePress}
        color="#DC3545"
      />
      
      <CustomButton 
        title="Disabled Button" 
        onPress={handlePress}
        color="#007AFF"
        disabled={true}
      />
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
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## Props Properties

### 1. Props are Read-Only
```tsx
// ChildComponent.js
function ChildComponent({ count }) {
  // ❌ ERROR: You cannot modify props
  // count = count + 1;
  
  // ✅ CORRECT: You can only read props
  return <Text>Counter: {count}</Text>;
}
```

### 2. Default Props
```tsx
// Greeting.js
function Greeting({ name = 'Guest', age = 0 }) {
  return (
    <Text>
      Hello {name}! Your age: {age}
    </Text>
  );
}

// Usage
<Greeting name="John" age={25} />  // Hello John! Your age: 25
<Greeting name="Jane" />           // Hello Jane! Your age: 0
<Greeting />                       // Hello Guest! Your age: 0
```

### 3. Sending Functions as Props
```tsx
// ParentChildExample.js
function ParentComponent() {
  const handleChildClick = (message) => {
    alert(`Message from child component: ${message}`);
  };

  return (
    <ChildComponent onButtonClick={handleChildClick} />
  );
}

function ChildComponent({ onButtonClick }) {
  return (
    <TouchableOpacity onPress={() => onButtonClick('Hello!')}>
      <Text>Click</Text>
    </TouchableOpacity>
  );
}
```

## Props vs State

| Props | State |
|-------|-------|
| Comes from outside | Created inside component |
| Read-only | Mutable |
| Passes from parent to child | Component manages its own state |
| Immutable (unchanging) | Mutable (changing) |

## Summary

- Props enable data transfer between components
- Props are read-only, cannot be modified
- You can provide default values
- You can also send functions as props
- Props make components reusable
