import React, { createContext, useContext, useState, useReducer } from 'react';

// Context API Example
const ThemeContext = createContext();
const UserContext = createContext();

// Theme Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// User Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hooks for using context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Components that use context
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        border: '1px solid #ccc',
        padding: '10px'
      }}
    >
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
}

function UserProfile() {
  const { user, logout } = useUser();

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h3>Welcome, {user.name}!</h3>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function LoginForm() {
  const { login } = useUser();
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    setFormData({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

// Lifting State Up Example
function CounterDisplay({ count, onIncrement, onDecrement }) {
  return (
    <div>
      <h3>Counter: {count}</h3>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
}

function CounterControls({ onReset, onSetValue }) {
  const [inputValue, setInputValue] = useState('');

  const handleSetValue = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      onSetValue(value);
      setInputValue('');
    }
  };

  return (
    <div>
      <button onClick={onReset}>Reset</button>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Set value"
        />
        <button onClick={handleSetValue}>Set</button>
      </div>
    </div>
  );
}

function CounterApp() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  const setValue = (value) => setCount(value);

  return (
    <div>
      <h2>Lifting State Up Example</h2>
      <CounterDisplay 
        count={count} 
        onIncrement={increment} 
        onDecrement={decrement} 
      />
      <CounterControls 
        onReset={reset} 
        onSetValue={setValue} 
      />
    </div>
  );
}

// useReducer Example
const initialState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'completed') return todo.completed;
    if (state.filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div>
      <h2>Todo App with useReducer</h2>
      
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Prop Drilling Example
function GrandParent() {
  const [sharedData, setSharedData] = useState('Data from GrandParent');

  return (
    <div>
      <h2>Prop Drilling Example</h2>
      <Parent data={sharedData} onDataChange={setSharedData} />
    </div>
  );
}

function Parent({ data, onDataChange }) {
  return (
    <div>
      <p>Parent received: {data}</p>
      <Child data={data} onDataChange={onDataChange} />
    </div>
  );
}

function Child({ data, onDataChange }) {
  return (
    <div>
      <p>Child received: {data}</p>
      <button onClick={() => onDataChange('Updated from Child')}>
        Update from Child
      </button>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Data Sharing Examples</h1>
      
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>Context API Example</h2>
        <ThemeProvider>
          <UserProvider>
            <ThemeToggle />
            <UserProfile />
            <LoginForm />
          </UserProvider>
        </ThemeProvider>
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <CounterApp />
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <TodoApp />
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <GrandParent />
      </div>
    </div>
  );
}

export default App;
