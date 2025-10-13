import React, { useState } from 'react';

// Basic Conditional Rendering
function BasicConditional() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });

  return (
    <div>
      <h2>Basic Conditional Rendering</h2>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
      
      {isLoggedIn ? (
        <div>
          <h3>Welcome back, {user.name}!</h3>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <div>
          <h3>Please log in</h3>
          <p>You need to be logged in to view this content.</p>
        </div>
      )}
    </div>
  );
}

// Multiple Conditions
function MultipleConditions() {
  const [userType, setUserType] = useState('guest');
  const [isVerified, setIsVerified] = useState(false);

  const renderContent = () => {
    if (userType === 'admin') {
      return <div><h3>Admin Panel</h3><p>Full access to all features</p></div>;
    } else if (userType === 'user' && isVerified) {
      return <div><h3>User Dashboard</h3><p>Access to user features</p></div>;
    } else if (userType === 'user' && !isVerified) {
      return <div><h3>Please verify your email</h3><p>Check your inbox for verification link</p></div>;
    } else {
      return <div><h3>Guest Access</h3><p>Limited features available</p></div>;
    }
  };

  return (
    <div>
      <h2>Multiple Conditions</h2>
      <div>
        <label>
          User Type:
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="guest">Guest</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
          />
          Verified
        </label>
      </div>
      {renderContent()}
    </div>
  );
}

// Loading States
function LoadingStates() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData({ message: 'Data loaded successfully!' });
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Loading States</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      {loading && <div>Loading spinner...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {data && !loading && <div style={{ color: 'green' }}>{data.message}</div>}
    </div>
  );
}

// List with Conditional Items
function ConditionalList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', category: 'fruit', inStock: true },
    { id: 2, name: 'Carrot', category: 'vegetable', inStock: false },
    { id: 3, name: 'Banana', category: 'fruit', inStock: true },
    { id: 4, name: 'Broccoli', category: 'vegetable', inStock: true },
  ]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = items.filter(item => {
    if (showOnlyInStock && !item.inStock) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div>
      <h2>Conditional List Rendering</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showOnlyInStock}
            onChange={(e) => setShowOnlyInStock(e.target.checked)}
          />
          Show only in stock
        </label>
      </div>
      <div>
        <label>
          Category:
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
          </select>
        </label>
      </div>
      
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map(item => (
            <li key={item.id}>
              {item.name} ({item.category})
              {item.inStock ? ' ✅' : ' ❌'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items match the current filters.</p>
      )}
    </div>
  );
}

// Error Boundaries (Simplified)
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div style={{ color: 'red' }}>Something went wrong!</div>;
  }

  return children;
}

function ErrorProneComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test error');
  }

  return (
    <div>
      <h2>Error Handling</h2>
      <button onClick={() => setShouldError(true)}>
        Trigger Error
      </button>
    </div>
  );
}

// Short Circuit Evaluation
function ShortCircuitExample() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUser = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ name: 'Jane Doe', role: 'developer' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h2>Short Circuit Evaluation</h2>
      <button onClick={loadUser} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load User'}
      </button>
      
      {/* Using && for conditional rendering */}
      {isLoading && <p>Loading user data...</p>}
      {user && <p>Welcome, {user.name}!</p>}
      {!user && !isLoading && <p>No user loaded</p>}
      
      {/* Using || for fallback */}
      <p>User role: {user?.role || 'Unknown'}</p>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Conditional Rendering Examples</h1>
      
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <BasicConditional />
      </div>
      
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <MultipleConditions />
      </div>
      
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <LoadingStates />
      </div>
      
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <ConditionalList />
      </div>
      
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <ErrorBoundary>
          <ErrorProneComponent />
        </ErrorBoundary>
      </div>
      
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <ShortCircuitExample />
      </div>
    </div>
  );
}

export default App;
