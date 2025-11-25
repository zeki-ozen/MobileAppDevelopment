# Checkbox

## Overview
Expo projects typically rely on either the `expo-checkbox` package or `@react-native-community/checkbox`. Both render native iOS/Android widgets and expose a minimal API centered around `value` and `onValueChange`. Use checkboxes when the user can toggle multiple items, complete lesson prep, or confirm policies.

## Notable Props (expo-checkbox)
- `value`: Boolean seçili durumu; React state ile kontrol edilir.
- `onValueChange(nextValue)`: Kullanıcı etkileşimiyle tetiklenir; state veya form kütüphanesine yeni değeri iletirsiniz.
- `color`: İşaretli durumdaki doldurma veya kenarlık rengini değiştirir (platforma göre).
- `disabled`: İletişimi geçici olarak kapatır; veri yüklenirken veya koşul sağlanmadığında kullanın.
- `style`: Konteyner düzeyinde boyutlandırma ve hizalama sağlar.

## Key Events
- `onValueChange`: Ana olaydır; `onPress` veya `Pressable` kullanmadan state güncellemenizi sağlar.

## Examples

### Example 1: Lesson Task List
```jsx
import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

const TASKS = [
  { id: 'slides', label: 'Review the new slides' },
  { id: 'demo', label: 'Run the Image + ScrollView demo' },
  { id: 'prep', label: 'Draft the Q&A scenarios' },
];

export default function LessonChecklist() {
  const [completed, setCompleted] = useState({});

  const toggleTask = (taskId, value) => {
    setCompleted((prev) => ({ ...prev, [taskId]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a', padding: 24, gap: 16 }}>
      <Text style={{ color: '#e2e8f0', fontSize: 22, fontWeight: '700' }}>W6 Prep</Text>
      {TASKS.map((task) => (
        <View
          key={task.id}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }}
        >
          <Checkbox
            value={!!completed[task.id]}
            onValueChange={(value) => toggleTask(task.id, value)}
            color={completed[task.id] ? '#22c55e' : undefined}
            style={{ width: 22, height: 22, borderRadius: 6 }}
          />
          <Text
            style={{
              color: '#e2e8f0',
              textDecorationLine: completed[task.id] ? 'line-through' : 'none',
            }}
          >
            {task.label}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
```

### Example 2: Participant Settings Form
```jsx
import { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

const SETTINGS = [
  { id: 'recordings', label: 'Share session recordings' },
  { id: 'reminders', label: 'Send a reminder 1 hour before class' },
  { id: 'survey', label: 'Trigger a mini survey after each lesson' },
];

export default function ParticipantSettings() {
  const [options, setOptions] = useState(
    SETTINGS.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );

  const allActive = useMemo(() => Object.values(options).some(Boolean), [options]);

  const toggle = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617', padding: 24 }}>
      <Text style={{ color: '#e2e8f0', fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
        Participant Settings
      </Text>
      {SETTINGS.map((setting) => (
        <View
          key={setting.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
          }}
        >
          <Text style={{ color: '#e2e8f0', fontSize: 16 }}>{setting.label}</Text>
          <Checkbox
            value={options[setting.id]}
            onValueChange={(value) => toggle(setting.id, value)}
            color={options[setting.id] ? '#38bdf8' : undefined}
          />
        </View>
      ))}

      <TouchableOpacity
        style={{
          marginTop: 32,
          backgroundColor: allActive ? '#38bdf8' : '#334155',
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: 'center',
        }}
        disabled={!allActive}
      >
        <Text style={{ color: '#0f172a', fontWeight: '700' }}>Save Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
```

## Tips
- Install the dependency with `npx expo install expo-checkbox`; bare RN apps can drop in `@react-native-community/checkbox` with the same API.
- Wrap the checkbox with `Pressable` or add `hitSlop` to make small targets easier to tap.
- When using form libraries (Formik, React Hook Form), wire the checkbox through their `Controller` components to keep validation in sync.
- Before sending the selection to an API, filter `Object.entries(options)` and only transmit the keys with `true` values to keep payloads small.
