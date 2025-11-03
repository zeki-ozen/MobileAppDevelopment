# SafeAreaView

## Overview
`SafeAreaView` keeps your content away from device cutouts, dynamic islands, and rounded corners—especially important on iOS. In Expo projects it helps maintain consistent spacing for headers, cards, and full-screen layouts. While Android devices do not always require it, using SafeAreaView ensures uniform top and bottom spacing across platforms. When paired with the `react-native-safe-area-context` package, you gain precise control over different device profiles.

## Notable Props
- `style`: Manages background color, alignment, and padding for the protected area—critical for header and footer designs.
- `edges`: Specifies which edges should respect safe-area insets (`top`, `bottom`, `left`, `right`); helpful for notch and gesture-bar regions.
- `mode`: Controls how insets are applied (`padding` by default, or `margin`).
- `children`: The React elements wrapped by the safe area; SafeAreaView usually sits near the root of your layout.
- `SafeAreaProvider` `initialMetrics`: Gives you immediate safe-area values on app launch, preventing layout jumps after the splash screen.
- `useSafeAreaInsets`: A hook that exposes live inset values so you can adjust spacing dynamically (see Example 2).

> Expo recommends the `react-native-safe-area-context` package, which enhances the default SafeAreaView with additional utilities and hooks.

## Key Events
`SafeAreaView` itself does not emit interaction events; it’s focused on layout. Internal components retain their own event behavior inside the protected area. SafeAreaView does support `onLayout`, letting you measure the adjusted dimensions. When using `react-native-safe-area-context`, you can also subscribe to `SafeAreaInsetsContext` to respond to inset changes—for instance, when the device rotates.

## Examples

### Example 1: Onboarding Screen
```jsx
import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const STEPS = [
  {
    title: 'Welcome to the React Native Course',
    description:
      'You will learn core components, navigation, and state management step by step.',
  },
  {
    title: 'Discover Core Components',
    description:
      'Practice building layouts with View, Text, Image, and more.',
  },
  {
    title: 'Kick Off with Expo',
    description:
      'Run `expo start` to launch the project and test on your device in real time.',
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const lastStep = step === STEPS.length - 1;

  const handleNext = () => {
    if (lastStep) {
      setStep(0);
      return;
    }
    setStep((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, justifyContent: 'space-between', padding: 24 }}>
        <View style={{ gap: 16 }}>
          <Text style={{ color: '#38bdf8', fontSize: 16, fontWeight: '600' }}>
            Step {step + 1} / {STEPS.length}
          </Text>
          <Text style={{ color: '#f8fafc', fontSize: 30, fontWeight: '700' }}>
            {STEPS[step].title}
          </Text>
          <Text style={{ color: '#cbd5f5', lineHeight: 22 }}>
            {STEPS[step].description}
          </Text>
        </View>
        <View style={{ gap: 12 }}>
          {lastStep && (
            <Text style={{ color: '#94a3b8', textAlign: 'center' }}>
              You’re ready! Restart the flow any time you need a refresher.
            </Text>
          )}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={{
              paddingVertical: 16,
              borderRadius: 12,
              backgroundColor: lastStep ? '#22c55e' : '#38bdf8',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#0f172a', fontWeight: '700' }}>
              {lastStep ? 'Restart' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: SafeAreaProvider Notched Header
```jsx
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Image, Text, View } from 'react-native';

function HeaderContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#020617' }}>
      <SafeAreaView
        edges={['top']}
        style={{
          backgroundColor: '#0f172a',
          paddingTop: insets.top,
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Image
            source={{
              uri: 'https://avatars.githubusercontent.com/u/499550?v=4',
            }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#f8fafc', fontWeight: '700', fontSize: 18 }}>
              Instructor Dashboard
            </Text>
            <Text style={{ color: '#94a3b8' }}>
              Welcome back! Review the highlights before you go live.
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={{ flex: 1, padding: 24, gap: 16 }}>
        <Text style={{ color: '#f8fafc', fontSize: 20, fontWeight: '600' }}>
          Latest Lessons
        </Text>
        <View
          style={{
            borderRadius: 16,
            padding: 20,
            backgroundColor: '#1f2937',
            gap: 12,
          }}
        >
          <Text style={{ color: '#38bdf8', fontWeight: '700' }}>
            1. Core Components
          </Text>
          <Text style={{ color: '#cbd5f5', lineHeight: 20 }}>
            Recap how to structure layouts with View, Text, and Image, backed by practical examples.
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function NotchedHeaderDemo() {
  return (
    <SafeAreaProvider>
      <HeaderContent />
    </SafeAreaProvider>
  );
}
```

## Tips
- Even if Android devices don’t require dedicated safe-area handling, using SafeAreaView keeps header and footer spacing consistent across platforms.
- Combine SafeAreaView with `useSafeAreaInsets` when you need precise control over padding based on device-specific inset values.
