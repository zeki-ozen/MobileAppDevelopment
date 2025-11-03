# Image

## Overview
`Image` is the core component for loading local and remote graphics. In Expo projects it lets you manage bundled static assets and network-fetched images through the same API. You benefit from platform optimizations such as automatic caching, source selection for different resolutions, and placeholder fallbacks while content is loading.

## Notable Props
- `source`: Specifies the image source—either `{ uri: 'https://...' }` or `require('./assets/logo.png')`. Metro automatically appends dimensions for bundled assets.
- `resizeMode`: Controls how the image fits inside its container (`cover`, `contain`, `stretch`, `repeat`, `center`); essential for responsive card layouts.
- `style`: Defines visuals like size, border radius, borders, and shadows; combine with `aspectRatio` to preserve proportions.
- `defaultSource`: Displays a built-in placeholder while the main image loads (iOS only); improves perceived performance on slow networks.
- `blurRadius`: Applies a blur effect, handy for background overlays or skeleton states.
- `loadingIndicatorSource`: Points to a GIF or static asset used as a custom loader while the image downloads (Android).
- `fadeDuration`: Sets the fade-in animation duration after the image loads (Android).
- `progressiveRenderingEnabled` (iOS): Streams remote images progressively to improve perceived load times.

## Key Events
- `onLoadStart`: Fires when the image begins loading—perfect for triggering spinners.
- `onLoad`: Fires when the image has finished loading successfully; exposes dimensions under `nativeEvent.source`.
- `onLoadEnd`: Fires when loading completes, regardless of success, so you can hide loaders.
- `onError`: Fires when the source fails to load—swap in a fallback or show error messaging.
- `onProgress` (remote sources only): Reports downloaded bytes, enabling progress bars.

## Examples
### Example 1: News Card with Loading Feedback
```jsx
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function NewsCard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <View
            style={{
              height: 200,
              overflow: 'hidden',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {loading && !error && (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#e2e8f0',
                }}
              >
                <ActivityIndicator color="#2563eb" />
              </View>
            )}
            {error && (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#e2e8f0',
                }}
              >
                <Text>Image failed to load</Text>
              </View>
            )}
            <Image
              source={{ uri: 'https://picsum.photos/600/400' }}
              style={{ width: '100%', height: '100%' }}
              onLoadStart={() => {
                setLoading(true);
                setError(false);
              }}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
          </View>
          <View style={{ padding: 20, gap: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
              New React Native Course Launch
            </Text>
            <Text style={{ color: '#475569', lineHeight: 20 }}>
              The latest series covers everything from core components to performance
              optimization, all built with Expo.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: Image Playground (resizeMode, blurRadius, Error Handling)
```jsx
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PRIMARY_URI = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518';
const FALLBACK_URI =
  'https://ui-avatars.com/api/?background=2563eb&color=fff&name=React+Native';
const MODES = ['cover', 'contain', 'stretch', 'center', 'repeat'];

export default function ImagePlayground() {
  const [uri, setUri] = useState(PRIMARY_URI);
  const [status, setStatus] = useState('Ready');
  const [resizeMode, setResizeMode] = useState(MODES[0]);
  const [blurEnabled, setBlurEnabled] = useState(false);

  const infoText = useMemo(() => {
    switch (status) {
      case 'loading':
        return 'Image is loading...';
      case 'loaded':
        return 'Image loaded successfully.';
      case 'fallback':
        return 'Primary source failed, showing fallback image.';
      default:
        return 'Ready.';
    }
  }, [status]);

  const triggerError = () => {
    setStatus('loading');
    setUri('https://invalid-url.example.com/image.jpg');
  };

  const enablePrimary = () => {
    setStatus('loading');
    setUri(PRIMARY_URI);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <View
        style={{
          flex: 1,
          padding: 24,
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <Text style={{ color: '#f8fafc', fontSize: 22, fontWeight: '700' }}>
          Image playground
        </Text>
        <Text style={{ color: '#94a3b8' }}>
          Active `resizeMode`: <Text style={{ fontWeight: '700' }}>{resizeMode}</Text> ·
          `blurRadius`: {blurEnabled ? 18 : 0}
        </Text>

        <View
          style={{
            height: 220,
            borderRadius: 20,
            backgroundColor: '#1f2937',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {status === 'loading' && (
            <ActivityIndicator color="#38bdf8" size="large" />
          )}
          <Image
            source={{ uri }}
            style={{ width: '100%', height: '100%' }}
            resizeMode={resizeMode}
            blurRadius={blurEnabled ? 18 : 0}
            onLoadStart={() => setStatus('loading')}
            onLoad={() => setStatus('loaded')}
            onError={() => {
              setStatus('fallback');
              setUri(FALLBACK_URI);
            }}
          />
        </View>

        <Text style={{ color: '#e2e8f0' }}>{infoText}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {MODES.map((mode) => {
            const isActive = mode === resizeMode;
            return (
              <TouchableOpacity
                key={mode}
                onPress={() => setResizeMode(mode)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 999,
                  backgroundColor: isActive ? '#38bdf8' : '#1f2937',
                }}
              >
                <Text style={{ color: isActive ? '#0f172a' : '#e2e8f0' }}>
                  {mode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <TouchableOpacity
            onPress={() => setBlurEnabled((prev) => !prev)}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: blurEnabled ? '#f97316' : '#1e293b',
            }}
          >
            <Text style={{ color: '#f8fafc', fontWeight: '600' }}>
              {blurEnabled ? 'Disable blur' : 'Enable blur'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={triggerError}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: '#ef4444',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              Simulate failure
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={enablePrimary}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: '#22c55e',
            }}
          >
            <Text style={{ color: '#0f172a', fontWeight: '600' }}>
              Back to original
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- Use the Expo Asset system to pre-bundle and cache images—especially useful for splash screens and icons.
- Resize large remote images ahead of time to reduce bandwidth consumption and speed up rendering.
