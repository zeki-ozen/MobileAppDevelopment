# 4. State

**State** is a built-in React object that is used to contain data or information about the component. A component's state can change over time, and when it does, React re-renders the component to reflect the updated state. State is mutable, unlike props, and is managed within the component itself.

## 4.1 `useState` Hook (Functional Components)

In functional components, the `useState` Hook is used to add state to function components. It returns a pair: the current state value and a function that lets you update it.

```jsx
// Example: useState Hook
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Initialize count to 0

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 4.2 State in Class Components

In class components, state is managed using `this.state` and updated using `this.setState()`.

```jsx
// Example: State in Class Component
import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

## 4.3 Immutability of State

When updating state, especially with objects or arrays, it's crucial to treat state as immutable. Instead of directly modifying the existing state, you should create a new object or array with the desired changes and then update the state with the new one.

```jsx
// Incorrect way to update an object in state
// this.state.user.age = 31; // DON'T DO THIS
// this.setState({ user: this.state.user });

// Correct way to update an object in state
this.setState(prevState => ({
  user: { ...prevState.user, age: 31 }
}));

// Correct way to update an array in state
this.setState(prevState => ({
  items: [...prevState.items, newItem]
}));
```

## 4.4 State Update Patterns

There are several patterns for updating state, each with its own use case:

### Pattern 1: Direct State Update
```jsx
// For simple values
const [count, setCount] = useState(0);
setCount(count + 1);
```

### Pattern 2: Functional State Update
```jsx
// When new state depends on previous state
const [count, setCount] = useState(0);
setCount(prevCount => prevCount + 1);
```

### Pattern 3: Object State Update
```jsx
const [user, setUser] = useState({ name: '', email: '' });

// Update specific property
setUser(prevUser => ({
  ...prevUser,
  name: 'John Doe'
}));
```

### Pattern 4: Array State Update
```jsx
const [items, setItems] = useState([]);

// Add item
setItems(prevItems => [...prevItems, newItem]);

// Remove item
setItems(prevItems => prevItems.filter(item => item.id !== itemId));

// Update item
setItems(prevItems => 
  prevItems.map(item => 
    item.id === itemId ? { ...item, completed: true } : item
  )
);
```

## 4.5 State Lifting

When multiple components need to share the same state, you should lift the state up to their closest common ancestor.

```jsx
// Example: Lifting State Up
function TemperatureInput({ temperature, onTemperatureChange, scale }) {
  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input 
        value={temperature} 
        onChange={(e) => onTemperatureChange(e.target.value)} 
      />
    </fieldset>
  );
}

function Calculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  const handleCelsiusChange = (temp) => {
    setScale('c');
    setTemperature(temp);
  };

  const handleFahrenheitChange = (temp) => {
    setScale('f');
    setTemperature(temp);
  };

  const celsius = scale === 'f' ? ((temperature - 32) * 5) / 9 : temperature;
  const fahrenheit = scale === 'c' ? (temperature * 9) / 5 + 32 : temperature;

  return (
    <div>
      <TemperatureInput
        scale="Celsius"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="Fahrenheit"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
    </div>
  );
}
```

## 4.6 State vs Props

Understanding the difference between state and props is crucial:

| State | Props |
|-------|-------|
| Managed within the component | Passed from parent component |
| Can be changed by the component | Read-only |
| Causes re-render when changed | Causes re-render when changed |
| Used for component's internal data | Used for communication between components |

```jsx
// Example: State vs Props
function UserProfile({ userName, userAge }) { // Props
  const [isOnline, setIsOnline] = useState(false); // State
  
  return (
    <div>
      <h2>{userName} ({userAge} years old)</h2>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
      <button onClick={() => setIsOnline(!isOnline)}>
        Toggle Status
      </button>
    </div>
  );
}
```

Understanding state management is crucial for building dynamic and interactive React applications.
