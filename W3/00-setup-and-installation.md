# 0. React Setup and Installation

Getting started with React is straightforward thanks to modern tooling. This guide covers the most common ways to set up a React development environment.

## 0.1 Prerequisites

Before you start, make sure you have the following installed on your system:

*   **Node.js** (version 14 or higher): React requires Node.js for its build tools and package management.
*   **npm** or **yarn**: Package managers that come with Node.js. npm is included by default, while yarn is an alternative.

You can verify your installation by running:

```bash
node --version
npm --version
```

## 0.2 Create React App (CRA)

**Create React App** is the official tool for creating new React applications. It sets up a modern web development environment with no configuration required.

### Installation

```bash
# Using npx (recommended - no global installation needed)
npx create-react-app my-app

# Using npm (global installation)
npm install -g create-react-app
create-react-app my-app

# Using yarn
yarn create react-app my-app
```

### Project Structure

After running the command, Create React App will generate a project with the following structure:

```
my-app/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

### Running the Development Server

```bash
cd my-app
npm start
```

This will start the development server at `http://localhost:3000`. The page will automatically reload when you make changes to the code.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 0.3 Vite

**Vite** is a modern, fast build tool that provides a better development experience compared to Create React App. It offers instant server start and lightning-fast Hot Module Replacement (HMR).

### Installation

```bash
# Using npm
npm create vite@latest my-react-app -- --template react

# Using yarn
yarn create vite my-react-app --template react

# Using pnpm
pnpm create vite my-react-app --template react
```

### Running the Development Server

```bash
cd my-react-app
npm install
npm run dev
```

The development server will start at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

## 0.4 Next.js

**Next.js** is a React framework that provides server-side rendering, static site generation, and many other features out of the box. It's ideal for production-grade applications.

### Installation

```bash
npx create-next-app@latest my-next-app
```

Follow the prompts to configure your project (TypeScript, ESLint, etc.).

### Running the Development Server

```bash
cd my-next-app
npm run dev
```

The development server will start at `http://localhost:3000`.

## 0.5 Manual Setup (Without Tools)

For learning purposes or very simple projects, you can set up React manually using CDN links.

```html
<!DOCTYPE html>
<html>
<head>
  <title>React App</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    function App() {
      return <h1>Hello, React!</h1>;
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

**Note**: This approach is not recommended for production applications as it's slower and lacks modern tooling benefits.

## 0.6 Recommended Development Tools

*   **VS Code**: A popular code editor with excellent React support.
*   **React Developer Tools**: Browser extension for debugging React applications (available for Chrome and Firefox).
*   **ESLint**: A linter tool for identifying and fixing code quality issues.
*   **Prettier**: A code formatter for consistent code style.

## 0.7 First React Component

After setting up your project, you can create your first React component:

```jsx
// src/App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React!</h1>
      <p>This is my first React application.</p>
    </div>
  );
}

export default App;
```

## 0.8 Development vs Production Builds

Understanding the difference between development and production builds is crucial:

### Development Build (`npm start`)
- **Hot Reloading**: Changes are reflected immediately without page refresh
- **Source Maps**: Easier debugging with original source code
- **Detailed Error Messages**: More descriptive error messages for debugging
- **Larger Bundle Size**: Includes debugging tools and unminified code
- **Slower Performance**: Not optimized for speed

### Production Build (`npm run build`)
- **Minified Code**: Smaller file sizes for faster loading
- **Tree Shaking**: Removes unused code
- **Optimized Assets**: Images and other assets are optimized
- **No Source Maps**: Harder to debug but smaller bundle
- **Better Performance**: Optimized for speed and efficiency

## 0.9 Environment Variables

You can use environment variables to configure your React application for different environments:

### Creating Environment Files
```bash
# .env.local (for local development)
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_DEBUG=true

# .env.production (for production)
REACT_APP_API_URL=https://api.myapp.com
REACT_APP_DEBUG=false
```

### Using Environment Variables
```jsx
// In your React component
function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const isDebug = process.env.REACT_APP_DEBUG === 'true';

  return (
    <div>
      <h1>My App</h1>
      {isDebug && <p>Debug mode is enabled</p>}
      <p>API URL: {apiUrl}</p>
    </div>
  );
}
```

**Note**: Environment variables must start with `REACT_APP_` to be accessible in your React code.

## 0.10 Deployment Options

There are several ways to deploy your React application:

### 1. Static Hosting (Recommended for SPAs)
- **Netlify**: Easy deployment with drag-and-drop or Git integration
- **Vercel**: Optimized for React and Next.js applications
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3 + CloudFront**: Scalable and cost-effective

### 2. Traditional Web Servers
- **Apache**: Use mod_rewrite for client-side routing
- **Nginx**: Configure try_files directive for SPA routing
- **IIS**: Use URL Rewrite module for routing

### 3. Container Deployment
- **Docker**: Containerize your React app
- **Kubernetes**: Orchestrate containers at scale

## 0.11 Performance Optimization

### Code Splitting
```jsx
// Lazy loading components
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze your bundle
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

## 0.12 Troubleshooting Common Issues

### Issue 1: Port Already in Use
```bash
# Kill process using port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm start
```

### Issue 2: Module Not Found
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Build Failures
```bash
# Check for TypeScript errors
npm run build 2>&1 | grep -i error

# Check for ESLint errors
npm run lint
```

With your development environment set up, you're ready to start building React applications!
