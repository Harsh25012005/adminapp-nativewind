import React from 'react';
import { View, Text } from 'react-native';

export default function SimpleStats() {
  const stats = [
    { label: 'Total Revenue', value: '₹95,000', change: '+12%' },
    { label: 'Occupancy', value: '75%', change: '45/60' },
    { label: 'Pending Rent', value: '₹15,000', change: '3 tenants' },
    { label: 'Complaints', value: '2', change: 'Open' }
  ];

  return (
    <View className="px-4 mb-6">
      <View className="flex-row flex-wrap gap-3">
        {stats.map((stat, index) => (
          <View 
            key={index} 
            className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]"
            style={{ width: '48%' }}
          >
            <Text className="text-sm text-[var(--muted-foreground)] mb-1">
              {stat.label}
            </Text>
            <Text className="text-xl font-bold text-[var(--foreground)] mb-1">
              {stat.value}
            </Text>
            <Text className="text-xs text-[var(--muted-foreground)]">
              {stat.change}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
