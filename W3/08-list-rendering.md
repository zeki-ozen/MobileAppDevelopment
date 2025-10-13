# 8. List Rendering

Rendering lists of data is a common task in React applications. You can build collections of elements and include them in JSX using the JavaScript `map()` function.

## 8.1 Basic List Rendering

The `map()` function is used to transform an array of data into an array of JSX elements.

```jsx
// Example: Basic List Rendering
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

// Usage:
// const numbers = [1, 2, 3, 4, 5];
// <NumberList numbers={numbers} />
```

## 8.2 Keys

Keys help React identify which items have changed, been added, or been removed. Keys should be given to the elements inside the array to give the elements a stable identity. The best way to pick a key is to use a string that uniquely identifies a list item among its siblings.

```jsx
// Example: Using Keys
function TodoList(props) {
  const todos = props.todos;
  return (
    <ul>
      {todos.map((todo) =>
        <li key={todo.id}>
          {todo.text}
        </li>
      )}
    </ul>
  );
}

// Usage:
// const todos = [
//   { id: 1, text: 'Learn React' },
//   { id: 2, text: 'Build a project' },
//   { id: 3, text: 'Deploy to production' }
// ];
// <TodoList todos={todos} />
```

**Important**: Keys must be unique among siblings, but they don't need to be globally unique. Avoid using array indices as keys if the order of items may change, as this can negatively impact performance and may cause issues with component state.

## 8.3 Extracting Components with Keys

A good rule of thumb is that elements inside the `map()` call need keys. When you extract a component, keep the key on the component element, not on the root element inside the component.

```jsx
// Incorrect: Key on the wrong element
function ListItem(props) {
  return <li key={props.value.toString()}>{props.value}</li>; // Wrong!
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem value={number} />
  );
  return <ul>{listItems}</ul>;
}

// Correct: Key on the component in the array
function ListItem(props) {
  return <li>{props.value}</li>; // No key here
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()} value={number} /> // Key here!
  );
  return <ul>{listItems}</ul>;
}
```

## 8.4 Inline Map in JSX

You can embed the `map()` call directly in JSX for more concise code.

```jsx
// Example: Inline Map
function NumberList(props) {
  const numbers = props.numbers;
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
```

List rendering is essential for displaying dynamic collections of data in your React applications.
