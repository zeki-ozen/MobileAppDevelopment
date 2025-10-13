# 9. React Hooks

Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 and have become the preferred way to write React components.

## 9.1 `useState` Hook

The `useState` Hook allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it.

```jsx
// Example: useState
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

## 9.2 `useEffect` Hook

The `useEffect` Hook lets you perform side effects in functional components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.

```jsx
// Example: useEffect
import React, { useState, useEffect } from 'react';

function DocumentTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update document title
    document.title = `You clicked ${count} times`;
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## 9.3 `useContext` Hook

The `useContext` Hook allows you to consume context values without wrapping your component in a `Context.Consumer`.

```jsx
// Example: useContext
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am styled by theme context!</button>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}
```

## 9.4 `useReducer` Hook

The `useReducer` Hook is an alternative to `useState` for managing more complex state logic. It accepts a reducer function and an initial state, and returns the current state and a dispatch function.

```jsx
// Example: useReducer
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

## 9.5 `useRef` Hook

The `useRef` Hook returns a mutable ref object whose `.current` property is initialized to the passed argument. The returned object will persist for the full lifetime of the component. It's commonly used to access DOM elements directly.

```jsx
// Example: useRef
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };

  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </div>
  );
}
```

## 9.6 `useMemo` Hook

The `useMemo` Hook is used to memoize expensive calculations so they are only recomputed when their dependencies change. This can help optimize performance.

```jsx
// Example: useMemo
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ num }) {
  const expensiveResult = useMemo(() => {
    console.log('Computing expensive result...');
    return num * 2;
  }, [num]); // Only recompute when num changes

  return <div>Result: {expensiveResult}</div>;
}
```

## 9.7 `useCallback` Hook

The `useCallback` Hook returns a memoized callback function. It's useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.

```jsx
// Example: useCallback
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // The function is created only once

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Click me (Child)</button>;
}
```

## Rules of Hooks

1. **Only call Hooks at the top level**: Don't call Hooks inside loops, conditions, or nested functions.
2. **Only call Hooks from React functions**: Call Hooks from functional components or custom Hooks, not from regular JavaScript functions.

## 9.8 Custom Hooks

Custom hooks allow you to extract component logic into reusable functions. They must start with "use" and can call other hooks.

```jsx
// Example: Custom Hook
import { useState, useEffect } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Using the custom hook
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## 9.9 useLayoutEffect Hook

`useLayoutEffect` is similar to `useEffect`, but it runs synchronously after all DOM mutations. Use it when you need to measure DOM elements or perform DOM mutations.

```jsx
// Example: useLayoutEffect
import { useState, useLayoutEffect, useRef } from 'react';

function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 40,
        left: rect.left + rect.width / 2
      });
    }
  }, [text]);

  return (
    <div ref={tooltipRef} style={{ position: 'relative' }}>
      {children}
      <div 
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          background: 'black',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px'
        }}
      >
        {text}
      </div>
    </div>
  );
}
```

## 9.10 useImperativeHandle Hook

`useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`.

```jsx
// Example: useImperativeHandle
import { forwardRef, useImperativeHandle, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} {...props} />;
});

function App() {
  const fancyInputRef = useRef();

  const handleFocus = () => {
    fancyInputRef.current.focus();
  };

  const handleClear = () => {
    fancyInputRef.current.clear();
  };

  return (
    <div>
      <FancyInput ref={fancyInputRef} placeholder="Type something..." />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleClear}>Clear Input</button>
    </div>
  );
}
```

## 9.11 Hook Dependencies and Optimization

Understanding dependency arrays is crucial for optimizing your React components:

```jsx
// Example: Dependency Array Optimization
function ExpensiveComponent({ userId, filter }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Only fetch user when userId changes
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // Only fetch posts when userId or filter changes
  useEffect(() => {
    fetchPosts(userId, filter).then(setPosts);
  }, [userId, filter]);

  // Memoize expensive calculation
  const filteredPosts = useMemo(() => {
    return posts.filter(post => post.category === filter);
  }, [posts, filter]);

  // Memoize callback to prevent unnecessary re-renders
  const handlePostClick = useCallback((postId) => {
    console.log('Post clicked:', postId);
  }, []);

  return (
    <div>
      {user && <h1>{user.name}</h1>}
      {filteredPosts.map(post => (
        <div key={post.id} onClick={() => handlePostClick(post.id)}>
          {post.title}
        </div>
      ))}
    </div>
  );
}
```

## 9.12 Common Hook Patterns

Here are some common patterns when working with hooks:

### Pattern 1: Data Fetching
```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
```

### Pattern 2: Local Storage
```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

Hooks provide a powerful and flexible way to manage state and side effects in React functional components.
