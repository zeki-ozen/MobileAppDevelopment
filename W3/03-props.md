# 3. Props (Properties)

**Props** is a special keyword in React that stands for properties. It is used for passing data from one component to another. Props are read-only, meaning that a component receiving props cannot modify them. This ensures a unidirectional data flow and helps in creating predictable applications.

## 3.1 Passing Props

You pass props to components using attributes, similar to how you pass attributes to HTML elements.

```jsx
// Parent Component
function App() {
  return <Welcome name="Alice" />;
}

// Child Component (Welcome.js)
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## 3.2 Reading Props

Inside a functional component, props are received as the first argument to the function. In a class component, props are available via `this.props`.

```jsx
// Functional Component
function Greeting(props) {
  return <p>Welcome, {props.userName}!</p>;
}

// Class Component
import React from 'react';

class UserProfile extends React.Component {
  render() {
    return <p>User ID: {this.props.userId}</p>;
  }
}
```

## 3.3 Destructuring Props

For functional components, you can use JavaScript object destructuring to make accessing props more concise.

```jsx
// Functional Component with Destructuring
function Greeting({ userName }) {
  return <p>Welcome, {userName}!</p>;
}

// Usage:
// <Greeting userName="Bob" />
```

## 3.4 Default Props

You can define default values for props, which will be used if a prop is not explicitly passed to the component.

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}

Button.defaultProps = {
  text: 'Click Me'
};

// Usage:
// <Button /> // Renders a button with 'Click Me'
// <Button text="Submit" /> // Renders a button with 'Submit'
```

## 3.5 `children` Prop

Components can receive arbitrary children. These children are passed as a special `children` prop.

```jsx
function Card(props) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}

// Usage:
// <Card>
//   <h2>Card Title</h2>
//   <p>Some content inside the card.</p>
// </Card>
```

Props are fundamental to React's component-based architecture, enabling data flow and reusability across your application.
