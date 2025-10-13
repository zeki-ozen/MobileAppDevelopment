# 0. React Fundamentals

React is a JavaScript library for building user interfaces, particularly web applications. It was created by Facebook and is now maintained by Meta and the community. React makes it easy to create interactive UIs by breaking them into small, reusable components.

## 0.1 What is React?

React is a **declarative**, **component-based**, and **learn once, write anywhere** library for building user interfaces. It allows you to build complex UIs from small, isolated pieces of code called components.

### Key Characteristics:
- **Declarative**: You describe what the UI should look like for any given state, and React efficiently updates and renders the right components when data changes.
- **Component-Based**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Learn Once, Write Anywhere**: You can develop new features in React without rewriting existing code.

## 0.2 Why Use React?

### Advantages:
- **Virtual DOM**: React uses a virtual DOM to improve performance by minimizing direct DOM manipulation.
- **Component Reusability**: Write once, use anywhere in your application.
- **Unidirectional Data Flow**: Data flows in one direction, making it easier to understand and debug.
- **Rich Ecosystem**: Large community and extensive third-party library support.
- **Developer Tools**: Excellent debugging tools and browser extensions.
- **Mobile Development**: React Native allows you to build mobile apps using React.

### When to Use React:
- Building single-page applications (SPAs)
- Creating reusable UI components
- Developing complex, interactive user interfaces
- Building applications that require frequent data updates
- Working on projects that need to scale

## 0.3 React Naming Conventions

Understanding React's naming conventions is crucial for writing clean, maintainable code.

### Component Naming
```jsx
// ✅ Correct: Components start with uppercase letter
function UserProfile() {
  return <div>User Profile</div>;
}

// ✅ Correct: Class components also start with uppercase
class UserProfile extends React.Component {
  render() {
    return <div>User Profile</div>;
  }
}

// ❌ Incorrect: Components starting with lowercase
function userProfile() {
  return <div>User Profile</div>;
}
```

### File Naming
```jsx
// ✅ Correct: Component files use PascalCase
UserProfile.js
UserProfile.jsx
UserProfile.tsx

// ✅ Correct: Hook files start with 'use'
useUserData.js
useLocalStorage.js

// ✅ Correct: Utility files use camelCase
formatDate.js
apiClient.js
```

### Variable and Function Naming
```jsx
// ✅ Correct: camelCase for variables and functions
const userName = 'John';
const isLoggedIn = true;
const handleClick = () => {};

// ✅ Correct: PascalCase for components
const UserCard = () => {};

// ✅ Correct: UPPER_CASE for constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
```

## 0.4 JSX Syntax Rules

JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like code in JavaScript.

### Basic Rules:
```jsx
// ✅ Correct: Self-closing tags must have a slash
<img src="image.jpg" alt="Description" />
<br />
<input type="text" />

// ❌ Incorrect: Missing slash in self-closing tags
<img src="image.jpg" alt="Description">
<br>
<input type="text">
```

### Attribute Naming:
```jsx
// ✅ Correct: Use camelCase for attributes
<div className="container">
  <label htmlFor="username">Username</label>
  <input 
    type="text" 
    id="username" 
    tabIndex={1}
    autoFocus={true}
  />
</div>

// ❌ Incorrect: HTML attribute names
<div class="container">
  <label for="username">Username</label>
  <input 
    type="text" 
    id="username" 
    tabindex="1"
    autofocus="true"
  />
</div>
```

### JavaScript Expressions:
```jsx
// ✅ Correct: Use curly braces for JavaScript expressions
const name = 'John';
const age = 25;

function Greeting() {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      <p>Next year you will be {age + 1} years old.</p>
    </div>
  );
}
```

## 0.5 Component Structure

### Functional Component Structure:
```jsx
// 1. Imports
import React from 'react';
import PropTypes from 'prop-types';

// 2. Component definition
function UserCard({ user, onEdit, onDelete }) {
  // 3. Hooks (if any)
  const [isEditing, setIsEditing] = React.useState(false);
  
  // 4. Event handlers
  const handleEdit = () => {
    setIsEditing(true);
    onEdit(user.id);
  };
  
  const handleDelete = () => {
    onDelete(user.id);
  };
  
  // 5. Render
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

// 6. PropTypes (optional but recommended)
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// 7. Default props (optional)
UserCard.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

// 8. Export
export default UserCard;
```

## 0.6 Props and State

### Props (Properties)
Props are read-only data passed from parent to child components.

```jsx
// Parent component
function App() {
  const user = { name: 'John', age: 25 };
  
  return (
    <div>
      <UserProfile user={user} />
      <UserSettings theme="dark" />
    </div>
  );
}

// Child component
function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
}
```

### State
State is data that belongs to a component and can change over time.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## 0.7 Event Handling

React uses camelCase for event names and passes functions as event handlers.

