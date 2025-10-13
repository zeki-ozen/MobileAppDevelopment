import React, { useState, useEffect } from 'react';

// Class Component with Lifecycle Methods
class LifecycleClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: 'Component mounted'
    };
    console.log('Constructor called');
  }

  componentDidMount() {
    console.log('Component did mount');
    this.setState({ message: 'Component mounted successfully' });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update');
    if (prevState.count !== this.state.count) {
      console.log('Count changed from', prevState.count, 'to', this.state.count);
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    console.log('Render called');
    return (
      <div>
        <h2>Class Component Lifecycle</h2>
        <p>Count: {this.state.count}</p>
        <p>Message: {this.state.message}</p>
        <button onClick={this.handleIncrement}>Increment</button>
      </div>
    );
  }
}

// Functional Component with useEffect Hook
function LifecycleFunctional() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Component mounted');

  // Equivalent to componentDidMount
  useEffect(() => {
    console.log('Component mounted (useEffect)');
    setMessage('Component mounted successfully');
  }, []); // Empty dependency array = runs only once

  // Equivalent to componentDidUpdate
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]); // Runs when count changes

  // Cleanup function (equivalent to componentWillUnmount)
  useEffect(() => {
    return () => {
      console.log('Component will unmount (useEffect cleanup)');
    };
  }, []);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <h2>Functional Component with useEffect</h2>
      <p>Count: {count}</p>
      <p>Message: {message}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

// Data Fetching Example
function DataFetching() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({ message: 'Data fetched successfully!' });
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array = runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Data Fetching Example</h2>
      <p>{data?.message}</p>
    </div>
  );
}

// Timer Example
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Timer Example</h2>
      <p>Seconds: {seconds}</p>
    </div>
  );
}

// Main App Component
function App() {
  const [showClass, setShowClass] = useState(true);
  const [showFunctional, setShowFunctional] = useState(true);
  const [showDataFetching, setShowDataFetching] = useState(true);
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Lifecycle and Effects Examples</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowClass(!showClass)}>
          Toggle Class Component
        </button>
        {showClass && <LifecycleClass />}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowFunctional(!showFunctional)}>
          Toggle Functional Component
        </button>
        {showFunctional && <LifecycleFunctional />}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowDataFetching(!showDataFetching)}>
          Toggle Data Fetching
        </button>
        {showDataFetching && <DataFetching />}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowTimer(!showTimer)}>
          Toggle Timer
        </button>
        {showTimer && <Timer />}
      </div>
    </div>
  );
}

export default App;
