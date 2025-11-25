# RadioButton

## Overview
Because React Native core no longer ships a ready-made radio control, Expo projects typically implement one with `Pressable` or rely on UI kits such as `react-native-paper` or `@rneui/themed`. Building your own component keeps the look aligned with your typography and color system. Radio buttons shine in single-choice forms, picking a lesson track, or flipping app themes.

## Notable Props (custom component)
- `value`: Unique identifier inside the radio group.
- `isSelected`: Boolean flag for the active option.
- `label`: Text that appears next to the control.
- `onPress(value)`: Callback fired when selection changes.
- `disabled`: Turns interaction off when prerequisites are missing.
- `size`, `activeColor`, `inactiveColor`: Common style props to keep visuals consistent.

## Key Events
- `onPress`: Delivered through Pressable/TouchableOpacity to commit the new value to state.
- `onAccessibilityTap`: Updates selection in accessibility mode; pair with `accessibilityRole="radio"`.

## Examples

### Example 1: Module Selection
```jsx
import { useState } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';

const MODULES = [
  { id: 'core', title: 'Core Components' },
  { id: 'state', title: 'State & Props' },
  { id: 'nav', title: 'Navigation' },
];

function RadioItem({ label, value, isSelected, onPress }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      onPress={() => onPress(value)}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 2,
          borderColor: isSelected ? '#38bdf8' : '#475569',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isSelected && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#38bdf8',
            }}
          />
        )}
      </View>
      <Text style={{ color: '#e2e8f0', fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}

export default function ModuleSelector() {
  const [value, setValue] = useState('core');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a', padding: 24 }}>
      <Text style={{ color: '#94a3b8' }}>Active Module</Text>
      <Text style={{ color: '#e2e8f0', fontSize: 22, fontWeight: '700', marginBottom: 16 }}>
        {MODULES.find((item) => item.id === value)?.title}
      </Text>
      {MODULES.map((item) => (
        <RadioItem
          key={item.id}
          label={item.title}
          value={item.id}
          isSelected={value === item.id}
          onPress={setValue}
        />
      ))}
    </SafeAreaView>
  );
}
```

### Example 2: FlatList-powered Track Picker
```jsx
import { useState } from 'react';
import { SafeAreaView, FlatList, View, Text, Pressable } from 'react-native';

const TRACKS = [
  { id: 'foundation', label: 'Foundation · Layout' },
  { id: 'growth', label: 'Growth · Networking' },
  { id: 'advanced', label: 'Advanced · Performance' },
  { id: 'capstone', label: 'Capstone · Final Project' },
];

export default function TrackSelector() {
  const [selected, setSelected] = useState('foundation');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617', paddingTop: 24 }}>
      <FlatList
        data={TRACKS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        renderItem={({ item }) => {
          const isActive = item.id === selected;
          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ selected: isActive }}
              onPress={() => setSelected(item.id)}
              style={{
                backgroundColor: isActive ? '#172554' : '#0f172a',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: isActive ? '#38bdf8' : '#1e293b',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: isActive ? '#38bdf8' : '#475569',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isActive && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#38bdf8',
                    }}
                  />
                )}
              </View>
              <Text style={{ color: '#e2e8f0', fontSize: 16 }}>{item.label}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
```

## Tips
- Use `accessibilityRole="radiogroup"` on the wrapping View so screen readers announce the set correctly.
- Wrap `onPress` handlers with `useCallback` when radios live inside large lists to avoid re-renders.
- If the option list grows too long, switch to Picker or a modal sheet to reduce clutter.
- UI kits such as `react-native-paper` or `native-base` provide drop-in radio buttons when speed matters more than custom visuals.
