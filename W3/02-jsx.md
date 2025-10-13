# 2. JSX (JavaScript XML)

JSX stands for JavaScript XML. It is a syntax extension for JavaScript, recommended by React, that allows you to write HTML-like code directly within your JavaScript files. JSX makes it easier to write and add HTML in React.

## 2.1 Why JSX?

React embraces the idea that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display. Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called "components" that contain both.

## 2.2 Basic Syntax

```jsx
// Example: Basic JSX
const element = <h1>Hello, React!</h1>;
```

## 2.3 Embedding Expressions in JSX

You can embed any JavaScript expression within JSX by enclosing it in curly braces `{}`.

```jsx
// Example: Embedding Expressions
const name = 'World';
const element = <h1>Hello, {name}</h1>;

function formatUser(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const greeting = (
  <h1>
    Hello, {formatUser(user)}!
  </h1>
);
```

## 2.4 JSX is an Expression Too

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects. This means you can use JSX inside `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions.

```jsx
// Example: JSX as an Expression
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatUser(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## 2.5 JSX Attributes

You can specify attributes with JSX. When you need to embed a JavaScript expression as an attribute value, wrap the expression in curly braces instead of quotes.

```jsx
// Example: JSX Attributes
const imageUrl = 'https://example.com/logo.png';
const element = <img src={imageUrl} alt="Company Logo" />;
```

**Note**: Since JSX is closer to JavaScript than HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names. For example, `class` becomes `className`, and `for` becomes `htmlFor`.

## 2.6 JSX Rules and Best Practices

When writing JSX, there are several important rules to follow:

### Rule 1: Return a Single Root Element
```jsx
// Incorrect - Multiple root elements
function App() {
  return (
    <h1>Hello</h1>
    <p>World</p>
  );
}

// Correct - Single root element
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>World</p>
    </div>
  );
}

// Or use React Fragment
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>World</p>
    </>
  );
}
```

### Rule 2: Use className Instead of class
```jsx
// Incorrect
<div class="container">Content</div>

// Correct
<div className="container">Content</div>
```

### Rule 3: Self-closing Tags Must Have a Slash
```jsx
// Incorrect
<img src="image.jpg" alt="Description">

// Correct
<img src="image.jpg" alt="Description" />
```

### Rule 4: JavaScript Expressions in Curly Braces
```jsx
function Greeting({ name, age }) {
  const isAdult = age >= 18;
  
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      <p>Status: {isAdult ? 'Adult' : 'Minor'}</p>
      <p>Next year you will be {age + 1} years old.</p>
    </div>
  );
}
```

## 2.7 Conditional Rendering in JSX

You can conditionally render elements using JavaScript expressions:

```jsx
function UserProfile({ user, showDetails }) {
  return (
    <div>
      <h2>{user.name}</h2>
      {showDetails && (
        <div>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
      {user.isAdmin ? (
        <button>Admin Panel</button>
      ) : (
        <button>View Profile</button>
      )}
    </div>
  );
}
```

## 2.8 Lists in JSX

When rendering lists, always provide a unique `key` prop:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text} - {todo.completed ? 'Done' : 'Pending'}
        </li>
      ))}
    </ul>
  );
}
```