```jsx
function Button() {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('Button clicked!');
  };
  
  const handleMouseOver = () => {
    console.log('Mouse over button');
  };
  
  return (
    <button 
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      Click me
    </button>
  );
}
```

## 0.8 Conditional Rendering

React allows you to conditionally render components based on state or props.

```jsx
function UserGreeting({ isLoggedIn, username }) {
  // Method 1: if statement
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  }
  return <h1>Please log in.</h1>;
}

// Method 2: Ternary operator
function LoginButton({ isLoggedIn }) {
  return (
    <button>
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
}

// Method 3: Logical AND operator
function Notification({ message }) {
  return (
    <div>
      {message && <div className="notification">{message}</div>}
    </div>
  );
}
```

## 0.9 Lists and Keys

When rendering lists, always provide a unique `key` prop for each item.

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ❌ Incorrect: Using array index as key
{todos.map((todo, index) => (
  <li key={index}>{todo.text}</li>
))}

// ✅ Correct: Using unique identifier
{todos.map(todo => (
  <li key={todo.id}>{todo.text}</li>
))}
```

## 0.10 React Developer Tools

The React Developer Tools browser extension is essential for debugging React applications.

### Installation:
- **Chrome**: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- **Firefox**: [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### Features:
- **Component Tree**: View the component hierarchy
- **Props and State**: Inspect component props and state
- **Profiler**: Analyze component performance
- **Hooks**: Debug React Hooks

## 0.11 Common Patterns

### Container and Presentational Components
```jsx
// Container component (handles logic)
function UserContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);
  
  return <UserList users={users} loading={loading} />;
}

