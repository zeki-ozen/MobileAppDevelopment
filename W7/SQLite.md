# Structured Local Data with Expo SQLite

SQLite brings relational structure to the device so you can run complex list, filtering, and query operations offline. In Expo apps you can `import * as SQLite from 'expo-sqlite';` without dealing with native builds.

## Example 1: Writing Workout Plans from an Express REST API into a Local Table
The server returns a workout list as JSON; on launch the records are inserted into a SQLite table and displayed through a `SELECT` query.

```js
// server/workouts.js
import express from 'express';
const app = express();

const workouts = [
  { id: 1, title: 'Squat', reps: 12 },
  { id: 2, title: 'Push Up', reps: 20 }
];

app.get('/workouts', (req, res) => res.json(workouts));
app.listen(3002, () => console.log('Express REST API /workouts ready'));
```

```jsx
// WorkoutScreen.js
import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fitness.db');
const API_URL = 'http://192.168.1.23:3002/workouts';

function run(query, params = []) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query, params, (_, result) => resolve(result), (_, error) => reject(error));
    });
  });
}

async function init() {
  await run('CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY NOT NULL, title TEXT, reps INT);');
}

export default function WorkoutScreen() {
  const [items, setItems] = useState([]);

  const loadFromDb = async () => {
    const result = await run('SELECT * FROM workouts');
    setItems(result.rows._array);
  };

  const syncServer = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    await run('DELETE FROM workouts');
    await Promise.all(
      data.map((item) => run('INSERT INTO workouts (id, title, reps) VALUES (?, ?, ?)', [item.id, item.title, item.reps]))
    );
    loadFromDb();
  };

  useEffect(() => {
    init().then(loadFromDb).then(syncServer);
  }, []);

  return (
    <View>
      <Button title="Refresh from Server" onPress={syncServer} />
      {items.map((item) => (
        <Text key={item.id}>{item.title} - {item.reps} reps</Text>
      ))}
    </View>
  );
}
```

## Example 2: Queueing Form Responses Locally and Flushing to Express
SQLite is great for storing unsent form submissions; whenever the network is available hit the REST endpoint with pending rows.

```js
// server/feedback.js
import express from 'express';
const app = express();
app.use(express.json());

app.post('/feedback', (req, res) => {
  console.log('New feedback', req.body);
  res.status(201).json({ status: 'ok' });
});

app.listen(3003);
```

```jsx
// FeedbackQueue.js
import { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('feedback.db');
const API_URL = 'http://192.168.1.23:3003/feedback';

const exec = (sql, params = []) => new Promise((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(sql, params, (_, result) => resolve(result), (_, error) => reject(error));
  });
});

async function bootstrap() {
  await exec('CREATE TABLE IF NOT EXISTS queue (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, synced INT DEFAULT 0);');
}

export default function FeedbackQueue() {
  const [text, setText] = useState('');
  const [queue, setQueue] = useState([]);

  const refresh = async () => {
    const result = await exec('SELECT * FROM queue');
    setQueue(result.rows._array);
  };

  const saveLocally = async () => {
    await exec('INSERT INTO queue (message, synced) VALUES (?, 0)', [text]);
    setText('');
    refresh();
  };

  const flushToServer = async () => {
    const pending = queue.filter((item) => item.synced === 0);
    for (const item of pending) {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: item.message })
      });
      await exec('UPDATE queue SET synced = 1 WHERE id = ?', [item.id]);
    }
    refresh();
  };

  useEffect(() => {
    bootstrap().then(refresh);
  }, []);

  return (
    <View>
      <TextInput value={text} onChangeText={setText} placeholder="Share your thoughts" />
      <Button title="Save" onPress={saveLocally} />
      <Button title="Send to REST API" onPress={flushToServer} />
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.message} {item.synced ? '(sent)' : '(pending)'}
          </Text>
        )}
      />
    </View>
  );
}
```
