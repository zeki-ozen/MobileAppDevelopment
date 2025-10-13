# 7. Conditional Rendering

In React, conditional rendering allows you to render different elements or components based on certain conditions. This is a powerful way to create dynamic and interactive user interfaces.

## 7.1 `if` Statements

You can use standard JavaScript `if` statements to conditionally render components. This works well outside of JSX.

```jsx
// Example: Using if statement
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

// Usage:
// <Greeting isLoggedIn={true} />
// <Greeting isLoggedIn={false} />
```

## 7.2 Element Variables

You can use variables to store elements. This allows you to conditionally render a part of the component while the rest of the output remains unchanged.

```jsx
// Example: Element Variables
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

## 7.3 Ternary Operator (Conditional Operator)

The ternary operator is a concise way to conditionally render elements within JSX.

```jsx
// Example: Ternary Operator
function RenderStatus(props) {
  const status = props.status;
  return (
    <div>
      {status === 'active' ? <p>Status: Active</p> : <p>Status: Inactive</p>}
    </div>
  );
}

// Usage:
// <RenderStatus status="active" />
```

## 7.4 Logical `&&` Operator (Short-circuit Evaluation)

If you want to render something only when a condition is true, and render nothing when it's false, you can use the logical `&&` operator.

```jsx
// Example: Logical && Operator
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

// Usage:
// <Mailbox unreadMessages={["React", "Re: React"]} />
// <Mailbox unreadMessages={[]} />
```

## 7.5 Preventing Component from Rendering

In rare cases, you might want a component to hide itself even though it was rendered by another component. To do this, return `null` from its `render` method (for class components) or directly from the functional component.

```jsx
// Example: Returning null
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}
```

Conditional rendering is a fundamental concept for building flexible and responsive React UIs.
