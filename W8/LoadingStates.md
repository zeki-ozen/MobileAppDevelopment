# Loading States

## Overview
Loading states are essential for providing good user experience in React Native applications that make network requests. They inform users that the app is working on their request, prevent confusion about whether actions were registered, and create a sense of responsiveness. Properly managed loading states can significantly improve perceived performance and user satisfaction.

## Types of Loading States
- **Initial loading**: When data is being fetched for the first time
- **Refresh loading**: When existing data is being refreshed (pull-to-refresh)
- **Pagination loading**: When loading more items in a list
- **Submit loading**: When form data is being sent to the server
- **Skeleton loading**: Placeholder UI while content loads

## Best Practices
- Show loading indicators promptly when operations begin
- Provide meaningful loading messages when possible
- Use skeleton screens for content-heavy pages
- Disable interactive elements during submission to prevent double-submits
- Consider using optimistic updates for better perceived performance

## Examples

### Example 1: Multiple Loading States with Skeleton Loader
```jsx
import { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

// Skeleton component with shimmer animation
function SkeletonItem() {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View style={[styles.skeletonCard, { opacity }]}>
      <View style={styles.skeletonAvatar} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonText} />
        <View style={styles.skeletonTextShort} />
      </View>
    </Animated.View>
  );
}

// Skeleton list
function SkeletonList({ count = 5 }) {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
}

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Simulate fetching articles
  const fetchArticles = async (pageNum = 1, isRefresh = false) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=5`
    );
    const data = await response.json();

    // Transform data to article format
    const newArticles = data.map((item) => ({
      id: `${pageNum}-${item.id}`,
      title: item.title,
      excerpt: item.body.substring(0, 100) + '...',
      author: `Author ${item.userId}`,
      readTime: `${Math.floor(Math.random() * 10) + 2} min read`,
      date: new Date().toLocaleDateString(),
    }));

    if (isRefresh || pageNum === 1) {
      setArticles(newArticles);
    } else {
      setArticles((prev) => [...prev, ...newArticles]);
    }

    setHasMore(data.length === 5);
    return newArticles;
  };

  // Initial load
  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      await fetchArticles(1);
      setLoading(false);
    };
    loadInitial();
  }, []);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchArticles(1, true);
    setRefreshing(false);
  }, []);

  // Load more
  const onLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    await fetchArticles(nextPage);
    setPage(nextPage);
    setLoadingMore(false);
  }, [page, loadingMore, hasMore]);

  // Render footer with loading indicator
  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <View style={styles.loadingDots}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={styles.loadingDot} />
          ))}
        </View>
        <Text style={styles.loadingFooterText}>Loading more articles...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Tech Articles</Text>
        <Text style={styles.headerSubtitle}>Loading States Demo</Text>
      </View>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: loading
                  ? '#f59e0b'
                  : refreshing
                  ? '#3b82f6'
                  : '#22c55e',
              },
            ]}
          />
          <Text style={styles.statusText}>
            {loading
              ? 'Initial Load'
              : refreshing
              ? 'Refreshing'
              : loadingMore
              ? 'Loading More'
              : 'Ready'}
          </Text>
        </View>
        <Text style={styles.articleCount}>{articles.length} articles</Text>
      </View>

      {loading ? (
        <SkeletonList count={5} />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#7c3aed']}
              tintColor="#7c3aed"
            />
          }
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.articleCard} activeOpacity={0.7}>
              <View style={styles.articleHeader}>
                <View style={styles.authorAvatar}>
                  <Text style={styles.authorInitial}>
                    {item.author.charAt(0)}
                  </Text>
                </View>
                <View style={styles.articleMeta}>
                  <Text style={styles.authorName}>{item.author}</Text>
                  <Text style={styles.articleDate}>
                    {item.date} · {item.readTime}
                  </Text>
                </View>
              </View>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <Text style={styles.articleExcerpt}>{item.excerpt}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  header: {
    padding: 20,
    backgroundColor: '#7c3aed',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ddd6fe',
    marginTop: 4,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ede9fe',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 13,
    color: '#5b21b6',
    fontWeight: '600',
  },
  articleCount: {
    fontSize: 13,
    color: '#7c3aed',
  },
  list: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  articleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  articleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  authorAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  articleMeta: {
    marginLeft: 12,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  articleDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  articleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 24,
    marginBottom: 8,
  },
  articleExcerpt: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  loadingFooter: {
    padding: 20,
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7c3aed',
  },
  loadingFooterText: {
    fontSize: 14,
    color: '#7c3aed',
  },
  skeletonContainer: {
    padding: 16,
    gap: 12,
  },
  skeletonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
  },
  skeletonAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e2e8f0',
  },
  skeletonContent: {
    flex: 1,
    marginLeft: 12,
    gap: 8,
  },
  skeletonTitle: {
    height: 16,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    width: '80%',
  },
  skeletonText: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    width: '100%',
  },
  skeletonTextShort: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    width: '60%',
  },
});
```

### Example 2: Button Loading States and Progress Indicators
```jsx
import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';