// Presentational component (handles UI)
function UserList({ users, loading }) {
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Higher-Order Components (HOCs)
```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);
```

## 0.12 Best Practices

### 1. Keep Components Small and Focused
```jsx
// ✅ Good: Small, focused component
function UserAvatar({ user, size = 'medium' }) {
  return (
    <img 
      src={user.avatar} 
      alt={user.name}
      className={`avatar avatar-${size}`}
    />
  );
}

// ❌ Avoid: Large, complex component
function UserDashboard() {
  // 200+ lines of code handling multiple responsibilities
}
```

### 2. Use Descriptive Names
```jsx
// ✅ Good: Descriptive names
function UserProfileCard() {}
function handleSubmitForm() {}
const isUserLoggedIn = true;

// ❌ Avoid: Unclear names
function Card() {}
function handleClick() {}
const flag = true;
```

### 3. Extract Constants
```jsx
// ✅ Good: Extract constants
const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
};

const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_USERNAME_LENGTH: 20,
};
```

### 4. Use PropTypes or TypeScript
```jsx
// PropTypes
import PropTypes from 'prop-types';

function UserCard({ user, onEdit }) {
  // component logic
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};
```

## 0.13 Common Mistakes to Avoid

### 1. Mutating State Directly
```jsx
// ❌ Wrong: Mutating state directly
const [users, setUsers] = useState([]);
users.push(newUser); // Don't do this!

// ✅ Correct: Create new state
setUsers([...users, newUser]);
```

### 2. Using Array Index as Key
```jsx
// ❌ Wrong: Using index as key
{items.map((item, index) => (
  <Item key={index} item={item} />
))}

// ✅ Correct: Using unique identifier
{items.map(item => (
  <Item key={item.id} item={item} />
))}
```

### 3. Forgetting to Handle Loading States
```jsx
// ❌ Wrong: No loading state
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

// ✅ Correct: Handle loading state
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

## 0.14 React Project Structure

Understanding React project structure is crucial for organizing your code and maintaining a scalable application. When you create a new React project (Create React App or Vite-based), specific folders and files come pre-configured to streamline the development process.

### Root Directory

The root directory contains essential configuration and dependency files:

- **`package.json`**: Contains project dependencies, script commands, and basic metadata
- **`package-lock.json`** or **`yarn.lock`**: Locks dependency versions to ensure deterministic installations
- **`node_modules/`**: Contains npm dependencies. Usually excluded from version control
- **`public/`**: Contains static assets (favicon, index.html). In CRA, `index.html` is located here
- **`src/`**: Contains all your application code. React components, styles, and test files are stored here

### src Directory Structure

The `src` folder is where most of your development work happens:

- **`index.js`** or **`main.jsx`**: The entry point where React app is first loaded into the browser. Contains `ReactDOM.createRoot` or `createRoot` call
- **`App.js`**: The main application component. This is where routes or other components are connected
- **`App.css`** and **`index.css`**: Contains global or initial styles
- **`components/`**: Optional folder to organize reusable UI components
- **`pages/`** or **`views/`**: Preferred folder for route-based page components
- **`hooks/`**: Useful for storing shared custom hooks across the project
- **`context/`**: Location for providers created with Context API
- **`assets/`**: Images, icons, and static files
- **`utils/`**: Helper functions and constants storage
- **`tests/`** or **`__tests__/`**: Test files written with Jest or React Testing Library

### Example Folder Tree

```text
my-app/
├── package.json
├── package-lock.json
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js
│   ├── App.css
│   ├── main.jsx
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   └── Header.test.js
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   └── index.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useLocalStorage.js
│   │   └── useFetch.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── assets/
│   │   ├── images/
│   │   │   └── logo.svg
│   │   └── icons/
│   │       └── user.svg
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   ├── apiClient.js
│   │   └── constants.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   └── __tests__/
│       ├── App.test.js
│       └── setupTests.js
└── README.md
```

### File Types and Extensions

React projects use various file types, each serving a specific purpose:

#### JavaScript/TypeScript Files
```jsx
// .jsx - React components with JSX
function UserCard({ user }) {
  return <div>{user.name}</div>;
}

// .js - Regular JavaScript files
export const API_BASE_URL = 'https://api.example.com';

// .tsx - TypeScript React components
interface UserProps {
  user: {
    name: string;
    email: string;
  };
}

function UserCard({ user }: UserProps) {
  return <div>{user.name}</div>;
}

// .ts - TypeScript files
export interface User {
  id: number;
  name: string;
  email: string;
}
```

#### CSS Files
```css
/* .css - Regular CSS */
.button {
  background-color: blue;
  color: white;
}

/* .module.css - CSS Modules (scoped styles) */
.button {
  background-color: blue;
  color: white;
}

/* .scss - Sass/SCSS files */
$primary-color: blue;

.button {
  background-color: $primary-color;
  color: white;
}
```

#### Configuration Files
```json
// package.json - Project configuration
{
  "name": "my-react-app",
  "version": "0.1.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

### Alternative Project Structures (Next.js, Remix)

Different React frameworks may have slightly different structures:

#### Next.js Structure
```
my-next-app/
├── app/                    # App Router (Next.js 13+)
│   ├── page.js            # Home page
│   ├── about/
│   │   └── page.js        # About page
│   └── layout.js          # Root layout
├── pages/                 # Pages Router (legacy)
│   ├── index.js
│   └── about.js
├── public/                # Static assets
├── styles/                # Global styles
└── components/            # Reusable components
```

#### Remix Structure
```
my-remix-app/
├── app/
│   ├── routes/            # File-based routing
│   │   ├── _index.jsx     # Home route
│   │   └── about.jsx      # About route
│   ├── components/        # Shared components
│   └── styles/            # Global styles
└── public/                # Static assets
```

### Organizing Your Own Structure

There's no single correct way to structure a React project. The project size and team preferences determine the structure. What matters is keeping similar components together and maintaining consistent naming conventions. As files grow:

#### Naming Conventions
```jsx
// ✅ Good: Custom hooks with 'use' prefix
useAuth.js
useFetch.js
useLocalStorage.js

// ✅ Good: Component folders with subfolders
Header/
├── Header.jsx
├── Header.css
├── Header.test.js
└── index.js

// ✅ Good: Descriptive file names
UserProfileCard.jsx
LoginForm.jsx
NavigationMenu.jsx

// ❌ Avoid: Generic or unclear names
Card.jsx
Form.jsx
Menu.jsx
```

#### Component Organization
```jsx
// components/index.js - Barrel exports
export { default as Header } from './Header/Header';
export { default as Button } from './Button/Button';
export { default as Modal } from './Modal/Modal';

// Usage
import { Header, Button, Modal } from './components';
```

#### Folder Organization Strategies

**1. Feature-based Organization**
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── dashboard/
│   │   ├── components/
│   │   └── pages/
│   └── profile/
│       ├── components/
│       └── hooks/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── assets/
```

**2. Type-based Organization**
```
src/
├── components/
├── pages/
├── hooks/
├── context/
├── services/
├── utils/
├── constants/
└── assets/
```

### Best Practices for Project Structure

1. **Keep related files together**
2. **Use consistent naming conventions**
3. **Create barrel exports for clean imports**
4. **Separate concerns (UI, logic, data)**
5. **Document your structure in README**
6. **Start simple and refactor as needed**

### Documentation

Document your project structure in your README or architecture documentation:

```markdown
## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route-based page components
├── hooks/         # Custom React hooks
├── context/       # React Context providers
├── utils/         # Helper functions and utilities
├── assets/        # Static files (images, icons)
└── styles/        # Global styles and themes
```

### Component Organization

- **components/**: Reusable UI components
- **pages/**: Full page components for routing
- **hooks/**: Custom hooks for shared logic
- **context/**: Global state management
- **utils/**: Pure functions and helpers
```

Understanding these React fundamentals will provide a solid foundation for building React applications. These concepts and conventions will help you write clean, maintainable, and efficient React code.
