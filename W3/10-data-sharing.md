# 10. Data Sharing Between Components

In React, data flows from parent to child components through props. However, there are scenarios where you need to share data between components that are not directly related. React provides several patterns and tools to handle this.

## 10.1 Lifting State Up

When multiple components need to share the same state, you can "lift" the state up to their closest common ancestor. The ancestor component manages the state and passes it down to child components via props.

```jsx
// Example: Lifting State Up
import React, { useState } from 'react';

function TemperatureInput({ temperature, onTemperatureChange, scale }) {
  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input value={temperature} onChange={(e) => onTemperatureChange(e.target.value)} />
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

## 10.2 Context API

The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It's designed to share data that can be considered "global" for a tree of React components.

```jsx
// Example: Context API
import React, { createContext, useContext, useState } from 'react';

// Create a Context
const UserContext = createContext();

// Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'John Doe', age: 30 });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Consumer Component
function UserProfile() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

function UpdateUser() {
  const { setUser } = useContext(UserContext);

  const updateName = () => {
    setUser(prevUser => ({ ...prevUser, name: 'Jane Smith' }));
  };

  return <button onClick={updateName}>Update Name</button>;
}

// App Component
function App() {
  return (
    <UserProvider>
      <UserProfile />
      <UpdateUser />
    </UserProvider>
  );
}
```

## 10.3 Props Drilling

Props drilling refers to the process of passing data from a parent component down through multiple layers of child components. While this is a valid approach, it can become cumbersome when the component tree is deep. Context API is often used to avoid excessive props drilling.

```jsx
// Example: Props Drilling (Not recommended for deep hierarchies)
function GrandParent() {
  const [data, setData] = useState('Hello from GrandParent');
  return <Parent data={data} />;
}

function Parent({ data }) {
  return <Child data={data} />;
}

function Child({ data }) {
  return <GrandChild data={data} />;
}

function GrandChild({ data }) {
  return <p>{data}</p>;
}
```

## 10.4 State Management Libraries

For more complex applications, you might consider using state management libraries like **Redux**, **MobX**, or **Zustand**. These libraries provide more sophisticated tools for managing global state and are particularly useful in large-scale applications.

### Redux Example (Basic Setup)

```jsx
// Redux is a popular state management library
// Install: npm install redux react-redux

// actions.js
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });

// reducer.js
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default counterReducer;

// store.js
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);
export default store;

// App.js
import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { increment, decrement } from './actions';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

Understanding how to share data between components is crucial for building scalable and maintainable React applications.
