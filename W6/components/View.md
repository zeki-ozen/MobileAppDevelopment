# View

## Overview
`View` is the fundamental container component in React Native. When you scaffold a project with Expo's Blank (JavaScript) template, it is the first building block you reach for to establish layout. It behaves similarly to a `div` on the web, but relies entirely on the flexbox model for positioning. By composing visible or invisible containers you can orchestrate alignment, spacing, shadows, and many other visual behaviors.

## Notable Props
- `style`: Defines visual properties such as flexbox layout, background color, border, shadow, and opacity.
- `pointerEvents`: Controls whether touch interactions are passed through to child components—critical for overlay scenarios.
- `accessible`: Determines whether the component should be announced in accessibility mode.
- `accessibilityLabel`: Provides a descriptive label for screen readers.
- `accessibilityRole` and `accessibilityHint`: Clarify how container Views should be interpreted by assistive technologies.
- `collapsable`: Controls whether empty Views are removed from the layout tree on Android, helping with performance.
- `focusable`: Allows the View to receive focus on keyboard or TV platforms.
- `testID`: Makes it easier for automation tools to uniquely locate the View.

## Key Events
- `onLayout`: Fires when the component is laid out or its dimensions change; useful when you need width/height information.
- `onStartShouldSetResponder` and `onMoveShouldSetResponder`: Let you take control of complex touch interactions and own the gesture system.
- `onAccessibilityTap`: Handles special touch shortcuts for users relying on accessibility features.
- `onResponderGrant`, `onResponderMove`, `onResponderRelease`: Trigger at different stages of the gesture cycle, enabling drag-and-drop or swipe interactions.

## Examples

### Example 1: Dashboard Card with Stats
```jsx
import { SafeAreaView, View, Text } from 'react-native';

export default function DashboardCard() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617' }}>
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
            backgroundColor: '#0f172a',
            gap: 20,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#e2e8f0', fontSize: 18, fontWeight: '600' }}>
              Daily Lesson Progress
            </Text>
            <Text style={{ color: '#38bdf8', fontWeight: '600' }}>+12%</Text>
          </View>
          <View
            style={{
              height: 8,
              borderRadius: 8,
              backgroundColor: '#1e293b',
            }}
          >
            <View
              style={{
                width: '65%',
                height: '100%',
                borderRadius: 8,
                backgroundColor: '#38bdf8',
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#94a3b8' }}>Lessons completed</Text>
            <Text style={{ color: '#e2e8f0', fontWeight: '600' }}>13 / 20</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: Responsive Grid with onLayout
```jsx
import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

const COURSES = [
  'Core Components',
  'State Management',
  'Navigation',
  'Performance',
  'Testing',
  'Deployment',
];

export default function ResponsiveGrid() {
  const [cardsPerRow, setCardsPerRow] = useState(2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View
        style={{ flex: 1, padding: 24 }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setCardsPerRow(width > 500 ? 3 : 2);
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16 }}>
          Course Topics
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {COURSES.map((title) => (
            <View
              key={title}
              style={{
                width: `${100 / cardsPerRow - 4}%`,
                padding: 18,
                borderRadius: 16,
                backgroundColor: '#e2e8f0',
              }}
            >
              <Text style={{ fontWeight: '600', color: '#1f2937' }}>
                {title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- Keep container styles maintainable by centralizing shared values in theme files or `StyleSheet.create`.
- Be mindful of performance when building deep View hierarchies inside scrollable components like ScrollView.
