# Fast Key-Value Persistence with AsyncStorage

`@react-native-async-storage/async-storage` provides a lightweight key-value API for persisting user preferences, tokens, or small caches so the data stays available after the app restarts. Because it is promise-based, you can chain it with REST API calls and write server responses to disk with minimal boilerplate.

## Example 1: Caching Notes Pulled from an Express REST API
Instead of fetching the note list every time the user logs in, write the payload to AsyncStorage and show it even in offline scenarios.

```js
// server/index.js (Express 4+)
import express from 'express';
const app = express();

const notes = [
  { id: 1, title: 'Data Storage', content: 'Cache with AsyncStorage.' },
  { id: 2, title: 'REST API', content: 'Serve JSON via Express.' }
];

app.get('/notes', (req, res) => res.json(notes));
app.listen(3000, () => console.log('REST API running on http://localhost:3000'));
```

```jsx
// NotesCacheScreen.js
import { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_URL = 'http://192.168.1.23:3000/notes'; // replace with your LAN IP

export default function NotesCacheScreen() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFromCache = async () => {
    const cached = await AsyncStorage.getItem('notes');
    if (cached) {
      setNotes(JSON.parse(cached));
    }
  };

  const syncWithServer = async () => {
    setLoading(true);
    const response = await fetch(NOTES_URL);
    const payload = await response.json();
    await AsyncStorage.setItem('notes', JSON.stringify(payload));
    setNotes(payload);
    setLoading(false);
  };

  useEffect(() => {
    loadFromCache();
    syncWithServer();
  }, []);

  return (
    <View>
      <Button title="Sync with Server" onPress={syncWithServer} disabled={loading} />
      {loading && <ActivityIndicator />}
      {notes.map((note) => (
        <Text key={note.id}>{note.title}: {note.content}</Text>
      ))}
    </View>
  );
}
```

## Example 2: Persisting Tokens and Refreshing Sessions with Express
Store the JWT returned after authentication and automatically attach it to headers when the app launches.

```js
// server/auth.js
import express from 'express';
const app = express();
app.use(express.json());

app.post('/auth/login', (req, res) => {
  // demo token
  res.json({ token: 'demo-jwt', user: { id: 7, name: 'Coder' } });
});

app.get('/profile', (req, res) => {
  if (req.headers.authorization === 'Bearer demo-jwt') {
    return res.json({ id: 7, lessons: ['AsyncStorage', 'SQLite'] });
  }
  res.status(401).json({ error: 'Unauthorized' });
});

app.listen(3001);
```

```jsx
// AuthProvider.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

async function login(credentials) {
  const response = await fetch('http://192.168.1.23:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  await AsyncStorage.setItem('token', data.token);
  return data;
}

async function getProfile() {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch('http://192.168.1.23:3001/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then((profile) => setUser(profile)).catch(() => {});
  }, []);

  const value = {
    user,
    login: async () => {
      const data = await login({ email: 'demo@school.edu', password: '1234' });
      setUser(await getProfile());
      return data;
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```
