# 5. Lifecycle Methods and `useEffect` Hook

React components have a lifecycle, which is a series of methods that are invoked at different stages of a component's existence. Understanding these lifecycle methods is crucial for managing side effects, data fetching, and resource cleanup.

## 5.1 Lifecycle Methods (Class Components)

Class components have several lifecycle methods that you can override to run code at particular times.

*   **Mounting (Component Creation)**:
    *   `constructor()`: Called before the component is mounted. Used for initializing state and binding event handlers.
    *   `static getDerivedStateFromProps()`: Called before `render()` on both initial mount and subsequent updates. Used to update state based on props.
    *   `render()`: The only required method. Renders the component's JSX.
    *   `componentDidMount()`: Called after the component is mounted to the DOM. Ideal for data fetching, subscriptions, or direct DOM manipulations.

*   **Updating (Component Re-render)**:
    *   `static getDerivedStateFromProps()`: (Same as mounting)
    *   `shouldComponentUpdate()`: Allows you to optimize performance by preventing unnecessary re-renders.
    *   `render()`: (Same as mounting)
    *   `getSnapshotBeforeUpdate()`: Called right before the changes from the virtual DOM are about to be reflected in the actual DOM. Useful for capturing scroll position.
    *   `componentDidUpdate()`: Called after the component updates. Good for network requests after state/prop changes.

*   **Unmounting (Component Removal)**:
    *   `componentWillUnmount()`: Called just before the component is unmounted and destroyed. Used for cleanup (e.g., clearing timers, canceling network requests).

```jsx
// Example: Class Component Lifecycle
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. Constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null; // No state update from props
  }

  componentDidMount() {
    console.log('4. componentDidMount');
    // Data fetching or subscriptions here
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('5. shouldComponentUpdate');
    return true; // Allow re-render
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('7. componentDidUpdate');
    // Perform actions after update
  }

  componentWillUnmount() {
    console.log('8. componentWillUnmount');
    // Cleanup here
  }

  handleClick = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  render() {
    console.log('3/6. Render');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}
```

## 5.2 `useEffect` Hook (Functional Components)

For functional components, the `useEffect` Hook serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined. It lets you perform side effects in function components.

```jsx
// Example: useEffect Hook
import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  // Runs after every render (like componentDidMount and componentDidUpdate)
  useEffect(() => {
    console.log('Effect ran');
    document.title = `You clicked ${count} times`;

    // Cleanup function (like componentWillUnmount)
    return () => {
      console.log('Cleanup ran');
    };
  });

  // Runs only once after the initial render (like componentDidMount)
  useEffect(() => {
    console.log('Effect ran only once');
  }, []); // Empty dependency array

  // Runs when count changes (like componentDidUpdate for specific state/props)
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]); // Dependency array with 'count'

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

Understanding how to manage side effects and component lifecycles is crucial for building robust React applications.
