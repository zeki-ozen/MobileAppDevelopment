import React, { useState } from 'react';

// Simple Router Implementation
function SimpleRouter({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Listen for browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

const RouterContext = React.createContext();

function useRouter() {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a SimpleRouter');
  }
  return context;
}

// Route Component
function Route({ path, component: Component, exact = false }) {
  const { currentPath } = useRouter();
  
  const isMatch = exact 
    ? currentPath === path 
    : currentPath.startsWith(path);

  return isMatch ? <Component /> : null;
}

// Link Component
function Link({ to, children, style = {} }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a 
      href={to} 
      onClick={handleClick}
      style={{
        color: '#007bff',
        textDecoration: 'none',
        ...style
      }}
    >
      {children}
    </a>
  );
}

// NavLink Component (with active state)
function NavLink({ to, children, exact = false, style = {}, activeStyle = {} }) {
  const { currentPath, navigate } = useRouter();

  const isActive = exact 
    ? currentPath === to 
    : currentPath.startsWith(to);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a 
      href={to} 
      onClick={handleClick}
      style={{
        color: '#007bff',
        textDecoration: 'none',
        ...style,
        ...(isActive ? activeStyle : {})
      }}
    >
      {children}
    </a>
  );
}

// Page Components
function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the home page! This is a simple routing example.</p>
      <div style={{ marginTop: '20px' }}>
        <h3>Quick Links:</h3>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About Page</h2>
      <p>This is the about page. Learn more about our company and mission.</p>
      <div style={{ marginTop: '20px' }}>
        <h3>Our Mission</h3>
        <p>We are dedicated to providing excellent React examples and tutorials.</p>
      </div>
    </div>
  );
}

function Products() {
  const products = [
    { id: 1, name: 'Product A', price: '$99' },
    { id: 2, name: 'Product B', price: '$149' },
    { id: 3, name: 'Product C', price: '$199' }
  ];

  return (
    <div>
      <h2>Products Page</h2>
      <p>Check out our amazing products!</p>
      <div style={{ marginTop: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail() {
  const { currentPath } = useRouter();
  const productId = currentPath.split('/').pop();
  
  const products = {
    1: { name: 'Product A', price: '$99', description: 'Amazing product A with great features!' },
    2: { name: 'Product B', price: '$149', description: 'Premium product B with advanced capabilities!' },
    3: { name: 'Product C', price: '$199', description: 'Ultimate product C with all features!' }
  };

  const product = products[productId];

  if (!product) {
    return (
      <div>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/products">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Product Detail</h2>
      <div style={{ marginTop: '20px' }}>
        <h3>{product.name}</h3>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/products">← Back to Products</Link>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (This is just a demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <h2>Contact Page</h2>
      <p>Get in touch with us!</p>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

function Users() {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ]);

  return (
    <div>
      <h2>Users Page</h2>
      <p>Here are our users:</p>
      <div style={{ marginTop: '20px' }}>
        {users.map(user => (
          <div key={user.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <Link to={`/users/${user.id}`}>View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserProfile() {
  const { currentPath } = useRouter();
  const userId = currentPath.split('/').pop();
  
  const users = {
    1: { name: 'John Doe', email: 'john@example.com', bio: 'Software developer with 5 years experience.' },
    2: { name: 'Jane Smith', email: 'jane@example.com', bio: 'UI/UX designer passionate about creating beautiful interfaces.' },
    3: { name: 'Bob Johnson', email: 'bob@example.com', bio: 'Full-stack developer and team lead.' }
  };

  const user = users[userId];

  if (!user) {
    return (
      <div>
        <h2>User Not Found</h2>
        <p>The user you're looking for doesn't exist.</p>
        <Link to="/users">← Back to Users</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div style={{ marginTop: '20px' }}>
        <h3>{user.name}</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/users">← Back to Users</Link>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">← Go Home</Link>
    </div>
  );
}

// Navigation Component
function Navigation() {
  return (
    <nav style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '15px', 
      marginBottom: '20px',
      borderRadius: '5px'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          My App
        </Link>
        <NavLink 
          to="/" 
          exact 
          style={{ padding: '8px 12px' }}
          activeStyle={{ backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          style={{ padding: '8px 12px' }}
          activeStyle={{ backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}
        >
          About
        </NavLink>
        <NavLink 
          to="/products" 
          style={{ padding: '8px 12px' }}
          activeStyle={{ backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}
        >
          Products
        </NavLink>
        <NavLink 
          to="/contact" 
          style={{ padding: '8px 12px' }}
          activeStyle={{ backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}
        >
          Contact
        </NavLink>
        <NavLink 
          to="/users" 
          style={{ padding: '8px 12px' }}
          activeStyle={{ backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}
        >
          Users
        </NavLink>
      </div>
    </nav>
  );
}

// Main App Component
function App() {
  return (
    <SimpleRouter>
      <div style={{ padding: '20px' }}>
        <h1>React Routing Examples</h1>
        
        <Navigation />
        
        <div style={{ minHeight: '400px' }}>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" exact component={Products} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/users" exact component={Users} />
          <Route path="/users/:id" component={UserProfile} />
          <Route path="*" component={NotFound} />
        </div>
      </div>
    </SimpleRouter>
  );
}

export default App;
