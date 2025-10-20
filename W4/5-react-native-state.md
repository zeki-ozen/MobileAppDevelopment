# React Native State - Simple Guide

State is used to store mutable data in React Native components. When state changes, the component re-renders.

## What is State?

State is data stored inside a component that can change over time. When state changes, the component automatically re-renders.

## 📱 How to Use?

### 1. Project Creation
```bash
# Create Expo project
npx create-expo-app StateExampleApp
cd StateExampleApp
```

### 2. File Structure
```
StateExampleApp/
├── App.js                 # Main application file
├── components/            # Components folder
│   ├── SimpleCounter.js
│   └── SimpleForm.js
└── package.json
```

### 3. Creating Component Files
1. Create `components` folder
2. Create `SimpleCounter.js` and `SimpleForm.js` files
3. Copy the codes below

### 4. Calling from App.js
```tsx
// App.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import SimpleCounter from './components/SimpleCounter';
import SimpleForm from './components/SimpleForm';

export default function App() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <SimpleCounter />
      <SimpleForm />
    </ScrollView>
  );
}
```

### 5. Running the Application
```bash
npm start
# Open Expo Go app on your phone and scan QR code
```

## State Management with useState Hook

### Example 1: Simple Counter
```tsx
// SimpleCounter.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SimpleCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Counter</Text>
      <Text style={styles.countText}>{count}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.resetButton} onPress={reset}>
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
    marginBottom: 20,
    color: '#333',
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 50,
    margin: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#DC3545',
    padding: 15,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

## 📱 How to Use Example 2?

### 1. Creating SimpleForm.js File
1. Create `SimpleForm.js` file in `components` folder
2. Copy the code below

### 2. Updating App.js
```tsx
// App.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import SimpleCounter from './components/SimpleCounter';
import SimpleForm from './components/SimpleForm';

export default function App() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <SimpleCounter />
      <SimpleForm />
    </ScrollView>
  );
}
```

### 3. What Does This Example Do?
- **Form Fields**: Name and email input
- **State Management**: Separate state for each field
- **Validation**: Empty field control
- **Submission Status**: Check if form is submitted
- **Alert Messages**: Success/error messages

### 4. Testing
1. Run the app: `npm start`
2. Write something in name field
3. Write something in email field
4. Press "Submit" button
5. See alert message
6. Clear form with "Reset" button

### 5. Validation Tests
- **Empty Form**: Press "Submit" without writing anything → Error message
- **Only Name**: Write only name and press "Submit" → Error message
- **Only Email**: Write only email and press "Submit" → Error message
- **Filled Form**: Fill both fields and press "Submit" → Success message

### Example 2: Form State Management
```tsx
// SimpleForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    setIsSubmitted(true);
    Alert.alert('Success', `Hello ${name}! Email: ${email}`);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setIsSubmitted(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Form</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      
      {isSubmitted && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Form submitted successfully!</Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
            <Text style={styles.buttonText}>New Form</Text>
          </TouchableOpacity>
        </View>
      )}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#6C757D',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    backgroundColor: '#d4edda',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c3e6cb',
  },
  successText: {
    color: '#155724',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});
```

## State Properties

### 1. Re-render When State Changes
```tsx
// Counter.js
function Counter() {
  const [count, setCount] = useState(0);
  
  // This component re-renders when count changes
  return <Text>Counter: {count}</Text>;
}
```

### 2. State Update
```tsx
// StateUpdateExample.js
// ❌ WRONG - Directly modifying state
count = count + 1;

// ✅ CORRECT - Use setState function
setCount(count + 1);

// ✅ BETTER - Use previous value
setCount(prevCount => prevCount + 1);
```

### 3. Multiple States
```tsx
// UserProfile.js
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Each state is managed separately
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Age: {age}</Text>
      <Text>Active: {isActive ? 'Yes' : 'No'}</Text>
    </View>
  );
}
```

## State vs Props

| State | Props |
|-------|-------|
| Created inside component | Comes from outside |
| Mutable | Read-only |
| Updated with setState | Controlled by parent |
| Component's own data | Data from another component |

## Summary

- State stores mutable data of the component
- State is created with `useState` hook
- Component re-renders when state changes
- Don't modify state directly, use setState
- Each state is managed separately
