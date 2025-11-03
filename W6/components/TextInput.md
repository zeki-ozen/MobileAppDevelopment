# TextInput

## Overview
`TextInput` is the primary way to collect text-based data from users. In Expo projects it sits at the heart of forms, search bars, chat inputs, and registration screens. It supports both controlled (state-driven) and uncontrolled patterns, giving you performance-friendly options for short text and flexible handling for long-form input. Keyboard management, auto-fill, and secure entry behaviors come baked in with platform-specific optimizations.

## Notable Props
- `value`: Controls the current text being displayed—required for controlled usage.
- `onChangeText`: Fires on every keystroke with the latest value; great for validation flows.
- `placeholder`: Shows helper text while the field is empty, hinting at the expected format.
- `keyboardType`: Sets the virtual keyboard type (`default`, `email-address`, `numeric`, etc.), ensuring the right layout for each scenario.
- `secureTextEntry`: Masks the text for password fields and automatically activates secure behaviors on iOS.
- `autoCapitalize`: Controls automatic capitalization (`none`, `sentences`, `words`, `characters`).
- `autoCorrect`: Enables or disables spell-check—turn it off for search boxes or username fields.
- `returnKeyType`: Chooses the label on the return key (`go`, `next`, `send`, `done`, etc.).
- `maxLength`: Caps the number of characters a user can input.
- `textContentType` (iOS) / `autoComplete` (Android 13+): Taps into the platform auto-fill system for faster input of emails, passwords, and more.
- `selectionColor`: Customizes the caret and selection highlight color.

## Key Events
- `onFocus`: Fires when the input gains focus—ideal for opening keyboards or helper tooltips.
- `onBlur`: Fires when focus is lost—commonly used to trigger validation or persistence.
- `onSubmitEditing`: Runs when the user presses the return/done key; helps move through multi-step forms.
- `onChange`: Similar to `onChangeText` but provides the raw event object.
- `onEndEditing`: Fires when the user finishes editing; useful for heavier tasks such as network requests.
- `onSelectionChange`: Reports caret or selection range changes—essential for rich text editors.
- `onKeyPress`: Listens for physical or virtual key presses, letting you implement keyboard shortcuts.

## Examples

### Example 1: Email Field with Instant Validation
```jsx
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailField() {
  const [value, setValue] = useState('');
  const isValid = EMAIL_REGEX.test(value);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#1f2937',
            padding: 24,
            gap: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#f1f5f9' }}>
            Verify your email address
          </Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="name@example.com"
            placeholderTextColor="#94a3b8"
            style={{
              borderWidth: 1,
              borderColor:
                value.length === 0
                  ? '#334155'
                  : isValid
                  ? '#22c55e'
                  : '#ef4444',
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 12,
              color: '#f8fafc',
            }}
          />
          <Text style={{ color: isValid ? '#22c55e' : '#f97316' }}>
            {value.length === 0
              ? 'Start typing your email address.'
              : isValid
              ? 'Looks like a valid address.'
              : 'Please enter a valid email address.'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: Search Bar Filtering a List
```jsx
import { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';

const LESSONS = [
  { id: '1', title: 'Intro to React Native' },
  { id: '2', title: 'Working with Expo' },
  { id: '3', title: 'Navigation Basics' },
  { id: '4', title: 'State Management' },
  { id: '5', title: 'Performance Tips' },
];

export default function SearchableList() {
  const [query, setQuery] = useState('');

  const filteredLessons = useMemo(() => {
    const lowered = query.toLowerCase();
    return LESSONS.filter((lesson) =>
      lesson.title.toLowerCase().includes(lowered)
    );
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ flex: 1, padding: 24, gap: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f172a' }}>
          Search the lesson archive
        </Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search lessons..."
          returnKeyType="search"
          style={{
            borderWidth: 1,
            borderColor: '#cbd5f5',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            backgroundColor: '#fff',
          }}
        />
        <FlatList
          data={filteredLessons}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: '#e0f2fe',
              }}
            >
              <Text style={{ color: '#1f2937' }}>
                No lessons match your search.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: '#e0f2fe',
              }}
            >
              <Text style={{ fontWeight: '600', color: '#0f172a' }}>
                {item.title}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- Wrap long forms in `KeyboardAvoidingView` to prevent the keyboard from covering focused fields.
- Evaluate whether controlled or uncontrolled inputs suit your performance needs before wiring up heavy state logic.
