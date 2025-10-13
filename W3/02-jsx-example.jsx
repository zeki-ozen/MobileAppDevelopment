import React from 'react';

function JsxExample() {
  const name = 'World';
  const user = {
    firstName: 'Harper',
    lastName: 'Perez'
  };

  function formatUser(user) {
    return user.firstName + ' ' + user.lastName;
  }

  const imageUrl = 'https://via.placeholder.com/150';

  return (
    <div>
      {/* Basic JSX */}
      <h1>Hello, React!</h1>

      {/* Embedding Expressions */}
      <h2>Hello, {name}!</h2>
      <h3>Hello, {formatUser(user)}!</h3>

      {/* JSX Attributes */}
      <img src={imageUrl} alt="Placeholder" style={{ width: '150px', height: '150px' }} />

      {/* Conditional JSX */}
      {name === 'World' && <p>This is the world!</p>}
    </div>
  );
}

export default JsxExample;

