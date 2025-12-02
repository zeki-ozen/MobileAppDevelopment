# Reactive Local Database with Realm

Realm is a MongoDB-backed reactive local database. Its object-oriented schema makes it easy to track relationships, and UI automatically re-renders when collections change. Even if you handle sync manually, mapping JSON from a REST API into Realm is straightforward.

## Example 1: Pulling the Lesson Schedule from an Express REST API and Persisting in Realm
Define an endpoint that serves JSON, open Realm with the same schema, and write incoming records inside a transaction.

```js
// server/schedule.js
import express from 'express';
const app = express();

app.get('/sessions', (req, res) => {
  res.json([
    { id: 101, title: 'AsyncStorage & Cache', day: 'Monday' },
    { id: 102, title: 'Local Databases', day: 'Wednesday' }
  ]);
});

app.listen(3004);
```

```jsx
// realm/schedule.js
import Realm from 'realm';

class Session extends Realm.Object {}
Session.schema = {
  name: 'Session',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    day: 'string'
  }
};

export async function openScheduleRealm() {
  return Realm.open({ schema: [Session] });
}
```

```jsx
// ScheduleScreen.js
import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { openScheduleRealm } from './realm/schedule';

const API_URL = 'http://192.168.1.23:3004/sessions';

export default function ScheduleScreen() {
  const [sessions, setSessions] = useState([]);
  const [realmInstance, setRealmInstance] = useState(null);

  useEffect(() => {
    openScheduleRealm().then((realm) => {
      setRealmInstance(realm);
      const data = realm.objects('Session');
      setSessions([...data]);
      data.addListener(() => setSessions([...data]));
    });
    return () => realmInstance?.close();
  }, []);

  const syncServer = async () => {
    const response = await fetch(API_URL);
    const payload = await response.json();
    realmInstance.write(() => {
      payload.forEach((item) => {
        realmInstance.create('Session', item, Realm.UpdateMode.Modified);
      });
    });
  };

  return (
    <View>
      <Button title="Sync" onPress={syncServer} />
      {sessions.map((session) => (
        <Text key={session.id}>{session.title} - {session.day}</Text>
      ))}
    </View>
  );
}
```

## Example 2: Offline Student Grades and Sending Diffs to Express
Because Realm keeps track of transactions, you can flag dirty records and send PATCH requests only for the modified rows.

```js
// server/grades.js
import express from 'express';
const app = express();
app.use(express.json());

let grades = [
  { id: 1, student: 'Ayse', score: 85 },
  { id: 2, student: 'Mehmet', score: 90 }
];

app.patch('/grades/:id', (req, res) => {
  const id = Number(req.params.id);
  grades = grades.map((grade) => grade.id === id ? { ...grade, ...req.body } : grade);
  res.json(grades.find((grade) => grade.id === id));
});

app.listen(3005);
```

```jsx
// GradeScreen.js
import { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import Realm from 'realm';

class Grade extends Realm.Object {}
Grade.schema = {
  name: 'Grade',
  primaryKey: 'id',
  properties: {
    id: 'int',
    student: 'string',
    score: 'int',
    dirty: { type: 'bool', default: false }
  }
};

export default function GradeScreen() {
  const [realmInstance, setRealmInstance] = useState(null);

  useEffect(() => {
    Realm.open({ schema: [Grade] }).then((realm) => setRealmInstance(realm));
    return () => realmInstance?.close();
  }, []);

  const updateScore = (grade, score) => {
    realmInstance.write(() => {
      realmInstance.create('Grade', { ...grade, score, dirty: true }, Realm.UpdateMode.Modified);
    });
  };

  const syncDirty = async () => {
    const dirtyGrades = realmInstance.objects('Grade').filtered('dirty == true');
    for (const grade of dirtyGrades) {
      await fetch(`http://192.168.1.23:3005/grades/${grade.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: grade.score })
      });
      realmInstance.write(() => {
        grade.dirty = false;
      });
    }
  };

  const grades = realmInstance ? realmInstance.objects('Grade') : [];

  return (
    <View>
      {Array.from(grades).map((grade) => (
        <View key={grade.id}>
          <Text>{grade.student} - {grade.score}</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="New score"
            onSubmitEditing={(event) => updateScore(grade, Number(event.nativeEvent.text))}
          />
        </View>
      ))}
      <Button title="Sync to REST API" onPress={syncDirty} />
    </View>
  );
}
```
