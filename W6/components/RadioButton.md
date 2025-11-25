# RadioButton

## Overview
React Native çekirdeğinde hazır bir Radio Button bulunmadığı için Expo projelerinde ya `Pressable` ile özel bir bileşen yazılır ya da `react-native-paper`, `@rneui/themed` gibi tasarım kütüphanelerine başvurulur. Özel bileşen yaklaşımı, uygulamanızın tipografisine ve renk paletine uygun sade daireler üretmenizi sağlar. Radio Button tek seçimli formlar, ders parçası seçimleri veya tema değiştirme gibi durumlar için idealdir.

## Notable Props (özel bileşen için)
- `value`: Radio grubundaki benzersiz değeri temsil eder.
- `isSelected`: Kontrolün işaretli olup olmadığını belirler.
- `label`: Kullanıcıya gösterilecek metin.
- `onPress(value)`: Seçim değiştiğinde tetiklenen geri çağırım.
- `disabled`: Etkileşimi devre dışı bırakır; tipik olarak önkoşullar sağlanmadığında kullanılır.
- `size`, `activeColor`, `inactiveColor`: Görsel tutarlılık için sık kullanılan stil prop'ları.

## Key Events
- `onPress`: Pressable veya TouchableOpacity üzerinden gelir; yeni değeri state'e yazmak için kullanılır.
- `onAccessibilityTap`: Erişilebilirlik modunda seçimi değiştirir; `accessibilityRole="radio"` ile eşleştirilmelidir.

## Examples

### Example 1: Modül Seçimi
```jsx
import { useState } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';

const MODULES = [
  { id: 'core', title: 'Core Components' },
  { id: 'state', title: 'State & Props' },
  { id: 'nav', title: 'Navigation' },
];

function RadioItem({ label, value, isSelected, onPress }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      onPress={() => onPress(value)}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 2,
          borderColor: isSelected ? '#38bdf8' : '#475569',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isSelected && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#38bdf8',
            }}
          />
        )}
      </View>
      <Text style={{ color: '#e2e8f0', fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}

export default function ModuleSelector() {
  const [value, setValue] = useState('core');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a', padding: 24 }}>
      <Text style={{ color: '#94a3b8' }}>Aktif modül</Text>
      <Text style={{ color: '#e2e8f0', fontSize: 22, fontWeight: '700', marginBottom: 16 }}>
        {MODULES.find((item) => item.id === value)?.title}
      </Text>
      {MODULES.map((item) => (
        <RadioItem
          key={item.id}
          label={item.title}
          value={item.id}
          isSelected={value === item.id}
          onPress={setValue}
        />
      ))}
    </SafeAreaView>
  );
}
```

### Example 2: FlatList Tabanlı Oturum Seçici
```jsx
import { useState } from 'react';
import { SafeAreaView, FlatList, View, Text, Pressable } from 'react-native';

const TRACKS = [
  { id: 'foundation', label: 'Foundation · Layout' },
  { id: 'growth', label: 'Growth · Networking' },
  { id: 'advanced', label: 'Advanced · Performance' },
  { id: 'capstone', label: 'Capstone · Final Project' },
];

export default function TrackSelector() {
  const [selected, setSelected] = useState('foundation');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617', paddingTop: 24 }}>
      <FlatList
        data={TRACKS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        renderItem={({ item }) => {
          const isActive = item.id === selected;
          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ selected: isActive }}
              onPress={() => setSelected(item.id)}
              style={{
                backgroundColor: isActive ? '#172554' : '#0f172a',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: isActive ? '#38bdf8' : '#1e293b',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: isActive ? '#38bdf8' : '#475569',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isActive && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#38bdf8',
                    }}
                  />
                )}
              </View>
              <Text style={{ color: '#e2e8f0', fontSize: 16 }}>{item.label}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
```

## Tips
- Radio grubu için `accessibilityRole="radiogroup"` değerini kapsayıcı View'da kullanmak, screen reader deneyimini iyileştirir.
- `useCallback` ile `onPress` fonksiyonlarını sarmak yeniden render maliyetini düşürür.
- Çok sayıda seçenek varsa Radio Button yerine Picker kullanmayı düşünün; aksi halde ekran kalabalıklaşır.
- Tasarımı hızlandırmak için `react-native-paper` veya `native-base` gibi bileşen kütüphanelerinden hazır RadioButton bileşenleri kullanabilirsiniz.
