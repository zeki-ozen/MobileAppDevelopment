# Axios

## Overview
Axios is a popular, promise-based HTTP client for making requests in JavaScript applications. While React Native has the built-in Fetch API, Axios provides additional features like automatic JSON transformation, request/response interceptors, request cancellation, and better error handling. It's widely used in production applications due to its robust feature set and cleaner syntax.

## Key Features
- **Automatic JSON transformation**: Automatically transforms request and response data
- **Interceptors**: Modify requests or responses before they are handled
- **Request cancellation**: Cancel requests using AbortController or CancelToken
- **Timeout support**: Built-in timeout configuration
- **Better error handling**: Throws errors for HTTP error status codes
- **Request/Response transformation**: Transform data before sending or after receiving

## Installation
```bash
npm install axios
# or
yarn add axios
```

## Basic Syntax
```javascript
import axios from 'axios';

// GET request
axios.get(url)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// POST request
axios.post(url, data)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Common Configuration
- `baseURL`: Base URL prepended to all requests
- `timeout`: Request timeout in milliseconds
- `headers`: Default headers for all requests
- `params`: URL parameters to be sent with the request

## Examples

### Example 1: Photo Gallery with Axios Instance
```jsx
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPhotos = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await api.get('/photos', {
        params: {
          _page: pageNum,
          _limit: 10,
        },
      });

      if (append) {
        setPhotos((prev) => [...prev, ...response.data]);
      } else {
        setPhotos(response.data);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch photos');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const loadMore = () => {
    if (!loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPhotos(nextPage, true);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#06b6d4" />
        <Text style={styles.loadingText}>Loading gallery...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchPhotos()}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📷 Photo Gallery</Text>
        <Text style={styles.headerSubtitle}>{photos.length} photos loaded</Text>
      </View>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator color="#06b6d4" />
              <Text style={styles.footerText}>Loading more...</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.photoCard}>
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={styles.photo}
              resizeMode="cover"
            />
            <Text style={styles.photoTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfeff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecfeff',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    padding: 20,
    backgroundColor: '#06b6d4',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#a5f3fc',
    marginTop: 4,
  },
  grid: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  photoCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  photo: {
    width: '100%',
    height: 120,
    backgroundColor: '#e2e8f0',
  },
  photoTitle: {
    fontSize: 12,
    color: '#475569',
    padding: 10,
    lineHeight: 16,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    color: '#64748b',
  },
});
```

### Example 2: Todo Manager with CRUD Operations
```jsx
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.log(`❌ Request failed: ${error.message}`);
    return Promise.reject(error);
  }
);

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos', {
        params: { _limit: 10 },
      });
      setTodos(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    setSubmitting(true);
    try {
      const response = await api.post('/todos', {
        title: newTodo,
        completed: false,
        userId: 1,
      });

      // Add to local state with a unique ID
      setTodos((prev) => [
        { ...response.data, id: Date.now() },
        ...prev,
      ]);
      setNewTodo('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    try {
      await api.patch(`/todos/${id}`, {
        completed: !todo.completed,
      });

      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete todo');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#10b981" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✅ Todo Manager</Text>
        <Text style={styles.headerSubtitle}>
          {todos.filter((t) => t.completed).length} / {todos.length} completed
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity
          style={[styles.addButton, submitting && styles.addButtonDisabled]}
          onPress={addTodo}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.addButtonText}>+</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.todoContent}
              onPress={() => toggleTodo(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxChecked,
                ]}
              >
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.todoTextCompleted,
                ]}
                numberOfLines={2}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
  header: {
    padding: 20,
    backgroundColor: '#10b981',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#a7f3d0',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#10b981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#86efac',
  },
  addButtonText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '600',
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  separator: {
    height: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#10b981',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10b981',
  },
  checkmark: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  todoText: {
    flex: 1,
    fontSize: 15,
    color: '#1e293b',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
  },
});
```

## Tips
- Create an Axios instance with `axios.create()` for consistent configuration across your app.
- Use interceptors to add authentication tokens, handle errors globally, or log requests.
- Set appropriate timeouts to prevent requests from hanging indefinitely.
- Use `axios.CancelToken` or `AbortController` to cancel requests when components unmount.
- Axios automatically throws errors for non-2xx responses, making error handling more straightforward than Fetch.
