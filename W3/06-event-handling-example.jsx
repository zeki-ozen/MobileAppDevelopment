import React, { useState } from 'react';

// Click Event Example
function ButtonClicker() {
  function handleClick() {
    alert('Button clicked!');
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}

// Form Submission Example
function FormExample() {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Form submitted with name: ${name}`);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

// Passing Arguments to Event Handlers
function GreetingButton() {
  function greetUser(name) {
    alert(`Hello, ${name}!`);
  }

  return (
    <div>
      <button onClick={() => greetUser('Alice')}>Greet Alice</button>
      <button onClick={() => greetUser('Bob')}>Greet Bob</button>
    </div>
  );
}

// App Component
function App() {
  return (
    <div>
      <h2>Click Event</h2>
      <ButtonClicker />
      <h2>Form Submission</h2>
      <FormExample />
      <h2>Passing Arguments</h2>
      <GreetingButton />
    </div>
  );
}

export default App;

