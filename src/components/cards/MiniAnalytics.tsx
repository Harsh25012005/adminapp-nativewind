import React from 'react';
import { View, Text } from 'react-native';

export default function MiniAnalytics() {
  return (
    <View className="mb-6 px-4">
      <Text className="text-lg font-semibold text-[var(--foreground)] mb-4">
        Summary
      </Text>
      
      <View className="flex-row gap-4">
        <View className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-lg p-4">
          <Text className="text-sm text-[var(--muted-foreground)] mb-1">
            Monthly Collection
          </Text>
          <Text className="text-xl font-bold text-[var(--foreground)]">
            ₹95K
          </Text>
          <Text className="text-sm text-green-600">
            +12% from last month
          </Text>
        </View>

        <View className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-lg p-4">
          <Text className="text-sm text-[var(--muted-foreground)] mb-1">
            Occupancy Rate
          </Text>
          <Text className="text-xl font-bold text-[var(--foreground)]">
            75%
          </Text>
          <Text className="text-sm text-[var(--muted-foreground)]">
            45 of 60 beds
          </Text>
        </View>
      </View>
    </View>
  );
}
