# TouchableOpacity

## Overview
`TouchableOpacity` wraps any content with a pressable surface that animates opacity changes. In Expo projects it's one of the most versatile building blocks for crafting custom buttons, cards, or interactive list rows. Because you can nest any component inside, it’s straightforward to create brand-aligned interactions or follow specific design-system requirements. While the default feedback is a gentle fade, you can layer in additional styling or animations for richer responses.

## Notable Props
- `onPress`: Fires when the press interaction completes—your primary action handler.
- `activeOpacity`: Sets the opacity applied while pressed (defaults to `0.2`); reinforces the button feel.
- `disabled`: Disables interaction and removes the opacity animation; useful when an action is temporarily unavailable.
- `style`: Controls the appearance of the wrapper; apply padding, shadows, and borders here.
- `hitSlop`: Expands the touch target beyond visible bounds—great for small icon buttons and improved accessibility.
- `delayPressIn` / `delayPressOut`: Delay event firing to filter out accidental taps.
- `android_ripple`: Configures the native ripple on Android so you keep platform-consistent feedback.
- `pressRetentionOffset`: Enlarges the active press area for long-press scenarios.
- `accessibilityRole` and `accessibilityState`: Help screen readers describe the control accurately.

## Key Events
- `onPressIn`: Fires the moment the user touches down—ideal for kicking off instant animations.
- `onPressOut`: Fires when the user lifts their finger—close any press-state visuals here.
- `onLongPress`: Fires after the long-press threshold—perfect for alternate actions or contextual menus.
- `onPress`: Runs when the interaction completes successfully; start your business logic here.

## Examples

### Example 1: Favorite Course Card
```jsx
import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CourseCard() {
  const [isFavorite, setFavorite] = useState(false);
  const courseTitle = 'React Native Core Components';

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
            padding: 24,
            borderRadius: 20,
            backgroundColor: '#1f2937',
            gap: 16,
          }}
        >
          <Text style={{ color: '#f8fafc', fontSize: 20, fontWeight: '700' }}>
            {courseTitle}
          </Text>
          <Text style={{ color: '#cbd5f5', lineHeight: 20 }}>
            Add this course to your favorites for quick access and get notified
            when new lessons drop.
          </Text>
          <TouchableOpacity
            onPress={() => setFavorite((prev) => !prev)}
            activeOpacity={0.7}
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              gap: 8,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 999,
              backgroundColor: isFavorite ? '#f59e0b' : '#334155',
            }}
          >
            <Ionicons
              name={isFavorite ? 'star' : 'star-outline'}
              size={18}
              color="#fef3c7"
            />
            <Text style={{ color: '#fef3c7', fontWeight: '600' }}>
              {isFavorite ? 'In favorites' : 'Add to favorites'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: FAQ Card with Expandable Content
```jsx
import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

const QUESTION = 'How do I share my project with Expo?';
const ANSWER =
  'You can either scan the QR code in the Expo Go app or publish the project with the `expo publish` command.';

export default function FAQItem() {
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
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
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOpacity: 0.04,
            shadowRadius: 12,
            elevation: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => setExpanded((prev) => !prev)}
            activeOpacity={0.6}
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: '600', flex: 1, fontSize: 16 }}>
              {QUESTION}
            </Text>
            <Text style={{ color: '#2563eb', marginLeft: 16, fontSize: 18 }}>
              {expanded ? '−' : '+'}
            </Text>
          </TouchableOpacity>
          {expanded && (
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <Text style={{ color: '#475569', lineHeight: 20 }}>{ANSWER}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- You can nest any combination of text, icons, images, or complex layouts inside `TouchableOpacity`.
- Adjust `activeOpacity` or layer in `Animated` for repeat taps that call for stronger tactile feedback.