// Loading Button Component
function LoadingButton({
  title,
  onPress,
  loading,
  disabled,
  variant = 'primary',
  loadingText,
  icon,
}) {
  const variants = {
    primary: {
      bg: '#3b82f6',
      bgDisabled: '#93c5fd',
      text: '#ffffff',
    },
    success: {
      bg: '#22c55e',
      bgDisabled: '#86efac',
      text: '#ffffff',
    },
    danger: {
      bg: '#ef4444',
      bgDisabled: '#fca5a5',
      text: '#ffffff',
    },
    outline: {
      bg: 'transparent',
      bgDisabled: '#f1f5f9',
      text: '#3b82f6',
      border: '#3b82f6',
    },
  };

  const style = variants[variant];

  return (
    <TouchableOpacity
      style={[
        styles.loadingButton,
        { backgroundColor: loading || disabled ? style.bgDisabled : style.bg },
        style.border && { borderWidth: 2, borderColor: style.border },
      ]}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <View style={styles.loadingContent}>
          <ActivityIndicator
            color={style.text}
            size="small"
            style={{ marginRight: 10 }}
          />
          <Text style={[styles.buttonText, { color: style.text }]}>
            {loadingText || 'Loading...'}
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContent}>
          {icon && <Text style={styles.buttonIcon}>{icon}</Text>}
          <Text style={[styles.buttonText, { color: style.text }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Progress Bar Component
function ProgressBar({ progress, color = '#3b82f6', height = 8 }) {
  return (
    <View style={[styles.progressContainer, { height }]}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${progress}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

export default function App() {
  const [operations, setOperations] = useState({
    save: { loading: false, success: false },
    upload: { loading: false, progress: 0 },
    delete: { loading: false },
    sync: { loading: false },
  });

  // Simulate save operation
  const handleSave = async () => {
    setOperations((prev) => ({
      ...prev,
      save: { loading: true, success: false },
    }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOperations((prev) => ({
      ...prev,
      save: { loading: false, success: true },
    }));

    // Reset success state after 2 seconds
    setTimeout(() => {
      setOperations((prev) => ({
        ...prev,
        save: { loading: false, success: false },
      }));
    }, 2000);
  };

  // Simulate file upload with progress
  const handleUpload = async () => {
    setOperations((prev) => ({
      ...prev,
      upload: { loading: true, progress: 0 },
    }));

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setOperations((prev) => ({
        ...prev,
        upload: { loading: true, progress: i },
      }));
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setOperations((prev) => ({
      ...prev,
      upload: { loading: false, progress: 0 },
    }));
  };

  // Simulate delete operation
  const handleDelete = async () => {
    setOperations((prev) => ({
      ...prev,
      delete: { loading: true },
    }));

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOperations((prev) => ({
      ...prev,
      delete: { loading: false },
    }));
  };

  // Simulate sync operation
  const handleSync = async () => {
    setOperations((prev) => ({
      ...prev,
      sync: { loading: true },
    }));

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setOperations((prev) => ({
      ...prev,
      sync: { loading: false },
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⏳ Loading States</Text>
        <Text style={styles.headerSubtitle}>Buttons & Progress Indicators</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Basic Loading Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button Loading States</Text>

          <View style={styles.buttonGroup}>
            <LoadingButton
              title={operations.save.success ? '✓ Saved!' : 'Save Changes'}
              loadingText="Saving..."
              loading={operations.save.loading}
              onPress={handleSave}
              variant={operations.save.success ? 'success' : 'primary'}
              icon="💾"
            />

            <LoadingButton
              title="Delete Item"
              loadingText="Deleting..."
              loading={operations.delete.loading}
              onPress={handleDelete}
              variant="danger"
              icon="🗑️"
            />

            <LoadingButton
              title="Sync Data"
              loadingText="Syncing..."
              loading={operations.sync.loading}
              onPress={handleSync}
              variant="outline"
              icon="🔄"
            />
          </View>
        </View>

        {/* Upload with Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Progress</Text>

          <View style={styles.uploadCard}>
            <View style={styles.uploadHeader}>
              <Text style={styles.uploadTitle}>📤 File Upload</Text>
              {operations.upload.loading && (
                <Text style={styles.uploadProgress}>
                  {operations.upload.progress}%
                </Text>
              )}
            </View>

            {operations.upload.loading && (
              <View style={styles.progressWrapper}>
                <ProgressBar
                  progress={operations.upload.progress}
                  color="#22c55e"
                  height={10}
                />
                <Text style={styles.progressText}>
                  {operations.upload.progress < 100
                    ? 'Uploading file...'
                    : 'Processing...'}
                </Text>
              </View>
            )}

            <LoadingButton
              title="Upload File"
              loadingText="Uploading..."
              loading={operations.upload.loading}
              onPress={handleUpload}
              variant="success"
              icon="📁"
            />
          </View>
        </View>

        {/* Loading Indicators Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loading Indicator Types</Text>

          <View style={styles.indicatorGrid}>
            <View style={styles.indicatorCard}>
              <ActivityIndicator size="small" color="#3b82f6" />
              <Text style={styles.indicatorLabel}>Small</Text>
            </View>

            <View style={styles.indicatorCard}>
              <ActivityIndicator size="large" color="#22c55e" />
              <Text style={styles.indicatorLabel}>Large</Text>
            </View>

            <View style={styles.indicatorCard}>
              <View style={styles.spinnerCustom}>
                <Text style={styles.spinnerEmoji}>⏳</Text>
              </View>
              <Text style={styles.indicatorLabel}>Custom</Text>
            </View>

            <View style={styles.indicatorCard}>
              <View style={styles.dotsLoader}>
                <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
                <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
                <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={styles.indicatorLabel}>Dots</Text>
            </View>
          </View>
        </View>

        {/* Status Messages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Messages</Text>

          <View style={styles.statusCards}>
            {operations.save.loading && (
              <View style={[styles.statusCard, styles.statusLoading]}>
                <ActivityIndicator color="#1d4ed8" size="small" />
                <Text style={styles.statusLoadingText}>
                  Saving your changes...
                </Text>
              </View>
            )}

            {operations.save.success && (
              <View style={[styles.statusCard, styles.statusSuccess]}>
                <Text style={styles.statusIcon}>✅</Text>
                <Text style={styles.statusSuccessText}>
                  Changes saved successfully!
                </Text>
              </View>
            )}

            {operations.upload.loading && (
              <View style={[styles.statusCard, styles.statusLoading]}>
                <ActivityIndicator color="#15803d" size="small" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.statusLoadingText}>
                    Uploading file... {operations.upload.progress}%
                  </Text>
                  <ProgressBar
                    progress={operations.upload.progress}
                    color="#22c55e"
                    height={4}
                  />
                </View>
              </View>
            )}

            {operations.sync.loading && (
              <View style={[styles.statusCard, styles.statusLoading]}>
                <ActivityIndicator color="#6d28d9" size="small" />
                <Text style={styles.statusLoadingText}>
                  Syncing with server...
                </Text>
              </View>
            )}

            {!Object.values(operations).some((op) => op.loading) &&
              !operations.save.success && (
                <View style={[styles.statusCard, styles.statusIdle]}>
                  <Text style={styles.statusIcon}>💤</Text>
                  <Text style={styles.statusIdleText}>
                    No operations in progress
                  </Text>
                </View>
              )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#1e293b',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 14,
  },
  buttonGroup: {
    gap: 12,
  },
  loadingButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  uploadCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  uploadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  uploadProgress: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22c55e',
  },
  progressWrapper: {
    marginBottom: 16,
  },
  progressContainer: {
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  indicatorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  indicatorCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  indicatorLabel: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
  },
  spinnerCustom: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerEmoji: {
    fontSize: 28,
  },
  dotsLoader: {
    flexDirection: 'row',
    gap: 6,
    height: 36,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusCards: {
    gap: 10,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  statusLoading: {
    backgroundColor: '#dbeafe',
  },
  statusSuccess: {
    backgroundColor: '#dcfce7',
  },
  statusIdle: {
    backgroundColor: '#f1f5f9',
  },
  statusIcon: {
    fontSize: 20,
  },
  statusLoadingText: {
    fontSize: 14,
    color: '#1e40af',
    flex: 1,
  },
  statusSuccessText: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '500',
  },
  statusIdleText: {
    fontSize: 14,
    color: '#64748b',
  },
});
```

## Tips
- Match loading state duration with user expectations - instant actions shouldn't show loading indicators.
- Use skeleton screens for content that takes time to load - they're less jarring than spinners.
- Provide feedback at multiple levels: button state, inline messages, and toast notifications.
- Disable buttons during submission to prevent accidental double-clicks.
- Consider showing progress percentages for long operations like file uploads.
- Use different loading indicators for different contexts - skeleton for initial load, spinner for actions.
- Always have a fallback timeout for loading states to prevent infinite loading scenarios.
