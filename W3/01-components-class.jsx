import React from 'react';

// Class Component
class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name} from Class Component!</h1>;
  }
}

export default WelcomeClass;

