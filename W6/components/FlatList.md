# FlatList

## Overview
`FlatList` is optimized for rendering long or dynamic data sets. By virtualizing only the items that are currently visible, it delivers smooth scrolling even with thousands of rows. In Expo projects it's the go-to choice for feeds, product listings, or chat interfaces, and it can handle both vertical/horizontal layouts as well as grid configurations.

## Notable Props
- `data`: The array of items to render; can come from online or offline sources.
- `renderItem`: Describes how each item should render; receives `{ item, index, separators }`.
- `keyExtractor`: Generates a unique key per item—critical for performance and state handling.
- `ListHeaderComponent` / `ListFooterComponent`: Inject custom content at the top or bottom (e.g., filter bars, loading indicators).
- `ListEmptyComponent`: Renders fallback UI when the data array is empty.
- `ItemSeparatorComponent`: Adds divider components between rows automatically.
- `refreshing` and `onRefresh`: Control pull-to-refresh behavior.
- `onEndReached` and `onEndReachedThreshold`: Power infinite scrolling and background data fetching.
- `initialNumToRender`: Specifies how many items to render initially to improve perceived performance.
- `windowSize`, `maxToRenderPerBatch`, `updateCellsBatchingPeriod`: Fine-tune virtualization behavior for smoother scrolling.
- `numColumns` and `columnWrapperStyle`: Enable grid layouts.
- `getItemLayout`: Provides deterministic item measurements, enabling fast scroll-to-index operations.
- `removeClippedSubviews`: Removes off-screen rows from the native hierarchy to reduce memory usage.

## Key Events
- `onEndReached`: Fires when the user nears the bottom of the list—perfect for loading the next page.
- `onRefresh`: Fires when the pull-to-refresh interaction finishes.
- `onViewableItemsChanged`: Informs you when the set of visible items changes; useful for analytics, autoplaying media, or ad tracking.
- `onScroll`: Gives access to the raw scroll event for animated headers or custom infinite-scroll logic.
- `onScrollToIndexFailed`: Fires when scrolling to a specific index fails, letting you implement graceful fallbacks.

## Examples

### Example 1: Course Modules with Completion State
```jsx
import { useState } from 'react';
import { FlatList, SafeAreaView, Switch, Text, View } from 'react-native';

const MODULES = [
  { id: '1', title: 'Introduction & Setup', duration: 12 },
  { id: '2', title: 'Core Components', duration: 18 },
  { id: '3', title: 'State & Props', duration: 22 },
  { id: '4', title: 'Navigation', duration: 15 },
];

export default function CourseModules() {
  const [completed, setCompleted] = useState({});

  const toggleModule = (id, value) => {
    setCompleted((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 24, gap: 16, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f172a' }}>
          Course Modules
        </Text>
        <FlatList
          data={MODULES}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const done = completed[item.id];
            return (
              <View
                style={{
                  padding: 18,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: done ? '#22c55e' : '#e2e8f0',
                  backgroundColor: done ? '#dcfce7' : '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ gap: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: '#475569' }}>
                    Duration: {item.duration} min
                  </Text>
                </View>
                <Switch
                  value={done}
                  onValueChange={(value) => toggleModule(item.id, value)}
                />
              </View>
            );
          }}
          ListFooterComponent={() => {
            const total = MODULES.length;
            const doneCount = Object.values(completed).filter(Boolean).length;
            return (
              <Text style={{ marginTop: 16, textAlign: 'center', color: '#1f2937' }}>
                Completed: {doneCount} / {total}
              </Text>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: Infinite Scroll with Pull-to-Refresh
```jsx
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

const fetchPage = async (page) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return Array.from({ length: 6 }, (_, index) => {
    const id = (page - 1) * 6 + index + 1;
    return { id: String(id), title: `Lesson Note #${id}` };
  });
};

export default function InfiniteNotes() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadPage = useCallback(
    async (pageToLoad, isRefresh = false) => {
      if (loadingMore || refreshing) return;
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoadingMore(true);
      }
      const newNotes = await fetchPage(pageToLoad);
      setNotes((prev) => (isRefresh ? newNotes : [...prev, ...newNotes]));
      setPage(pageToLoad + 1);
      setLoadingMore(false);
      setRefreshing(false);
    },
    [loadingMore, refreshing]
  );

  useEffect(() => {
    loadPage(1, true);
  }, [loadPage]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, gap: 16 }}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 18,
              borderRadius: 14,
              backgroundColor: '#1f2937',
            }}
          >
            <Text style={{ fontSize: 16, color: '#f8fafc' }}>{item.title}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadPage(1, true)}
            tintColor="#38bdf8"
          />
        }
        onEndReached={() => loadPage(page)}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#38bdf8" />
          ) : null
        }
        ListHeaderComponent={() => (
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#f8fafc',
              marginBottom: 8,
            }}
          >
            Lesson Notes Feed
          </Text>
        )}
      />
    </SafeAreaView>
  );
}
```

## Tips
- Wrap `renderItem` in `useCallback` to avoid unnecessary re-renders when the parent component updates.
- Use `getItemLayout` for large data sets so you can jump to specific items instantly without measuring.
