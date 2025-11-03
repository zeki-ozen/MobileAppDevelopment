# Text

## Overview
`Text` is the primary way to render readable content in React Native. It unifies typography, line wrapping, and accessibility behavior across platforms, providing a consistent experience on both iOS and Android. You can use it for headings, paragraphs, inline labels, or links, and because `Text` is nestable, you can embed other `Text` nodes inside it to compose rich snippets.

## Notable Props
- `style`: Defines typographic attributes such as font family, size, color, line height, and alignment.
- `numberOfLines`: Limits text to a specified number of lines—overflow is clipped or ellipsized based on the chosen mode.
- `ellipsizeMode`: Determines how overflowing text is displayed (`head`, `middle`, `tail`, `clip`); helpful for long titles or card descriptions.
- `selectable`: Lets users select and copy text, which is essential for search or copy-to-clipboard workflows.
- `allowFontScaling`: Controls whether the text responds to the system's dynamic type settings; usually left enabled for accessibility.
- `onTextLayout`: Reports the rendered text line-by-line—useful for animated headlines or line-specific logic.
- `pressRetentionOffset`: Expands or contracts the active press area, improving the link-like tap experience.
- `textBreakStrategy` (Android): Allows you to choose the line-breaking strategy for longer paragraphs.

## Key Events
- `onPress`: Fires when the text is tapped; perfect for link-like behavior.
- `onLongPress`: Triggered on long presses—handy for context menus or tooltips.
- `onLayout`: Called after the text has been laid out, enabling dynamic sizing logic.
- `onPressIn` and `onPressOut`: Capture the moment a press starts and ends, letting you adjust styles for interactive feedback.

## Examples

### Example 1: Rich Text Banner Showcasing Props
```jsx
import { useEffect, useMemo, useState } from 'react';
import { Linking, SafeAreaView, Text, View } from 'react-native';

const HIGHLIGHTS = [
  'Live coding',
  'Q&A',
  'Assignment review',
  'Release announcements',
];

export default function RichTextBanner() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const highlights = useMemo(() => HIGHLIGHTS.join(' · '), []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 24,
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: '800',
            color: '#f8fafc',
          }}
          selectable
        >
          Live React Native Session
        </Text>
        <Text
          style={{
            color: '#22d3ee',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Elapsed time: {seconds}s
        </Text>
        <Text
          style={{
            color: '#94a3b8',
            lineHeight: 22,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          Every week we build real projects live, answer community questions,
          and explore the latest in React Native together.
        </Text>
        <Text
          style={{
            color: '#facc15',
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          Highlights: <Text style={{ fontWeight: '400' }}>{highlights}</Text>
        </Text>
        <Text
          style={{
            color: '#38bdf8',
            textDecorationLine: 'underline',
            fontSize: 16,
          }}
          onPress={() => Linking.openURL('https://reactnative.dev/docs/text')}
        >
          Explore every Text prop in the docs
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: Dynamic Label with Character Counter
```jsx
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';

const MAX_LENGTH = 120;

export default function BioField() {
  const [bio, setBio] = useState('');
  const remaining = MAX_LENGTH - bio.length;
  const limitReached = remaining <= 10;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 24,
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f172a' }}>
          Profile Summary
        </Text>
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#fff',
            padding: 20,
            gap: 12,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <TextInput
            multiline
            maxLength={MAX_LENGTH}
            value={bio}
            onChangeText={setBio}
            placeholder="Introduce yourself in a few sentences..."
            style={{
              minHeight: 120,
              borderWidth: 1,
              borderColor: '#d4d4d8',
              borderRadius: 10,
              padding: 14,
              textAlignVertical: 'top',
            }}
          />
          <Text style={{ color: limitReached ? '#f97316' : '#475569' }}>
            Characters remaining: {remaining}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- Split long passages into smaller `Text` nodes to improve readability and ease of styling.
- While you cannot nest `View` components inside `Text`, you can safely nest other `Text` components to style inline segments differently.
