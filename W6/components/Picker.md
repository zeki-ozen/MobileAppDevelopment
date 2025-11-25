# Picker

## Overview
`Picker` renders a dropdown or wheel-style selector depending on the platform. Because the default React Native core Picker component was deprecated, Expo projects typically install `@react-native-picker/picker` for this behavior. It's essential whenever you want to limit a value to a curated list—course levels, preferred languages, or color themes—without building a custom dropdown from scratch.

## Notable Props
- `selectedValue`: The currently active value. Control it via React state for predictable updates.
- `onValueChange(value, index)`: Fires when the user selects a row. Your main hook for updating state, syncing APIs, or dispatching analytics.
- `mode`: `"dialog"` (default on Android) or `"dropdown"`. Choose based on how immersive or inline you need the control to feel.
- `enabled`: Toggles interaction. Useful when data is loading or locked behind prerequisites.
- `style` and `itemStyle`: Customize font, color, and spacing on iOS. Combine with wrapper Views on Android for consistent design.
- `dropdownIconColor` / `dropdownIconRippleColor`: Android-specific props for branding dropdown affordances.

## Key Events
- `onValueChange`: The only event Picker exposes, but it provides both the selected value and the new index. Combine with derived state to trigger dependent logic (fetching lessons, updating charts, etc.).

## Examples

### Example 1: Course Level Selector
```jsx
import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const COURSE_LEVELS = [
  { id: 'foundation', label: 'Foundation · Components' },
  { id: 'growth', label: 'Growth · Navigation' },
  { id: 'advanced', label: 'Advanced · Performance' },
];

export default function CourseLevelPicker() {
  const [level, setLevel] = useState('foundation');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a', padding: 24 }}>
      <Text style={{ color: '#94a3b8', fontSize: 16 }}>Aktif Ders Bloğu</Text>
      <Text style={{ color: '#e2e8f0', fontSize: 28, fontWeight: '700' }}>
        {COURSE_LEVELS.find((item) => item.id === level)?.label}
      </Text>

      <View style={{ marginTop: 32, backgroundColor: '#1e293b', borderRadius: 12 }}>
        <Picker
          selectedValue={level}
          onValueChange={(value) => setLevel(value)}
          style={{ color: '#e2e8f0' }}
          dropdownIconColor="#38bdf8"
        >
          {COURSE_LEVELS.map((item) => (
            <Picker.Item
              key={item.id}
              label={item.label}
              value={item.id}
              color="#e2e8f0"
            />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: Session Filter + Dependent List
```jsx
import { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SESSIONS = [
  { id: '1', title: 'Intro to View', track: 'foundation' },
  { id: '2', title: 'Layout Playground', track: 'foundation' },
  { id: '3', title: 'State Drill', track: 'growth' },
  { id: '4', title: 'FlatList Patterns', track: 'growth' },
  { id: '5', title: 'Perf Budgeting', track: 'advanced' },
];

export default function ScheduleFilter() {
  const [track, setTrack] = useState('foundation');
  const filtered = useMemo(
    () => SESSIONS.filter((session) => session.track === track),
    [track]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617', padding: 24 }}>
      <View
        style={{
          backgroundColor: '#1e293b',
          borderRadius: 14,
          paddingHorizontal: 12,
        }}
      >
        <Picker
          selectedValue={track}
          onValueChange={(value) => setTrack(value)}
          mode="dropdown"
          dropdownIconColor="#f97316"
        >
          <Picker.Item label="Foundation Track" value="foundation" />
          <Picker.Item label="Growth Track" value="growth" />
          <Picker.Item label="Advanced Track" value="advanced" />
        </Picker>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, marginTop: 24 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#0f172a',
              padding: 18,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#1f2937',
            }}
          >
            <Text style={{ color: '#e2e8f0', fontSize: 16, fontWeight: '600' }}>
              {item.title}
            </Text>
            <Text style={{ color: '#94a3b8', marginTop: 4 }}>
              {track === 'foundation' ? 'Temel' : track === 'growth' ? 'Orta' : 'İleri'} seviye
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#94a3b8', textAlign: 'center', marginTop: 32 }}>
            Bu track için oturum planlanmadı.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
```

## Tips
- Install the package with `npx expo install @react-native-picker/picker` to ensure native modules are configured for Expo-managed projects.
- Wrap Picker in a styled `View` to get consistent backgrounds on Android; direct styling only affects text.
- When pairing with forms, sync Picker state to validation schema (Formik, React Hook Form) to keep error messaging in sync.
- For long option lists, consider fetching asynchronously and disabling the control until data arrives to avoid empty wheels.
