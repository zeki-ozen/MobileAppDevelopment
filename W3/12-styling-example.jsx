import React, { useState } from 'react';
import './styling-example.css';

// Inline Styles
function InlineStyles() {
  const [isActive, setIsActive] = useState(false);

  const buttonStyle = {
    backgroundColor: isActive ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease'
  };

  const containerStyle = {
    padding: '20px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    margin: '10px 0',
    backgroundColor: '#f8f9fa'
  };

  return (
    <div style={containerStyle}>
      <h3>Inline Styles</h3>
      <button 
        style={buttonStyle}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Active' : 'Inactive'}
      </button>
    </div>
  );
}

// CSS Classes
function CSSClasses() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`css-classes-container ${theme}`}>
      <h3>CSS Classes</h3>
      <div className="card">
        <p>This is a card with CSS classes</p>
        <button 
          className="btn btn-primary"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

// CSS Modules (simulated with regular CSS)
function CSSModules() {
  return (
    <div className="css-modules-container">
      <h3>CSS Modules (Simulated)</h3>
      <div className="module-card">
        <h4>Module Card</h4>
        <p>This uses scoped CSS classes</p>
        <button className="module-button">Module Button</button>
      </div>
    </div>
  );
}

// Styled Components (simulated with regular components)
function StyledComponents() {
  const StyledButton = ({ children, variant = 'primary', ...props }) => {
    const baseStyle = {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    };

    const variants = {
      primary: {
        backgroundColor: '#007bff',
        color: 'white'
      },
      secondary: {
        backgroundColor: '#6c757d',
        color: 'white'
      },
      success: {
        backgroundColor: '#28a745',
        color: 'white'
      }
    };

    return (
      <button 
        style={{ ...baseStyle, ...variants[variant] }}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="styled-components-container">
      <h3>Styled Components (Simulated)</h3>
      <div>
        <StyledButton variant="primary">Primary Button</StyledButton>
        <StyledButton variant="secondary">Secondary Button</StyledButton>
        <StyledButton variant="success">Success Button</StyledButton>
      </div>
    </div>
  );
}

// CSS-in-JS with styled-jsx (simulated)
function CSSInJS() {
  return (
    <div className="css-in-js-container">
      <h3>CSS-in-JS</h3>
      <div className="dynamic-card">
        <h4>Dynamic Styling</h4>
        <p>This uses dynamic CSS-in-JS</p>
      </div>
      <style jsx>{`
        .dynamic-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .dynamic-card h4 {
          margin-top: 0;
          font-size: 1.5em;
        }
      `}</style>
    </div>
  );
}

// Responsive Design
function ResponsiveDesign() {
  const [screenSize, setScreenSize] = useState('desktop');

  const responsiveStyle = {
    container: {
      display: 'flex',
      flexDirection: screenSize === 'mobile' ? 'column' : 'row',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    },
    card: {
      flex: 1,
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  return (
    <div>
      <h3>Responsive Design</h3>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setScreenSize('mobile')}
          style={{ marginRight: '10px' }}
        >
          Mobile View
        </button>
        <button 
          onClick={() => setScreenSize('tablet')}
          style={{ marginRight: '10px' }}
        >
          Tablet View
        </button>
        <button onClick={() => setScreenSize('desktop')}>
          Desktop View
        </button>
      </div>
      <div style={responsiveStyle.container}>
        <div style={responsiveStyle.card}>
          <h4>Card 1</h4>
          <p>This card adapts to screen size</p>
        </div>
        <div style={responsiveStyle.card}>
          <h4>Card 2</h4>
          <p>Responsive layout example</p>
        </div>
        <div style={responsiveStyle.card}>
          <h4>Card 3</h4>
          <p>Flexible design</p>
        </div>
      </div>
    </div>
  );
}

// Animation Example
function AnimationExample() {
  const [isAnimated, setIsAnimated] = useState(false);

  const animatedStyle = {
    width: '200px',
    height: '100px',
    backgroundColor: isAnimated ? '#28a745' : '#dc3545',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    transition: 'all 0.5s ease',
    transform: isAnimated ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
    boxShadow: isAnimated ? '0 8px 25px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div>
      <h3>Animation Example</h3>
      <div 
        style={animatedStyle}
        onClick={() => setIsAnimated(!isAnimated)}
      >
        {isAnimated ? 'Animated!' : 'Click me!'}
      </div>
      <p>Click the box to animate</p>
    </div>
  );
}

// Theme System
function ThemeSystem() {
  const [theme, setTheme] = useState('light');

  const themes = {
    light: {
      background: '#ffffff',
      text: '#333333',
      primary: '#007bff',
      secondary: '#6c757d'
    },
    dark: {
      background: '#1a1a1a',
      text: '#ffffff',
      primary: '#0d6efd',
      secondary: '#6c757d'
    },
    blue: {
      background: '#e3f2fd',
      text: '#1565c0',
      primary: '#1976d2',
      secondary: '#42a5f5'
    }
  };

  const currentTheme = themes[theme];

  const themeStyle = {
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    padding: '20px',
    borderRadius: '8px',
    border: `2px solid ${currentTheme.primary}`,
    transition: 'all 0.3s ease'
  };

  return (
    <div>
      <h3>Theme System</h3>
      <div style={{ marginBottom: '20px' }}>
        {Object.keys(themes).map(themeName => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              backgroundColor: themes[themeName].primary,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </button>
        ))}
      </div>
      <div style={themeStyle}>
        <h4>Theme Preview</h4>
        <p>Current theme: {theme}</p>
        <button 
          style={{
            backgroundColor: currentTheme.primary,
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Themed Button
        </button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Styling Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <InlineStyles />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <CSSClasses />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <CSSModules />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <StyledComponents />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <CSSInJS />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <ResponsiveDesign />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <AnimationExample />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <ThemeSystem />
      </div>
    </div>
  );
}

export default App;
