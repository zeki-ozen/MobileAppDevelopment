# 0. JavaScript Basics for React

Before diving into React, it's essential to have a solid understanding of JavaScript fundamentals. This section covers the core JavaScript concepts you'll need to work effectively with React.

## 0.1 Variables and Constants

JavaScript provides three ways to declare variables: `var`, `let`, and `const`.

```javascript
// var (function-scoped, avoid using in modern JavaScript)
var oldWay = 'This is the old way';

// let (block-scoped, value can be reassigned)
let count = 10;
count = 20; // OK

// const (block-scoped, value cannot be reassigned)
const PI = 3.14159;
// PI = 3.14; // Error: Assignment to constant variable
```

**Best Practice**: Use `const` by default. Use `let` only when you need to reassign the variable. Avoid `var`.

## 0.2 Data Types

JavaScript has several primitive data types and one complex data type (objects).

```javascript
// Primitive Types
const stringType = 'Hello, World!'; // String
const numberType = 42; // Number
const booleanType = true; // Boolean
const undefinedType = undefined; // Undefined
const nullType = null; // Null
const symbolType = Symbol('unique'); // Symbol (ES6)
const bigIntType = 123456789012345678901234567890n; // BigInt (ES2020)

// Complex Type
const objectType = { name: 'Alice', age: 30 }; // Object
const arrayType = [1, 2, 3, 4, 5]; // Array (special type of object)
```

## 0.3 Functions

Functions are reusable blocks of code. JavaScript supports several ways to define functions.

```javascript
// Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function Expression
const greetExpression = function(name) {
  return `Hello, ${name}!`;
};

// Arrow Function (ES6) - Preferred in React
const greetArrow = (name) => {
  return `Hello, ${name}!`;
};

// Arrow Function with Implicit Return (for single expressions)
const greetShort = (name) => `Hello, ${name}!`;

// Calling a function
console.log(greet('Alice')); // Output: Hello, Alice!
```

## 0.4 Template Literals

Template literals allow you to embed expressions within strings using backticks (`` ` ``).

```javascript
const name = 'Bob';
const age = 25;

// Old way (string concatenation)
const message1 = 'My name is ' + name + ' and I am ' + age + ' years old.';

// New way (template literals)
const message2 = `My name is ${name} and I am ${age} years old.`;

console.log(message2); // Output: My name is Bob and I am 25 years old.
```

## 0.5 Conditional Statements

Conditional statements allow you to execute code based on certain conditions.

```javascript
// if-else statement
const age = 18;

if (age >= 18) {
  console.log('You are an adult.');
} else {
  console.log('You are a minor.');
}

// else if
const score = 85;

if (score >= 90) {
  console.log('Grade: A');
} else if (score >= 80) {
  console.log('Grade: B');
} else if (score >= 70) {
  console.log('Grade: C');
} else {
  console.log('Grade: F');
}

// Ternary operator (shorthand for if-else)
const isAdult = age >= 18 ? 'Adult' : 'Minor';
console.log(isAdult); // Output: Adult
```

## 0.6 Loops

Loops allow you to execute code repeatedly.

```javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}

// while loop
let count = 0;
while (count < 5) {
  console.log(`Count: ${count}`);
  count++;
}

// for...of loop (for arrays)
const fruits = ['apple', 'banana', 'cherry'];
for (const fruit of fruits) {
  console.log(fruit);
}

// for...in loop (for object properties)
const person = { name: 'Alice', age: 30, city: 'New York' };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

## 0.7 Arrays and Array Methods

Arrays are ordered collections of values. JavaScript provides many built-in methods for working with arrays.

```javascript
const numbers = [1, 2, 3, 4, 5];

// map() - Transform each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() - Filter elements based on a condition
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// reduce() - Reduce array to a single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// find() - Find the first element that matches a condition
const found = numbers.find(num => num > 3);
console.log(found); // 4

// forEach() - Execute a function for each element
numbers.forEach(num => console.log(num));
```

## 0.8 Objects and Object Destructuring

Objects are collections of key-value pairs.

```javascript
// Creating an object
const person = {
  name: 'Alice',
  age: 30,
  city: 'New York',
  greet: function() {
    return `Hello, my name is ${this.name}`;
  }
};

// Accessing properties
console.log(person.name); // Alice
console.log(person['age']); // 30

// Object destructuring
const { name, age } = person;
console.log(name); // Alice
console.log(age); // 30

// Destructuring with renaming
const { name: personName, city: personCity } = person;
console.log(personName); // Alice
```

## 0.9 Spread and Rest Operators

The spread (`...`) and rest (`...`) operators are powerful features in modern JavaScript.

```javascript
// Spread operator (expand an array or object)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { a: 1, b: 2, c: 3, d: 4 }

// Rest operator (collect remaining elements)
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

## 0.10 Modules (Import/Export)

JavaScript modules allow you to split your code into separate files and import/export functionality.

```javascript
// math.js (exporting)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// app.js (importing)
import { add, subtract } from './math.js';
console.log(add(5, 3)); // 8

// Default export
// utils.js
const multiply = (a, b) => a * b;
export default multiply;

// app.js
import multiply from './utils.js';
console.log(multiply(4, 5)); // 20
```

## 0.11 Template Literals and String Interpolation

Template literals are particularly useful in React for creating dynamic content and JSX.

```javascript
// Template literals in React context
const userName = 'Alice';
const userAge = 25;

// Creating dynamic JSX content
const greeting = `Welcome back, ${userName}! You are ${userAge} years old.`;

// In React components, this becomes:
// return <h1>{`Welcome back, ${userName}!`}</h1>;
```

## 0.12 Array Methods for React

React heavily relies on array methods for rendering lists and managing data.

```javascript
// Common array methods in React
const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
];

// map() - Most common in React for rendering lists
const userNames = users.map(user => user.name);

// filter() - For conditional rendering
const activeUsers = users.filter(user => user.active);

// find() - For finding specific items
const user = users.find(user => user.id === 2);

// reduce() - For aggregating data
const totalActiveUsers = users.reduce((count, user) => 
  user.active ? count + 1 : count, 0
);
```

## 0.13 Object Spread and Immutability

React requires immutable updates, making spread operator crucial.

```javascript
// Immutable updates (essential in React)
const user = { name: 'Alice', age: 25, city: 'New York' };

// Adding properties
const updatedUser = { ...user, email: 'alice@example.com' };

// Updating properties
const olderUser = { ...user, age: 26 };

// Removing properties
const { age, ...userWithoutAge } = user;

// Nested object updates
const state = {
  user: { name: 'Alice', profile: { theme: 'dark' } }
};

const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      theme: 'light'
    }
  }
};
```

These JavaScript fundamentals form the foundation for understanding and working with React effectively.
