import React from 'react';
import { View, Text, ScrollView } from 'react-native';

interface KPIData {
  title: string;
  value: string;
  subtitle: string;
}

export default function KPICards() {
  const kpiData: KPIData[] = [
    {
      title: 'Beds',
      value: '45/60',
      subtitle: '15 Vacant'
    },
    {
      title: 'Tenants',
      value: '45',
      subtitle: 'Active'
    },
    {
      title: 'Rent',
      value: '₹85K',
      subtitle: '₹15K Pending'
    },
    {
      title: 'Complaints',
      value: '3',
      subtitle: 'Open'
    }
  ];

  return (
    <View className="mb-8">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {kpiData.map((kpi, index) => (
          <View
            key={index}
            className="bg-[var(--card)] rounded-lg p-4 mr-3 min-w-[120px] border border-[var(--border)]"
          >
            <Text className="text-sm text-[var(--muted-foreground)] mb-2">
              {kpi.title}
            </Text>
            <Text className="text-2xl font-bold text-[var(--foreground)] mb-1">
              {kpi.value}
            </Text>
            <Text className="text-xs text-[var(--muted-foreground)]">
              {kpi.subtitle}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
