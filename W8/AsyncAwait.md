# Async/Await

## Overview
Async/Await is a modern JavaScript syntax for handling asynchronous operations in a cleaner, more readable way. Built on top of Promises, it allows you to write asynchronous code that looks and behaves like synchronous code. In React Native, this pattern is essential for handling network requests, file operations, and any other asynchronous tasks without blocking the main thread.

## Key Concepts
- **async**: Keyword that declares a function as asynchronous, making it return a Promise
- **await**: Keyword that pauses execution until a Promise resolves
- **Error handling**: Use try/catch blocks for handling errors in async functions
- **Sequential vs Parallel**: Control execution order of multiple async operations

## Basic Syntax
```javascript
// Async function declaration
async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Arrow function syntax
const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
```

## Important Patterns
- **Sequential execution**: Await one operation before starting the next
- **Parallel execution**: Use `Promise.all()` for concurrent operations
- **Error boundaries**: Wrap async operations in try/catch blocks

## Examples

### Example 1: Sequential Data Loading with User and Posts
```jsx
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState('');
  const [error, setError] = useState(null);

  // Sequential async operations - one after another
  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Fetch user
      setLoadingStage('Loading user profile...');
      const userResponse = await fetch(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      if (!userResponse.ok) throw new Error('Failed to fetch user');
      const userData = await userResponse.json();
      setUser(userData);

      // Step 2: Fetch user's posts (depends on user data)
      setLoadingStage('Loading user posts...');
      const postsResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userData.id}&_limit=5`
      );
      if (!postsResponse.ok) throw new Error('Failed to fetch posts');
      const postsData = await postsResponse.json();
      setPosts(postsData);

      setLoadingStage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text style={styles.loadingText}>{loadingStage}</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadUserData}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.userMeta}>
            <Text style={styles.metaText}>🏢 {user?.company?.name}</Text>
            <Text style={styles.metaText}>📍 {user?.address?.city}</Text>
          </View>
        </View>

        {/* Posts Section */}
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody} numberOfLines={2}>
                {post.body}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={loadUserData}>
          <Text style={styles.refreshText}>🔄 Refresh Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbeb',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#92400e',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#f59e0b',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f59e0b',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  userEmail: {
    fontSize: 14,
    color: '#fef3c7',
    marginTop: 4,
  },
  userMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#fef3c7',
  },
  postsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
  },
  postBody: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  refreshButton: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
  },
});
```

### Example 2: Parallel Data Loading with Promise.all
```jsx
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [data, setData] = useState({
    posts: [],
    users: [],
    comments: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadTime, setLoadTime] = useState(0);
  const [error, setError] = useState(null);

  // Parallel async operations - all at once
  const loadAllData = async () => {
    const startTime = Date.now();

    try {
      setLoading(true);
      setError(null);

      // All requests start at the same time using Promise.all
      const [postsResponse, usersResponse, commentsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'),
        fetch('https://jsonplaceholder.typicode.com/users?_limit=5'),
        fetch('https://jsonplaceholder.typicode.com/comments?_limit=5'),
      ]);

      // Check if all responses are OK
      if (!postsResponse.ok || !usersResponse.ok || !commentsResponse.ok) {
        throw new Error('One or more requests failed');
      }

      // Parse all responses in parallel too
      const [posts, users, comments] = await Promise.all([
        postsResponse.json(),
        usersResponse.json(),
        commentsResponse.json(),
      ]);

      setData({ posts, users, comments });
      setLoadTime(Date.now() - startTime);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#ec4899" />
        <Text style={styles.loadingText}>Loading all data in parallel...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadAllData}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚡ Parallel Loading Demo</Text>
        <Text style={styles.headerSubtitle}>
          Loaded in {loadTime}ms using Promise.all
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#fce7f3' }]}>
            <Text style={styles.statNumber}>{data.posts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
            <Text style={styles.statNumber}>{data.users.length}</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#dcfce7' }]}>
            <Text style={styles.statNumber}>{data.comments.length}</Text>
            <Text style={styles.statLabel}>Comments</Text>
          </View>
        </View>

        {/* Posts Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#db2777' }]}>
            📝 Posts
          </Text>
          {data.posts.map((post) => (
            <View
              key={post.id}
              style={[styles.itemCard, { borderLeftColor: '#ec4899' }]}
            >
              <Text style={styles.itemTitle} numberOfLines={1}>
                {post.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Users Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#2563eb' }]}>
            👥 Users
          </Text>
          {data.users.map((user) => (
            <View
              key={user.id}
              style={[styles.itemCard, { borderLeftColor: '#3b82f6' }]}
            >
              <Text style={styles.itemTitle}>{user.name}</Text>
              <Text style={styles.itemSubtitle}>{user.email}</Text>
            </View>
          ))}
        </View>

        {/* Comments Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#16a34a' }]}>
            💬 Comments
          </Text>
          {data.comments.map((comment) => (
            <View
              key={comment.id}
              style={[styles.itemCard, { borderLeftColor: '#22c55e' }]}
            >
              <Text style={styles.itemTitle} numberOfLines={1}>
                {comment.name}
              </Text>
              <Text style={styles.itemSubtitle}>{comment.email}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={loadAllData}>
          <Text style={styles.refreshText}>🔄 Reload All Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf2f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf2f8',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9d174d',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  header: {
    padding: 20,
    backgroundColor: '#ec4899',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fbcfe8',
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  refreshButton: {
    backgroundColor: '#ec4899',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
```

## Tips
- Use `Promise.all()` when multiple requests don't depend on each other - it's faster than sequential await.
- Remember that if one promise in `Promise.all()` fails, the entire operation fails - use `Promise.allSettled()` if you need partial results.
- Always wrap async operations in try/catch to handle errors gracefully.
- Avoid using await inside loops when requests can be made in parallel - map the array and use `Promise.all()` instead.
- Use loading states to indicate progress, especially for sequential operations where users can see step-by-step progress.
