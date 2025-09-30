import React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
  return (
    <View className="bg-[var(--background)] px-4 py-6 pt-12">
      <Text className="text-2xl font-bold text-[var(--foreground)]">
        Dashboard
      </Text>
    </View>
  );
}
