# RESTful APIs

## Overview
REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods to perform CRUD (Create, Read, Update, Delete) operations on resources. In React Native applications, understanding REST principles is essential for communicating with backend services effectively. Most modern web services follow REST conventions, making it a critical skill for mobile developers.

## HTTP Methods
- **GET**: Retrieve data from the server (Read)
- **POST**: Send new data to the server (Create)
- **PUT**: Update existing data completely (Update/Replace)
- **PATCH**: Partially update existing data (Update/Modify)
- **DELETE**: Remove data from the server (Delete)

## Key Concepts
- **Resources**: Data entities represented by URLs (e.g., `/users`, `/posts/1`)
- **Endpoints**: URLs that accept HTTP requests
- **Status Codes**: Indicate request outcome (200 OK, 201 Created, 404 Not Found, etc.)
- **Headers**: Metadata about the request/response (Content-Type, Authorization)
- **Request Body**: Data sent with POST/PUT/PATCH requests

## Common Status Codes
- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `204 No Content`: Successful but no content to return
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `404 Not Found`: Resource doesn't exist
- `500 Internal Server Error`: Server-side error

## Examples

### Example 1: Complete CRUD Operations for Notes App
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
  Modal,
  StyleSheet,
} from 'react-native';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [saving, setSaving] = useState(false);

  // GET - Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/posts?_limit=10`);

      if (!response.ok) {
        throw new Error(`GET failed: ${response.status}`);
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  // POST - Create new note
  const createNote = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Validation', 'Please enter a title');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`POST failed: ${response.status}`);
      }

      const newNote = await response.json();
      // Add with unique local ID since API returns same ID
      setNotes((prev) => [{ ...newNote, id: Date.now() }, ...prev]);
      closeModal();
      Alert.alert('Success', 'Note created! (POST 201 Created)');
    } catch (error) {
      Alert.alert('Error', 'Failed to create note');
    } finally {
      setSaving(false);
    }
  };

  // PUT - Update entire note
  const updateNote = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Validation', 'Please enter a title');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/posts/${editingNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingNote.id,
          title: formData.title,
          body: formData.body,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`PUT failed: ${response.status}`);
      }

      const updatedNote = await response.json();
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id ? { ...updatedNote, id: editingNote.id } : n
        )
      );
      closeModal();
      Alert.alert('Success', 'Note updated! (PUT 200 OK)');
    } catch (error) {
      Alert.alert('Error', 'Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  // DELETE - Remove note
  const deleteNote = async (id) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(`${API_BASE}/posts/${id}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error(`DELETE failed: ${response.status}`);
            }

            setNotes((prev) => prev.filter((n) => n.id !== id));
            Alert.alert('Success', 'Note deleted! (DELETE 200 OK)');
          } catch (error) {
            Alert.alert('Error', 'Failed to delete note');
          }
        },
      },
    ]);
  };

  // Open modal for create/edit
  const openModal = (note = null) => {
    if (note) {
      setEditingNote(note);
      setFormData({ title: note.title, body: note.body });
    } else {
      setEditingNote(null);
      setFormData({ title: '', body: '' });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingNote(null);
    setFormData({ title: '', body: '' });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Fetching notes (GET)...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>📝 Notes App</Text>
          <Text style={styles.headerSubtitle}>RESTful CRUD Demo</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => openModal()}
        >
          <Text style={styles.addButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* HTTP Methods Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
          <Text style={styles.legendText}>GET</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
          <Text style={styles.legendText}>POST</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
          <Text style={styles.legendText}>PUT</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.legendText}>DELETE</Text>
        </View>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <TouchableOpacity
              style={styles.noteContent}
              onPress={() => openModal(item)}
            >
              <Text style={styles.noteTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.noteBody} numberOfLines={2}>
                {item.body}
              </Text>
              <Text style={styles.noteId}>ID: {item.id}</Text>
            </TouchableOpacity>
            <View style={styles.noteActions}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#fef3c7' }]}
                onPress={() => openModal(item)}
              >
                <Text>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#fee2e2' }]}
                onPress={() => deleteNote(item.id)}
              >
                <Text>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Create/Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingNote ? '✏️ Edit Note (PUT)' : '➕ New Note (POST)'}
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Note title"
              value={formData.title}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, title: text }))
              }
            />

            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Note content"
              value={formData.body}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, body: text }))
              }
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={editingNote ? updateNote : createNote}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={styles.saveText}>
                    {editingNote ? 'Update' : 'Create'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4338ca',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6366f1',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#c7d2fe',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#6366f1',
    fontWeight: '700',
    fontSize: 15,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 12,
    backgroundColor: '#e0e7ff',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#4338ca',
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  separator: {
    height: 10,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  noteBody: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 20,
  },
  noteId: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 8,
  },
  noteActions: {
    justifyContent: 'center',
    gap: 8,
    marginLeft: 12,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  modalTextArea: {
    minHeight: 100,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
```

### Example 2: User Management with GET, POST, and Query Parameters
```jsx
import { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // GET - Fetch all users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // GET with query parameters - Fetch user's posts
  const fetchUserPosts = async (userId) => {
    setLoadingPosts(true);
    try {
      // Using query parameters to filter posts by userId
      const response = await fetch(
        `${API_BASE}/posts?userId=${userId}&_limit=5`
      );
      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Handle user selection
  const handleUserSelect = (user) => {
    if (selectedUser?.id === user.id) {
      setSelectedUser(null);
      setUserPosts([]);
    } else {
      setSelectedUser(user);
      fetchUserPosts(user.id);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Render user details panel
  const renderUserDetails = () => {
    if (!selectedUser) return null;

    return (
      <View style={styles.detailsPanel}>
        <View style={styles.detailsHeader}>
          <View style={styles.detailsAvatar}>
            <Text style={styles.detailsAvatarText}>
              {selectedUser.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.detailsInfo}>
            <Text style={styles.detailsName}>{selectedUser.name}</Text>
            <Text style={styles.detailsEmail}>{selectedUser.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedUser(null);
              setUserPosts([]);
            }}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsBody}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📞 Phone</Text>
            <Text style={styles.detailValue}>{selectedUser.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🌐 Website</Text>
            <Text style={styles.detailValue}>{selectedUser.website}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🏢 Company</Text>
            <Text style={styles.detailValue}>{selectedUser.company.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍 City</Text>
            <Text style={styles.detailValue}>{selectedUser.address.city}</Text>
          </View>
        </View>

        {/* User's Posts */}
        <View style={styles.postsSection}>
          <Text style={styles.postsSectionTitle}>
            📝 Recent Posts (GET /posts?userId={selectedUser.id})
          </Text>
          {loadingPosts ? (
            <ActivityIndicator color="#059669" style={{ marginTop: 12 }} />
          ) : (
            <View style={styles.postsList}>
              {userPosts.map((post) => (
                <View key={post.id} style={styles.postItem}>
                  <Text style={styles.postTitle} numberOfLines={2}>
                    {post.title}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👥 User Directory</Text>
        <Text style={styles.headerSubtitle}>
          GET /users • Query Parameters Demo
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search users by name or email..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearSearch}
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.clearSearchText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Results count */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          Showing {filteredUsers.length} of {users.length} users
        </Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#059669" />
          <Text style={styles.loadingText}>Fetching users...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListHeaderComponent={renderUserDetails}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No users found</Text>
            </View>
          }
          renderItem={({ item }) => {
            const isSelected = selectedUser?.id === item.id;
            return (
              <TouchableOpacity
                style={[styles.userCard, isSelected && styles.userCardSelected]}
                onPress={() => handleUserSelect(item)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.userAvatar,
                    isSelected && styles.userAvatarSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.userAvatarText,
                      isSelected && styles.userAvatarTextSelected,
                    ]}
                  >
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                  <Text style={styles.userUsername}>@{item.username}</Text>
                </View>
                <View style={styles.chevron}>
                  <Text style={styles.chevronText}>
                    {isSelected ? '▼' : '▶'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#047857',
  },
  header: {
    padding: 20,
    backgroundColor: '#059669',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#a7f3d0',
    marginTop: 4,
    fontFamily: 'monospace',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 0,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  clearSearch: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  clearSearchText: {
    fontSize: 18,
    color: '#94a3b8',
  },
  resultsBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 13,
    color: '#64748b',
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  separator: {
    height: 10,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  userCardSelected: {
    backgroundColor: '#d1fae5',
    borderWidth: 2,
    borderColor: '#059669',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarSelected: {
    backgroundColor: '#047857',
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  userAvatarTextSelected: {
    color: '#ffffff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 14,
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
  userUsername: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4,
  },
  chevron: {
    padding: 8,
  },
  chevronText: {
    fontSize: 12,
    color: '#059669',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
  },
  detailsPanel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#059669',
  },
  detailsAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#059669',
  },
  detailsInfo: {
    flex: 1,
    marginLeft: 14,
  },
  detailsName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  detailsEmail: {
    fontSize: 14,
    color: '#a7f3d0',
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#ffffff',
  },
  detailsBody: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  detailLabel: {
    width: 100,
    fontSize: 14,
    color: '#64748b',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
  },
  postsSection: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: '#f0fdf4',
  },
  postsSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#047857',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  postsList: {
    gap: 8,
  },
  postItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  postTitle: {
    fontSize: 13,
    color: '#1e293b',
    lineHeight: 18,
  },
});
```

## Tips
- Use appropriate HTTP methods for each operation - don't use POST for fetching data or GET for creating resources.
- Include proper headers, especially `Content-Type: application/json` when sending JSON data.
- Handle different status codes appropriately - a 404 should show "not found," while a 500 should show "server error."
- Use query parameters for filtering, sorting, and pagination instead of creating separate endpoints.
- Cache GET responses when appropriate to reduce unnecessary network requests.
- Consider implementing optimistic updates for better UX - update UI immediately, then sync with server.
