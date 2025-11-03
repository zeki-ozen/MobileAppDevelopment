# Button

## Overview
`Button` is a high-level component for quickly adding tappable actions in Expo projects. Because it renders the platform's native button by default, iOS and Android users get a familiar look without any extra styling. It offers limited customization around text, color, and accessibility, which makes it perfect for rapid prototyping or simple single-action flows. For more advanced scenarios—such as icon buttons or multi-state interactions—consider building a custom component with `Pressable`, `TouchableOpacity`, or `TouchableHighlight`.

## Notable Props
- `title`: Defines the text displayed on the button.
- `onPress`: Fires when the button is tapped and kicks off your business logic.
- `color`: Controls the text color on iOS and the background color on Android—great for matching brand accents.
- `disabled`: Temporarily deactivates the button and adjusts visual feedback to signal that the action is unavailable.
- `accessibilityLabel`: Provides an explicit description for assistive technologies, clarifying the button's context.
- `accessibilityRole`: Defaults to `button`, but you can supply alternative roles when necessary.
- `testID`: Supplies a deterministic identifier for automated testing tools.
- `touchSoundDisabled` (Android only): Turns off the system touch sound for quieter interactions.

## Key Events
- `onPress`: Fires when the user taps the button; a brief ripple/opacity animation runs before the handler executes.
- Other gesture events (e.g., `onPressIn`, `onPressOut`) are not exposed on `Button`; switch to `Pressable` when you need that granular control.

## Examples

### Example 1: Sum Calculator
```jsx
import { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';

export default function SumCalculator() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [result, setResult] = useState(null);

  const handleSum = () => {
    const total = Number(first) + Number(second);
    setResult(Number.isFinite(total) ? total : null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 24,
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#0f172a' }}>
          Add two numbers
        </Text>
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#fff',
            padding: 20,
            gap: 16,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 12,
            elevation: 2,
          }}
        >
          <TextInput
            placeholder="First number"
            keyboardType="numeric"
            value={first}
            onChangeText={setFirst}
            style={{
              borderWidth: 1,
              borderColor: '#d4d4d8',
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          />
          <TextInput
            placeholder="Second number"
            keyboardType="numeric"
            value={second}
            onChangeText={setSecond}
            style={{
              borderWidth: 1,
              borderColor: '#d4d4d8',
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          />
          <Button title="Calculate sum" onPress={handleSum} />
          <View>
            <Text style={{ color: '#475569' }}>Result:</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#2563eb' }}>
              {result === null ? 'Enter two valid numbers' : result}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: Countdown Start/Pause Buttons
```jsx
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';

export default function CountdownController() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 24,
          gap: 16,
        }}
      >
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#1f2937',
            padding: 24,
            gap: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#f1f5f9' }}>
            Time Remaining
          </Text>
          <Text
            style={{
              fontSize: 48,
              fontWeight: '700',
              color: isRunning ? '#38bdf8' : '#f97316',
              textAlign: 'center',
            }}
          >
            {timeLeft}s
          </Text>
          <Button
            title={isRunning ? 'Pause' : 'Start'}
            onPress={() => setRunning((prev) => !prev)}
            color={isRunning ? '#f97316' : '#2563eb'}
          />
          <Button
            title="Reset"
            onPress={() => {
              setTimeLeft(10);
              setRunning(false);
            }}
            color="#0ea5e9"
            disabled={timeLeft === 10 && !isRunning}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- If the built-in styling options are not enough, create custom button components using `Pressable`, `TouchableOpacity`, or `TouchableWithoutFeedback`.
- Remember that the native button looks different on each platform; for pixel-perfect design systems, a custom implementation is often the better choice.
