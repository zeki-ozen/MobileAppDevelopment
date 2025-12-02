# High-Performance Key-Value Storage with MMKV

MMKV is a C++ powered, extremely fast key-value storage engine built by Facebook. With the `react-native-mmkv` package you can persist data without waiting on bridges or JSON serialization, making it ideal for frequently accessed settings or cached state.

## Example 1: Fetching Synchronous Settings from an Express REST API
Pull user settings through Express and write them into MMKV so they are instantly available the next time the app boots up.

```js
// server/settings.js
import express from 'express';
const app = express();

app.get('/settings', (req, res) => {
  res.json({ theme: 'dark', notifications: true, syncInterval: 15 });
});

app.listen(3006, () => console.log('Settings REST API running'));
```

```jsx
// SettingsStore.js
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const API_URL = 'http://192.168.1.23:3006/settings';

export async function syncSettings() {
  const response = await fetch(API_URL);
  const data = await response.json();
  storage.set('settings', JSON.stringify(data));
  return data;
}

export function getSettings() {
  const value = storage.getString('settings');
  return value ? JSON.parse(value) : null;
}
```

```jsx
// SettingsScreen.js
import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { syncSettings, getSettings } from './SettingsStore';

export default function SettingsScreen() {
  const [settings, setSettings] = useState(getSettings());

  const handleSync = async () => {
    const newSettings = await syncSettings();
    setSettings(newSettings);
  };

  useEffect(() => {
    if (!settings) {
      handleSync();
    }
  }, []);

  return (
    <View>
      <Button title="Refresh Settings" onPress={handleSync} />
      {settings && (
        <Text>{`Theme: ${settings.theme}, Notifications: ${settings.notifications}, Interval: ${settings.syncInterval}m`}</Text>
      )}
    </View>
  );
}
```

## Example 2: Drafting Session Data Locally Before Posting to Express
Because MMKV is synchronous, you can persist form fields before the submission succeeds and restore them if the app restarts.

```js
// server/sessions.js
import express from 'express';
const app = express();
app.use(express.json());

app.post('/sessions', (req, res) => {
  console.log('New session', req.body);
  res.status(201).json({ status: 'session stored' });
});

app.listen(3007);
```

```jsx
// SessionDraft.js
import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const API_URL = 'http://192.168.1.23:3007/sessions';

export default function SessionDraft() {
  const [topic, setTopic] = useState(storage.getString('session_topic') || '');
  const [speaker, setSpeaker] = useState(storage.getString('session_speaker') || '');
  const [status, setStatus] = useState('');

  const persistDraft = (key, value) => {
    storage.set(key, value);
  };

  const submitSession = async () => {
    const payload = { topic, speaker };
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setStatus('Submitted');
    storage.delete('session_topic');
    storage.delete('session_speaker');
  };

  return (
    <View>
      <TextInput
        value={topic}
        placeholder="Session Title"
        onChangeText={(value) => {
          setTopic(value);
          persistDraft('session_topic', value);
        }}
      />
      <TextInput
        value={speaker}
        placeholder="Speaker"
        onChangeText={(value) => {
          setSpeaker(value);
          persistDraft('session_speaker', value);
        }}
      />
      <Button title="Send to REST API" onPress={submitSession} />
      {status ? <Text>{status}</Text> : null}
    </View>
  );
}
```
