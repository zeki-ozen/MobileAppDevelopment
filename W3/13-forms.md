# 13. Forms and Controlled Components

Forms are an essential part of web applications. In React, form elements work differently than in traditional HTML because React maintains control over the form data.

## 13.1 Controlled Components

In HTML, form elements like `<input>`, `<textarea>`, and `<select>` maintain their own state. In React, we make React state the "single source of truth" by controlling these elements. This is called a **controlled component**.

```jsx
// Example: Controlled Input
import React, { useState } from 'react';

function ControlledInput() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
      <p>Current value: {name}</p>
    </form>
  );
}
```

## 13.2 Handling Multiple Inputs

When you have multiple controlled inputs, you can use a single state object and update it based on the input's `name` attribute.

```jsx
// Example: Multiple Inputs
import React, { useState } from 'react';

function MultipleInputs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 13.3 Textarea

In React, `<textarea>` uses a `value` attribute instead of children.

```jsx
// Example: Textarea
function TextareaExample() {
  const [message, setMessage] = useState('');

  return (
    <form>
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          cols="50"
        />
      </label>
      <p>Character count: {message.length}</p>
    </form>
  );
}
```

## 13.4 Select Dropdown

In React, `<select>` uses a `value` attribute on the root `select` tag instead of using `selected` on individual options.

```jsx
// Example: Select Dropdown
function SelectExample() {
  const [selectedFruit, setSelectedFruit] = useState('apple');

  return (
    <form>
      <label>
        Pick your favorite fruit:
        <select value={selectedFruit} onChange={(e) => setSelectedFruit(e.target.value)}>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
          <option value="date">Date</option>
        </select>
      </label>
      <p>You selected: {selectedFruit}</p>
    </form>
  );
}
```

## 13.5 Checkbox

Checkboxes use the `checked` attribute instead of `value`.

```jsx
// Example: Checkbox
function CheckboxExample() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <form>
      <label>
        <input
          type="checkbox"
          checked={isSubscribed}
          onChange={(e) => setIsSubscribed(e.target.checked)}
        />
        Subscribe to newsletter
      </label>
      <p>Subscribed: {isSubscribed ? 'Yes' : 'No'}</p>
    </form>
  );
}
```

## 13.6 Radio Buttons

Radio buttons are grouped by the `name` attribute and use the `checked` attribute.

```jsx
// Example: Radio Buttons
function RadioExample() {
  const [selectedOption, setSelectedOption] = useState('option1');

  return (
    <form>
      <label>
        <input
          type="radio"
          name="options"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        Option 1
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="options"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        Option 2
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="options"
          value="option3"
          checked={selectedOption === 'option3'}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        Option 3
      </label>
      <p>Selected: {selectedOption}</p>
    </form>
  );
}
```

## 13.7 Form Validation

You can add validation logic to your forms to ensure data integrity.

```jsx
// Example: Form Validation
function FormValidation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted successfully!');
      // Submit form data
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 13.8 Uncontrolled Components

In some cases, you might want to use uncontrolled components where form data is handled by the DOM itself. You can use refs to access form values.

```jsx
// Example: Uncontrolled Component
import React, { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted name: ${nameRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={nameRef} defaultValue="John Doe" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Note**: Controlled components are generally recommended as they give you more control over form data and validation.

Understanding forms and controlled components is crucial for building interactive React applications that handle user input effectively.
