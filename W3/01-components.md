# 1. Components

React applications are built from small, isolated, and reusable pieces of code called components. Components allow you to split the UI into independent, reusable pieces, and think about each piece in isolation.

There are two main types of components in React:

## 1.1 Functional Components

Functional components are JavaScript functions that return JSX. They are simpler to write and understand, especially with the introduction of Hooks in React 16.8.

```jsx
// Example: Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage:
// <Welcome name="Sara" />
```

## 1.2 Class Components

Class components are ES6 classes that extend `React.Component` and have a `render()` method that returns JSX. Before Hooks, class components were primarily used for managing state and lifecycle methods.

```jsx
// Example: Class Component
import React from 'react';

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// Usage:
// <Welcome name="Sara" />
```

## When to use which?

## 1.3 Component Composition

Components can be composed together to create more complex UIs. This is one of React's most powerful features.

```jsx
// Example: Component Composition
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

function CardHeader({ title }) {
  return (
    <div className="card-header">
      <h3>{title}</h3>
    </div>
  );
}

function CardBody({ content }) {
  return (
    <div className="card-body">
      <p>{content}</p>
    </div>
  );
}

// Usage: Composing components
function UserProfile() {
  return (
    <Card>
      <CardHeader title="User Profile" />
      <CardBody content="This is the user profile content." />
    </Card>
  );
}
```

## 1.4 Component Reusability

One of the main benefits of components is reusability. The same component can be used in different parts of your application with different props.

```jsx
// Example: Reusable Button Component
function Button({ text, onClick, variant = 'primary' }) {
  const baseClasses = 'px-4 py-2 rounded font-medium';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// Usage: Same component, different props
function App() {
  return (
    <div>
      <Button text="Save" onClick={() => console.log('Saved')} />
      <Button text="Cancel" variant="secondary" onClick={() => console.log('Cancelled')} />
      <Button text="Delete" variant="danger" onClick={() => console.log('Deleted')} />
    </div>
  );
}
```

## 1.5 Component Lifecycle Overview

Understanding when components are created, updated, and destroyed helps in writing better React code.

- **Mounting**: Component is created and inserted into the DOM
- **Updating**: Component re-renders due to state or prop changes
- **Unmounting**: Component is removed from the DOM

With the advent of Hooks, functional components are generally preferred as they offer a more concise and readable way to write components, and can now manage state and side effects. Class components are still valid but are less common in new React projects.

