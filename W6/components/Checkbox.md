# Checkbox

## Overview
Expo projelerinde Checkbox için iki yaygın seçenek bulunur: `expo-checkbox` paketi veya `@react-native-community/checkbox`. İkisi de iOS ve Android'de yerel görünümler sunar, kontrollü kullanım için `value` ve `onValueChange` prop'larına dayanır. Checkbox, çok seçenekli listeler, görev takipleri ve onay gerektiren formlar için kullanılır.

## Notable Props (expo-checkbox)
- `value`: Boolean seçili durumu; React state ile kontrol edilir.
- `onValueChange(nextValue)`: Kullanıcı etkileşimiyle tetiklenir; state veya form kütüphanesine yeni değeri iletirsiniz.
- `color`: İşaretli durumdaki doldurma veya kenarlık rengini değiştirir (platforma göre).
- `disabled`: İletişimi geçici olarak kapatır; veri yüklenirken veya koşul sağlanmadığında kullanın.
- `style`: Konteyner düzeyinde boyutlandırma ve hizalama sağlar.

## Key Events
- `onValueChange`: Ana olaydır; `onPress` veya `Pressable` kullanmadan state güncellemenizi sağlar.

## Examples

### Example 1: Ders Görev Listesi
```jsx
import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

const TASKS = [
  { id: 'slides', label: 'Yeni slaytları gözden geçir' },
  { id: 'demo', label: 'Image + ScrollView demosunu çalıştır' },
  { id: 'prep', label: 'Soru-cevap senaryosu hazırla' },
];

export default function LessonChecklist() {
  const [completed, setCompleted] = useState({});

  const toggleTask = (taskId, value) => {
    setCompleted((prev) => ({ ...prev, [taskId]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a', padding: 24, gap: 16 }}>
      <Text style={{ color: '#e2e8f0', fontSize: 22, fontWeight: '700' }}>W6 Hazırlığı</Text>
      {TASKS.map((task) => (
        <View
          key={task.id}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }}
        >
          <Checkbox
            value={!!completed[task.id]}
            onValueChange={(value) => toggleTask(task.id, value)}
            color={completed[task.id] ? '#22c55e' : undefined}
            style={{ width: 22, height: 22, borderRadius: 6 }}
          />
          <Text
            style={{
              color: '#e2e8f0',
              textDecorationLine: completed[task.id] ? 'line-through' : 'none',
            }}
          >
            {task.label}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
```

### Example 2: Katılımcı Ayarları Formu
```jsx
import { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

const SETTINGS = [
  { id: 'recordings', label: 'Oturum kayıtlarını paylaş' },
  { id: 'reminders', label: 'Ders başlamadan 1 saat önce hatırlat' },
  { id: 'survey', label: 'Her ders sonrası mini anket gönder' },
];

export default function ParticipantSettings() {
  const [options, setOptions] = useState(
    SETTINGS.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );

  const allActive = useMemo(() => Object.values(options).some(Boolean), [options]);

  const toggle = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617', padding: 24 }}>
      <Text style={{ color: '#e2e8f0', fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
        Katılımcı Ayarları
      </Text>
      {SETTINGS.map((setting) => (
        <View
          key={setting.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
          }}
        >
          <Text style={{ color: '#e2e8f0', fontSize: 16 }}>{setting.label}</Text>
          <Checkbox
            value={options[setting.id]}
            onValueChange={(value) => toggle(setting.id, value)}
            color={options[setting.id] ? '#38bdf8' : undefined}
          />
        </View>
      ))}

      <TouchableOpacity
        style={{
          marginTop: 32,
          backgroundColor: allActive ? '#38bdf8' : '#334155',
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: 'center',
        }}
        disabled={!allActive}
      >
        <Text style={{ color: '#0f172a', fontWeight: '700' }}>Ayarları Kaydet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
```

## Tips
- `npx expo install expo-checkbox` komutu ile paketi ekleyin; Bare React Native kullanıyorsanız `@react-native-community/checkbox` da aynı API'ye sahiptir.
- Checkbox'ı `Pressable` ile sarmalayarak daha büyük dokunma alanı oluşturabilirsiniz; `hitSlop` eklemeyi unutmayın.
- Form kütüphaneleriyle (`Formik`, `React Hook Form`) kullanırken `Controller` bileşenleriyle entegre etmek senkronizasyonu kolaylaştırır.
- Çoklu seçimleri JSON isteğine göndermeden önce `Object.entries` ile `true` olanları filtreleyip yalnızca seçili değerleri API'ye yollayın.
