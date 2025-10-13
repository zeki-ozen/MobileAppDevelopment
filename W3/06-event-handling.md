# 6. Event Handling

React's event system is very similar to the native DOM event system, but with some key differences. React events are named using `camelCase` and you pass a function as the event handler, rather than a string.

## 6.1 Handling Events with Functional Components

In functional components, you typically define event handler functions directly within the component or as separate functions.

```jsx
// Example: Click Event in Functional Component
import React from 'react';

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

// Example: Passing arguments to event handlers
function GreetingButton() {
  function greetUser(name) {
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={() => greetUser('Alice')}>
      Greet Alice
    </button>
  );
}
```

## 6.2 Handling Events with Class Components

In class components, event handlers are usually methods of the class. You need to be careful about the `this` context when passing event handlers.

```jsx
// Example: Click Event in Class Component
import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

// Example: Passing arguments to event handlers in Class Component
class UserActions extends React.Component {
  handleDelete(id, e) {
    console.log(`Deleting item with ID: ${id}`);
    console.log('Event object:', e);
  }

  render() {
    return (
      <button onClick={(e) => this.handleDelete(123, e)}>
        Delete Item
      </button>
    );
  }
}
```

## 6.3 Synthetic Events

React implements a synthetic event system. This system ensures that event handlers have a consistent API across different browsers. It wraps the browser's native event system, providing a cross-browser compatible event object.

```jsx
// The event object passed to your handler is a SyntheticEvent
function handleChange(e) {
  // e.target refers to the DOM element that triggered the event
  console.log(e.target.value);
}

<input type="text" onChange={handleChange} />
```

## 6.4 Preventing Default Behavior

You can prevent the default behavior of an event (e.g., form submission, link navigation) by calling `event.preventDefault()`.

```jsx
function handleSubmit(e) {
  e.preventDefault();
  console.log('You clicked submit.');
}

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

Event handling is a core part of making React applications interactive and responsive to user input.
