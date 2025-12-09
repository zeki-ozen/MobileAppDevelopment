# Fetch API

## Overview
The Fetch API is a modern, built-in JavaScript interface for making HTTP requests. In React Native, it works exactly like in web browsers, providing a clean promise-based approach to network communication. Unlike older methods like XMLHttpRequest, Fetch offers a more powerful and flexible feature set with a cleaner syntax that integrates naturally with async/await patterns.

## Key Concepts
- **Promise-based**: Returns a Promise that resolves to a Response object
- **Built-in**: No external dependencies required - works out of the box in React Native
- **JSON handling**: Response has built-in methods like `.json()` for parsing
- **Request configuration**: Supports all HTTP methods, headers, and body content

## Basic Syntax
```javascript
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## Common Options
- `method`: HTTP method (GET, POST, PUT, DELETE, PATCH)
- `headers`: Object containing request headers
- `body`: Request body (must be stringified for JSON)
- `mode`: Request mode (cors, no-cors, same-origin)

## Examples

### Example 1: Fetching and Displaying User List
```jsx
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Directory</Text>
        <Text style={styles.headerSubtitle}>{users.length} users found</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              <Text style={styles.userCompany}>{item.company.name}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
  },
  header: {
    padding: 20,
    backgroundColor: '#3b82f6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#bfdbfe',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  userCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  userInfo: {
    marginLeft: 14,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  userCompany: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
});
```

### Example 2: Fetching Posts with Pull-to-Refresh
```jsx
import { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = useCallback(() => {
    return fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts().finally(() => setRefreshing(false));
  }, [fetchPosts]);

  const handlePostPress = (post) => {
    setSelectedPost(selectedPost?.id === post.id ? null : post);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📰 Latest Posts</Text>
        <Text style={styles.headerSubtitle}>Pull down to refresh</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#8b5cf6']}
            tintColor="#8b5cf6"
          />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const isExpanded = selectedPost?.id === item.id;
          return (
            <TouchableOpacity
              style={[styles.postCard, isExpanded && styles.postCardExpanded]}
              onPress={() => handlePostPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.postHeader}>
                <View style={styles.postIdBadge}>
                  <Text style={styles.postIdText}>#{item.id}</Text>
                </View>
                <Text style={styles.expandIcon}>
                  {isExpanded ? '▼' : '▶'}
                </Text>
              </View>
              <Text style={styles.postTitle} numberOfLines={isExpanded ? 0 : 2}>
                {item.title}
              </Text>
              {isExpanded && (
                <Text style={styles.postBody}>{item.body}</Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf5ff',
  },
  header: {
    padding: 20,
    backgroundColor: '#8b5cf6',
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
  listContent: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  postCard: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  postCardExpanded: {
    backgroundColor: '#f5f3ff',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postIdBadge: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  postIdText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  expandIcon: {
    fontSize: 12,
    color: '#8b5cf6',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: 22,
  },
  postBody: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 12,
    lineHeight: 20,
  },
});
```

## Tips
- Always check `response.ok` before parsing the response body to catch HTTP errors.
- Use `AbortController` to cancel requests when components unmount to prevent memory leaks.
- Remember that Fetch doesn't throw errors for HTTP error status codes (4xx, 5xx) - only for network failures.
- When sending JSON data, always set the `Content-Type` header to `application/json`.
