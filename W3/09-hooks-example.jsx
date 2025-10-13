import React, { useState, useEffect, useContext, useReducer, useRef } from 'react';

// 1. useState Example
function CounterWithState() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// 2. useEffect Example
function DocumentTitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

// 3. useContext Example
const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
      Themed Button ({theme})
    </button>
  );
}

// 4. useReducer Example
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

function CounterWithReducer() {
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

// 5. useRef Example
function FocusInput() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <div>
      <input ref={inputEl} type="text" placeholder="Click button to focus" />
      <button onClick={onButtonClick}>Focus Input</button>
    </div>
  );
}

// App Component
function App() {
  return (
    <div>
      <h2>useState Example</h2>
      <CounterWithState />
      
      <h2>useEffect Example</h2>
      <DocumentTitleUpdater />
      
      <h2>useContext Example</h2>
      <ThemeContext.Provider value="dark">
        <ThemedButton />
      </ThemeContext.Provider>
      
      <h2>useReducer Example</h2>
      <CounterWithReducer />
      
      <h2>useRef Example</h2>
      <FocusInput />
    </div>
  );
}

export default App;

