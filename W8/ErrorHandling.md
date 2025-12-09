# Error Handling

## Overview
Error handling is crucial when working with network requests in React Native applications. Network operations can fail for various reasons: no internet connection, server errors, timeouts, invalid responses, and more. Proper error handling ensures your app remains stable, provides meaningful feedback to users, and can recover gracefully from failures.

## Types of Network Errors
- **Network errors**: Device offline, DNS failures, connection timeouts
- **HTTP errors**: 4xx client errors (404 Not Found, 401 Unauthorized), 5xx server errors
- **Parsing errors**: Invalid JSON response, unexpected data format
- **Timeout errors**: Request takes too long to complete
- **Abort errors**: Request was cancelled by the application

## Error Handling Patterns
- **Try/Catch blocks**: Wrap async operations for synchronous-style error handling
- **Error boundaries**: React components that catch errors in child component tree
- **Global error handlers**: Centralized error handling with interceptors
- **Retry mechanisms**: Automatic retry with exponential backoff

## Examples

### Example 1: Comprehensive Error Handling with Retry Logic
```jsx
import { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// Custom error types
const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  SERVER: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  PARSE: 'PARSE_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

// Error messages for user display
const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK]: {
    title: 'No Internet Connection',
    description: 'Please check your connection and try again.',
    icon: '📡',
  },
  [ERROR_TYPES.SERVER]: {
    title: 'Server Error',
    description: 'Something went wrong on our end. Please try again later.',
    icon: '🖥️',
  },
  [ERROR_TYPES.TIMEOUT]: {
    title: 'Request Timeout',
    description: 'The server took too long to respond.',
    icon: '⏱️',
  },
  [ERROR_TYPES.PARSE]: {
    title: 'Data Error',
    description: 'We received unexpected data from the server.',
    icon: '📋',
  },
  [ERROR_TYPES.UNKNOWN]: {
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred.',
    icon: '❓',
  },
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Classify error type
  const classifyError = (error, response) => {
    if (!navigator.onLine || error.message === 'Network request failed') {
      return ERROR_TYPES.NETWORK;
    }
    if (error.name === 'AbortError') {
      return ERROR_TYPES.TIMEOUT;
    }
    if (response && response.status >= 500) {
      return ERROR_TYPES.SERVER;
    }
    if (error instanceof SyntaxError) {
      return ERROR_TYPES.PARSE;
    }
    return ERROR_TYPES.UNKNOWN;
  };

  // Fetch with timeout
  const fetchWithTimeout = async (url, timeout = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  // Fetch products with comprehensive error handling
  const fetchProducts = useCallback(async (retry = false) => {
    setLoading(true);
    setError(null);

    if (retry) {
      setRetryCount((prev) => prev + 1);
    } else {
      setRetryCount(0);
    }

    let response = null;

    try {
      // Use a working API endpoint - change to invalid URL to test errors
      response = await fetchWithTimeout(
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
      );

      // Check HTTP status
      if (!response.ok) {
        const errorType = response.status >= 500 
          ? ERROR_TYPES.SERVER 
          : ERROR_TYPES.UNKNOWN;
        throw { type: errorType, status: response.status };
      }

      // Parse JSON
      const data = await response.json();

      // Transform to product-like data
      const products = data.map((item) => ({
        id: item.id,
        name: item.title,
        description: item.body,
        price: (item.id * 9.99).toFixed(2),
      }));

      setProducts(products);
    } catch (err) {
      const errorType = err.type || classifyError(err, response);
      setError({
        type: errorType,
        ...ERROR_MESSAGES[errorType],
        technical: err.message || `Status: ${err.status}`,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Render error state
  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>{error.icon}</Text>
      <Text style={styles.errorTitle}>{error.title}</Text>
      <Text style={styles.errorDescription}>{error.description}</Text>
      <Text style={styles.errorTechnical}>{error.technical}</Text>

      {retryCount > 0 && (
        <Text style={styles.retryInfo}>Retry attempt: {retryCount}</Text>
      )}

      <View style={styles.errorActions}>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchProducts(true)}
        >
          <Text style={styles.retryButtonText}>🔄 Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Product Store</Text>
        <Text style={styles.headerSubtitle}>Error handling demo</Text>
      </View>

      {!loading && products.length === 0 && !error && (
        <View style={styles.centered}>
          <TouchableOpacity
            style={styles.loadButton}
            onPress={() => fetchProducts()}
          >
            <Text style={styles.loadButtonText}>Load Products</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#ef4444" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      )}

      {error && renderError()}

      {!loading && !error && products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <TouchableOpacity
              style={styles.refreshBar}
              onPress={() => fetchProducts()}
            >
              <Text style={styles.refreshText}>Tap to refresh</Text>
            </TouchableOpacity>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef2f2',
  },
  header: {
    padding: 20,
    backgroundColor: '#ef4444',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fecaca',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#991b1b',
  },
  loadButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  loadButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#991b1b',
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 16,
    color: '#7f1d1d',
    textAlign: 'center',
    marginTop: 8,
  },
  errorTechnical: {
    fontSize: 12,
    color: '#b91c1c',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'monospace',
  },
  retryInfo: {
    fontSize: 14,
    color: '#dc2626',
    marginTop: 16,
  },
  errorActions: {
    marginTop: 24,
  },
  retryButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  refreshBar: {
    backgroundColor: '#fecaca',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  refreshText: {
    color: '#991b1b',
    fontWeight: '500',
  },
  separator: {
    height: 10,
  },
  productCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  productDescription: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ef4444',
  },
});
```

