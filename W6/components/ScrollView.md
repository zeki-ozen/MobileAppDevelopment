# ScrollView

## Overview
`ScrollView` makes content that exceeds the viewport scrollable. In Expo projects it's a common choice for forms, long-form information screens, or horizontal card galleries. Because it renders all children at once, it’s great for shorter content, but you should switch to `FlatList` or `SectionList` to maintain performance with large datasets. The component can handle both vertical and horizontal scrolling, letting you adapt to different layout needs.

## Notable Props
- `horizontal`: Enables horizontal scrolling when set to true.
- `contentContainerStyle`: Styles the inner content container—perfect for padding or alignment tweaks.
- `showsVerticalScrollIndicator` / `showsHorizontalScrollIndicator`: Toggle scrollbars for cleaner minimal designs.
- `refreshControl`: Adds a `RefreshControl` for pull-to-refresh interactions; standard in list refresh flows.
- `pagingEnabled`: Snaps content page by page; useful for onboarding or carousel experiences.
- `stickyHeaderIndices`: Pins specified children at the top during scroll—handy for table headers.
- `keyboardShouldPersistTaps`: Controls how taps behave when the keyboard is visible (`always`, `never`, `handled`); improves form usability.
- `nestedScrollEnabled`: Enables nested scrolling on Android, necessary for ScrollViews inside other scrollable containers.
- `contentInset` and `contentOffset` (iOS): Define initial padding and offset for the scrollable area.
- `scrollEnabled`: Temporarily disable scrolling while still rendering the content.

## Key Events
- `onScroll`: Fires throughout the scroll; drive animated headers or infinite loading logic here.
- `onContentSizeChange`: Fires when content size changes—ideal for auto-scrolling or dynamic loading.
- `onScrollBeginDrag` and `onScrollEndDrag`: Trigger when the user starts and stops dragging; manage momentum or analytics.
- `onMomentumScrollBegin` and `onMomentumScrollEnd`: Fire when scroll momentum starts or stops—great for pagination indicators.
- `onScrollToTop` (iOS): Indicates the user tapped the status bar to jump back to the top.

## Examples

### Example 1: Terms of Service with Confirmation Button
```jsx
import { useRef, useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

const TERMS = `${'Terms of service '.repeat(120)}\n\nPlease confirm that you have read the agreement.`;

export default function TermsAgreement() {
  const [accepted, setAccepted] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const scrollViewRef = useRef(null);
  const requestedPosition = useRef(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } =
      event.nativeEvent;
    const scrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (scrolledToBottom && !reachedEnd) {
      setReachedEnd(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e2e8f0' }}>
      <View style={{ flex: 1, padding: 24, gap: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f172a' }}>
          Terms of Service
        </Text>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            padding: 18,
            backgroundColor: '#fff',
            borderRadius: 16,
            gap: 12,
            minHeight: 400,
          }}
          onContentSizeChange={() => {
            if (!requestedPosition.current && scrollViewRef.current) {
              requestedPosition.current = true;
              scrollViewRef.current.scrollTo({ y: 0, animated: false });
            }
          }}
          nestedScrollEnabled
        >
          <Text style={{ lineHeight: 22, color: '#334155' }}>{TERMS}</Text>
        </ScrollView>
        <View style={{ marginTop: 8, marginBottom: 32 }}>
          <Button
            title={
              reachedEnd
                ? accepted
                  ? 'Accepted'
                  : 'Accept terms'
                : 'Scroll to the bottom to continue'
            }
            disabled={!reachedEnd || accepted}
            onPress={() => setAccepted(true)}
            color={accepted ? '#22c55e' : '#2563eb'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: Weekly Schedule Horizontal Scroll
```jsx
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

const WEEKLY_PLAN = [
  { day: 'Monday', topic: 'Kickoff Session', duration: '40 min' },
  { day: 'Tuesday', topic: 'Core Components', duration: '60 min' },
  { day: 'Wednesday', topic: 'Navigation', duration: '50 min' },
  { day: 'Thursday', topic: 'State Management', duration: '55 min' },
  { day: 'Friday', topic: 'Performance', duration: '45 min' },
];

export default function WeeklySchedule() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <View style={{ paddingVertical: 32 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            marginLeft: 24,
            color: '#f8fafc',
          }}
        >
          Weekly Study Plan
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, gap: 16 }}
        >
          {WEEKLY_PLAN.map((item) => (
            <View
              key={item.day}
              style={{
                width: 220,
                padding: 20,
                borderRadius: 20,
                backgroundColor: '#1f2937',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <Text style={{ color: '#cbd5f5', fontSize: 16 }}>
                {item.day}
              </Text>
              <Text
                style={{ color: '#f1f5f9', fontWeight: '600', fontSize: 20 }}
              >
                {item.topic}
              </Text>
              <Text style={{ color: '#94a3b8' }}>{item.duration}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- Keep ScrollView components for smaller content sets; switch to `FlatList` or `SectionList` for larger data to maintain performance.
- When embedding a ScrollView inside another scrollable container, enable `nestedScrollEnabled` on Android and carefully manage padding to avoid gesture conflicts.
