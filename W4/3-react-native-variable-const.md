# React Native Variables and Constants - Simple Guide

In React Native, we use JavaScript's variable and constant declaration methods. In this guide, we'll see the differences between `var`, `let`, `const` and usage examples.

## What are Variables and Constants?

Variables and constants are names we use to store data. In JavaScript, we can declare them in three different ways.

## Declaration Methods

### 1. var - Old Method
```javascript
// variables.js
var name = "John";
var age = 25;
var isStudent = true;
```

### 2. let - Mutable Variable
```javascript
// variables.js
let name = "John";
let age = 25;
let isStudent = true;
```

### 3. const - Constant (Immutable)
```javascript
// constants.js
const name = "John";
const age = 25;
const isStudent = true;
```

## Basic Differences

| Feature | var | let | const |
|---------|-----|-----|-------|
| Redeclarable | ✅ | ❌ | ❌ |
| Reassignable | ✅ | ✅ | ❌ |
| Scope | Function | Block | Block |
| Hoisting | ✅ | ❌ | ❌ |

## 📱 How to Use?

### 1. Project Creation
```bash
# Create Expo project
npx create-expo-app VariableExampleApp
cd VariableExampleApp

# Or with React Native CLI
npx react-native init VariableExampleApp
cd VariableExampleApp
```

### 2. File Structure
```
VariableExampleApp/
├── App.js                 # Main application file
├── components/            # Components folder
│   ├── VariableExample.js
│   └── DynamicVariableExample.js
└── package.json
```

### 3. Creating VariableExample.js File
1. Create `components` folder
2. Create `VariableExample.js` file
3. Copy the code below

### 4. Calling from App.js
```tsx
// App.js
import React from 'react';
import { View } from 'react-native';
import VariableExample from './components/VariableExample';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <VariableExample />
    </View>
  );
}
```

### 5. Running the Application
```bash
# With Expo
npm start
# Open Expo Go app on your phone and scan QR code

# With React Native CLI
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS
```

## Example 1: Simple Variable Usage
```tsx
// VariableExample.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VariableExample() {
  // Declaring constants with const
  const appName = "React Native Application";
  const version = "1.0.0";
  
  // Declaring variables with let
  let userCount = 0;
  let isOnline = true;
  
  // Updating variables (only with let)
  userCount = userCount + 1;
  isOnline = false;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Variable Example</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.label}>App Name:</Text>
        <Text style={styles.value}>{appName}</Text>
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.label}>Version:</Text>
        <Text style={styles.value}>{version}</Text>
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.label}>User Count:</Text>
        <Text style={styles.value}>{userCount}</Text>
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.label}>Online:</Text>
        <Text style={styles.value}>{isOnline ? 'Yes' : 'No'}</Text>
      </View>
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
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
```

## 📱 How to Use Example 2?

### 1. Creating DynamicVariableExample.js File
1. Create `DynamicVariableExample.js` file in `components` folder
2. Copy the code below

### 2. Updating App.js
```tsx
// App.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import VariableExample from './components/VariableExample';
import DynamicVariableExample from './components/DynamicVariableExample';

export default function App() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <VariableExample />
      <DynamicVariableExample />
    </ScrollView>
  );
}
```

### 3. What Does This Example Do?
- **Counter**: Counts from 0 to 10
- **Smart Buttons**: Buttons become disabled when reaching max/min values
- **Progress Indicator**: Shows progress as percentage
- **Dynamic Messages**: Shows different messages based on state

### 4. Testing
1. Run the app: `npm start`
2. Press "+" button to increment the number
3. Press "-" button to decrement the number
4. See the message when reaching maximum value
5. Return to start with "Reset" button

## Example 2: Dynamic Variable Usage
```tsx
// DynamicVariableExample.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DynamicVariableExample() {
  const [count, setCount] = useState(0);
  
  // Constant values
  const maxCount = 10;
  const minCount = 0;
  const stepSize = 1;
  
  // Dynamic values (with state)
  let currentCount = count;
  let canIncrement = currentCount < maxCount;
  let canDecrement = currentCount > minCount;
  
  // Calculated values
  const progress = (currentCount / maxCount) * 100;
  const isComplete = currentCount === maxCount;
  
  const increment = () => {
    if (canIncrement) {
      setCount(currentCount + stepSize);
    }
  };
  
  const decrement = () => {
    if (canDecrement) {
      setCount(currentCount - stepSize);
    }
  };
  
  const reset = () => {
    setCount(minCount);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dynamic Variable Example</Text>
      
      <View style={styles.counterBox}>
        <Text style={styles.countText}>{currentCount}</Text>
        <Text style={styles.progressText}>Progress: %{progress.toFixed(0)}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, !canDecrement && styles.disabledButton]} 
          onPress={decrement}
          disabled={!canDecrement}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, !canIncrement && styles.disabledButton]} 
          onPress={increment}
          disabled={!canIncrement}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      
      {isComplete && (
        <Text style={styles.completeText}>🎉 You reached maximum value!</Text>
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Maximum: {maxCount}</Text>
        <Text style={styles.infoText}>Minimum: {minCount}</Text>
        <Text style={styles.infoText}>Step: {stepSize}</Text>
      </View>
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
  counterBox: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#1976d2',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
  resetButton: {
    backgroundColor: '#DC3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  completeText: {
    fontSize: 18,
    color: '#28A745',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
```

## Scope Example

```javascript
// scope-example.js
// Global scope
const globalVar = "Global variable";

function exampleFunction() {
  // Function scope
  var functionVar = "Function variable";
  
  if (true) {
    // Block scope
    let blockVar = "Block variable";
    const blockConst = "Block constant";
    
    console.log(globalVar);    // ✅ Works
    console.log(functionVar); // ✅ Works
    console.log(blockVar);    // ✅ Works
    console.log(blockConst);  // ✅ Works
  }
  
  console.log(globalVar);    // ✅ Works
  console.log(functionVar); // ✅ Works
  console.log(blockVar);    // ❌ Error!
  console.log(blockConst);  // ❌ Error!
}
```

## Best Practices

### 1. Prefer Using const
```javascript
// ✅ GOOD
const userName = "John";
const userAge = 25;

// ❌ BAD
var userName = "John";
var userAge = 25;
```

### 2. Use Meaningful Variable Names
```javascript
// ✅ GOOD
const maxRetryCount = 3;
const isUserLoggedIn = true;

// ❌ BAD
const x = 3;
const flag = true;
```

### 3. Declare Variables at the Beginning
```javascript
// ✅ GOOD
const userName = "John";
const userAge = 25;
const isStudent = true;

// ❌ BAD
let userName;
let userAge;
let isStudent;
```

## Summary

- **const**: Use for values that won't change
- **let**: Use for mutable values
- **var**: Don't use (old method)
- **Scope**: const and let have block scope
- **Naming**: Use meaningful names
- **Declaration**: Declare variables at the beginning
