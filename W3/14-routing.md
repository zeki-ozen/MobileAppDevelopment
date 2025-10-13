# 14. Routing with React Router

React Router is the standard routing library for React. It enables navigation among different views in your application, allowing you to build single-page applications (SPAs) with multiple pages.

## 14.1 Installation

```bash
npm install react-router-dom
```

## 14.2 Basic Setup

React Router provides several components for routing. The most commonly used are `BrowserRouter`, `Routes`, `Route`, and `Link`.

```jsx
// Example: Basic Routing Setup
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Page Components
function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 14.3 Navigation with `Link` and `NavLink`

*   **`Link`**: Used for basic navigation without page reload.
*   **`NavLink`**: Similar to `Link`, but adds styling attributes to the active link.

```jsx
// Example: NavLink
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'blue'
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        About
      </NavLink>
    </nav>
  );
}
```

## 14.4 Dynamic Routes (URL Parameters)

You can create dynamic routes that accept parameters.

```jsx
// Example: Dynamic Routes
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return <h2>User Profile: {userId}</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/:userId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// Accessing: /user/123 will display "User Profile: 123"
```

## 14.5 Nested Routes

You can nest routes to create hierarchical page structures.

```jsx
// Example: Nested Routes
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}

function Profile() {
  return <h3>Profile Page</h3>;
}

function Settings() {
  return <h3>Settings Page</h3>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

## 14.6 Programmatic Navigation

You can navigate programmatically using the `useNavigate` hook.

```jsx
// Example: Programmatic Navigation
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic
    // Then navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
```

## 14.7 404 Page (Not Found)

You can create a catch-all route for pages that don't exist.

```jsx
// Example: 404 Page
function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 14.8 Protected Routes

You can create protected routes that require authentication.

```jsx
// Example: Protected Routes
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const isAuthenticated = true; // This would come from your auth state

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

## 14.9 Query Parameters

You can access query parameters using the `useSearchParams` hook.

```jsx
// Example: Query Parameters
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div>
      <h2>Search Results for: {query}</h2>
      <input
        type="text"
        value={query || ''}
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />
    </div>
  );
}

// Accessing: /search?q=react will display "Search Results for: react"
```

React Router is essential for building multi-page React applications with client-side routing.
