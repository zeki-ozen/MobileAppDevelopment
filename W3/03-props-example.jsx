import React from 'react';

// Parent Component
function App() {
  return (
    <div>
      <Greeting userName="Alice" />
      <Greeting userName="Bob" />
      <Button text="Submit" />
      <Button /> {/* Uses default prop */}
      <Card>
        <h2>Card Title</h2>
        <p>Some content inside the card.</p>
      </Card>
    </div>
  );
}

// Child Component with Destructuring
function Greeting({ userName }) {
  return <p>Welcome, {userName}!</p>;
}

// Component with Default Props
function Button({ text }) {
  return <button>{text}</button>;
}

Button.defaultProps = {
  text: 'Click Me'
};

// Component using children prop
function Card(props) {
  return (
    <div className="card" style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      {props.children}
    </div>
  );
}

export default App;