### Example 2: Form Submission with Validation and Error States
```jsx
import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [serverError, setServerError] = useState(null);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Reset states
    setServerError(null);
    setSubmitStatus(null);

    // Validate
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API call
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.name,
            body: formData.message,
            email: formData.email,
            userId: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Submitted:', data);

      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      // Detailed error handling
      if (error.message === 'Network request failed') {
        setServerError('Unable to connect. Please check your internet.');
      } else if (error.message.includes('timeout')) {
        setServerError('Request timed out. Please try again.');
      } else {
        setServerError(error.message || 'Failed to submit. Please try again.');
      }
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  // Update form field
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Render input with error state
  const renderInput = (field, placeholder, props = {}) => (
    <View style={styles.inputGroup}>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={formData[field]}
        onChangeText={(value) => updateField(field, value)}
        {...props}
      />
      {errors[field] && (
        <Text style={styles.fieldError}>{errors[field]}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>📬 Contact Us</Text>
            <Text style={styles.headerSubtitle}>
              We'd love to hear from you
            </Text>
          </View>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <View style={styles.successBanner}>
              <Text style={styles.successIcon}>✅</Text>
              <View style={styles.successContent}>
                <Text style={styles.successTitle}>Message Sent!</Text>
                <Text style={styles.successText}>
                  Thank you for contacting us. We'll respond shortly.
                </Text>
              </View>
            </View>
          )}

          {/* Server Error */}
          {submitStatus === 'error' && serverError && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <View style={styles.errorContent}>
                <Text style={styles.errorTitle}>Submission Failed</Text>
                <Text style={styles.errorText}>{serverError}</Text>
              </View>
            </View>
          )}

          {/* Form */}
          <View style={styles.form}>
            {renderInput('name', 'Your Name', {
              autoCapitalize: 'words',
            })}

            {renderInput('email', 'Email Address', {
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            })}

            {renderInput('message', 'Your Message', {
              multiline: true,
              numberOfLines: 4,
              textAlignVertical: 'top',
              style: [
                styles.input,
                styles.textArea,
                errors.message && styles.inputError,
              ],
            })}

            <TouchableOpacity
              style={[
                styles.submitButton,
                submitting && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <View style={styles.submitContent}>
                  <ActivityIndicator color="#ffffff" size="small" />
                  <Text style={styles.submitText}>Sending...</Text>
                </View>
              ) : (
                <Text style={styles.submitText}>Send Message</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Form Tips */}
          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Tips</Text>
            <Text style={styles.tipsText}>
              • All fields are required{'\n'}
              • Use a valid email format{'\n'}
              • Messages should be at least 10 characters
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: '#0284c7',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#bae6fd',
    marginTop: 4,
  },
  successBanner: {
    flexDirection: 'row',
    backgroundColor: '#dcfce7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  successContent: {
    flex: 1,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#166534',
  },
  successText: {
    fontSize: 14,
    color: '#15803d',
    marginTop: 2,
  },
  errorBanner: {
    flexDirection: 'row',
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  errorContent: {
    flex: 1,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#991b1b',
  },
  errorText: {
    fontSize: 14,
    color: '#b91c1c',
    marginTop: 2,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  fieldError: {
    color: '#ef4444',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#0284c7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#7dd3fc',
  },
  submitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  tips: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#a16207',
    lineHeight: 22,
  },
});
```

## Tips
- Always categorize errors to provide appropriate user feedback - network errors need different handling than validation errors.
- Implement retry logic with exponential backoff for transient failures (network issues, server overload).
- Use timeouts to prevent requests from hanging indefinitely - 10-30 seconds is typical.
- Log errors for debugging but don't expose sensitive technical details to users.
- Consider showing cached data when network requests fail to maintain app usability offline.
- Validate user input on the client side before making network requests to reduce unnecessary server calls.
