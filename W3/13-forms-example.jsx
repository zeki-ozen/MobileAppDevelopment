import React, { useState } from 'react';

// Controlled Components
function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    interests: [],
    newsletter: false,
    country: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'interests') {
        setFormData(prev => ({
          ...prev,
          interests: checked 
            ? [...prev.interests, value]
            : prev.interests.filter(interest => interest !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        name: '',
        email: '',
        age: '',
        gender: '',
        interests: [],
        newsletter: false,
        country: '',
        message: ''
      });
    }
  };

  return (
    <div>
      <h2>Controlled Form with Validation</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Name: *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: errors.name ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
          {errors.name && <div style={{ color: 'red', fontSize: '14px' }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Email: *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: errors.email ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
          {errors.email && <div style={{ color: 'red', fontSize: '14px' }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Age: *
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="1"
              max="120"
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: errors.age ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
          {errors.age && <div style={{ color: 'red', fontSize: '14px' }}>{errors.age}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Gender: *</label>
          <div style={{ marginTop: '5px' }}>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleInputChange}
              />
              Other
            </label>
          </div>
          {errors.gender && <div style={{ color: 'red', fontSize: '14px' }}>{errors.gender}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Interests: *</label>
          <div style={{ marginTop: '5px' }}>
            {['Technology', 'Sports', 'Music', 'Travel', 'Reading'].map(interest => (
              <label key={interest} style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleInputChange}
                  style={{ marginRight: '8px' }}
                />
                {interest}
              </label>
            ))}
          </div>
          {errors.interests && <div style={{ color: 'red', fontSize: '14px' }}>{errors.interests}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Country: *
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: errors.country ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="">Select a country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
              <option value="tr">Turkey</option>
            </select>
          </label>
          {errors.country && <div style={{ color: 'red', fontSize: '14px' }}>{errors.country}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            Subscribe to newsletter
          </label>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// Uncontrolled Components
function UncontrolledForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Uncontrolled form data:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              defaultValue=""
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              defaultValue=""
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              name="newsletter"
              value="yes"
              style={{ marginRight: '8px' }}
            />
            Subscribe to newsletter
          </label>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// Form with Custom Hook
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    if (validate) {
      const fieldError = validate(name, values[name]);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    
    if (validate) {
      const newErrors = {};
      Object.keys(values).forEach(field => {
        const fieldError = validate(field, values[field]);
        if (fieldError) {
          newErrors[field] = fieldError;
        }
      });
      
      setErrors(newErrors);
      setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      
      if (Object.keys(newErrors).length === 0) {
        onSubmit(values);
      }
    } else {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  };
}

function CustomHookForm() {
  const validate = (field, value) => {
    switch (field) {
      case 'username':
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { username: '', password: '' },
    validate
  );

  const onSubmit = (formData) => {
    console.log('Custom hook form submitted:', formData);
    alert('Login successful!');
  };

  return (
    <div>
      <h2>Form with Custom Hook</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: errors.username && touched.username ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
          {errors.username && touched.username && (
            <div style={{ color: 'red', fontSize: '14px' }}>{errors.username}</div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: errors.password && touched.password ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
          {errors.password && touched.password && (
            <div style={{ color: 'red', fontSize: '14px' }}>{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Forms Examples</h1>
      
      <div style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <ControlledForm />
      </div>

      <div style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <UncontrolledForm />
      </div>

      <div style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <CustomHookForm />
      </div>
    </div>
  );
}

export default App;
