# 12. Styling in React

React provides several ways to style your components. Each approach has its own advantages and use cases. This guide covers the most common styling methods.

## 12.1 Inline Styles

Inline styles are defined as JavaScript objects and applied directly to elements using the `style` attribute.

```jsx
// Example: Inline Styles
function InlineStyleExample() {
  const divStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px'
  };

  return (
    <div style={divStyle}>
      This is a styled div with inline styles.
    </div>
  );
}

// You can also write styles directly
function DirectInlineStyle() {
  return (
    <h1 style={{ color: 'red', textAlign: 'center' }}>
      Hello, World!
    </h1>
  );
}
```

**Note**: CSS property names in JavaScript use camelCase (e.g., `backgroundColor` instead of `background-color`).

## 12.2 CSS Stylesheets

The traditional way to style React components is to use external CSS files.

```css
/* App.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
```

```jsx
// App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="title">Welcome to React</h1>
      <button className="button">Click Me</button>
    </div>
  );
}

export default App;
```

## 12.3 CSS Modules

CSS Modules allow you to write CSS that is scoped locally to the component, preventing naming conflicts.

```css
/* Button.module.css */
.button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #218838;
}

.primary {
  background-color: #007bff;
}

.primary:hover {
  background-color: #0056b3;
}
```

```jsx
// Button.js
import React from 'react';
import styles from './Button.module.css';

function Button({ primary, children }) {
  const buttonClass = primary ? `${styles.button} ${styles.primary}` : styles.button;
  
  return (
    <button className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;
```

## 12.4 Styled Components (CSS-in-JS)

Styled Components is a popular library that allows you to write CSS directly in your JavaScript files using tagged template literals.

### Installation

```bash
npm install styled-components
```

### Usage

```jsx
// Example: Styled Components
import React from 'react';
import styled from 'styled-components';

// Define a styled component
const Button = styled.button`
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${props => props.primary ? '#0056b3' : '#5a6268'};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
`;

function App() {
  return (
    <Container>
      <Title>Styled Components Example</Title>
      <Button primary>Primary Button</Button>
      <Button>Secondary Button</Button>
    </Container>
  );
}

export default App;
```

## 12.5 Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides pre-defined classes for styling.

### Installation

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Usage

```jsx
// Example: Tailwind CSS
import React from 'react';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Tailwind CSS Example
      </h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Me
      </button>
    </div>
  );
}

export default App;
```

## 12.6 Sass/SCSS

Sass is a CSS preprocessor that adds features like variables, nesting, and mixins to CSS.

### Installation

```bash
npm install sass
```

### Usage

```scss
/* App.scss */
$primary-color: #007bff;
$secondary-color: #6c757d;

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .title {
    color: #333;
    font-size: 24px;
  }

  .button {
    background-color: $primary-color;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
```

```jsx
// App.js
import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="container">
      <h1 className="title">Sass Example</h1>
      <button className="button">Click Me</button>
    </div>
  );
}

export default App;
```

## 12.7 Choosing a Styling Approach

*   **Inline Styles**: Good for dynamic styles or one-off styling needs.
*   **CSS Stylesheets**: Traditional approach, good for simple projects.
*   **CSS Modules**: Prevents naming conflicts, good for medium to large projects.
*   **Styled Components**: Component-scoped styles with JavaScript power, popular in modern React apps.
*   **Tailwind CSS**: Rapid development with utility classes, great for prototyping and consistent design.
*   **Sass/SCSS**: Adds powerful features to CSS, good for complex styling needs.

Choose the approach that best fits your project's needs and your team's preferences.
