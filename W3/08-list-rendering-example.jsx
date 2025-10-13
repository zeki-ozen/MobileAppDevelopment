import React from 'react';

// Basic List Rendering
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <ul>
      {numbers.map((number) =>
        <li key={number.toString()}>
          {number}
        </li>
      )}
    </ul>
  );
}

// List with Objects
function TodoList() {
  const todos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: true }
  ];

  return (
    <ul>
      {todos.map((todo) =>
        <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </li>
      )}
    </ul>
  );
}

// Extracted Component with Keys
function ListItem(props) {
  return <li>{props.value}</li>;
}

function ExtractedNumberList() {
  const numbers = [10, 20, 30, 40, 50];
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()} value={number} />
  );
  return <ul>{listItems}</ul>;
}

// App Component
function App() {
  return (
    <div>
      <h2>Basic Number List</h2>
      <NumberList />
      <h2>Todo List</h2>
      <TodoList />
      <h2>Extracted Component List</h2>
      <ExtractedNumberList />
    </div>
  );
}

export default App;

