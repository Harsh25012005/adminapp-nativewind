import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import type { TabType } from '~/types';

interface KPIData {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  trendColor?: string;
  onPress?: () => void;
}

interface KPICardsProps {
  onTabChange?: (tab: TabType) => void;
}

export default function KPICards({ onTabChange }: KPICardsProps) {
  const kpiData: KPIData[] = [
    {
      title: 'Total Beds',
      value: '48/60',
      subtitle: '12 Vacant',
      trend: '80% Occupied',
      trendColor: 'text-green-600'
    },
    {
      title: 'Tenants',
      value: '48',
      subtitle: '3 New This Month',
      trend: '+6.25%',
      trendColor: 'text-green-600',
      onPress: () => onTabChange?.('tenant')
    },
    {
      title: 'Rent Collection',
      value: '₹2.4L',
      subtitle: '₹36K Pending',
      trend: '87% Collected',
      trendColor: 'text-orange-600'
    },
    {
      title: 'Complaints',
      value: '5',
      subtitle: '2 Resolved Today',
      trend: '3 Open',
      trendColor: 'text-red-600'
    },
    {
      title: 'Meals Served',
      value: '144',
      subtitle: 'Today',
      trend: '48 × 3 meals',
      trendColor: 'text-blue-600'
    }
  ];

  return (
    <View className="mb-6">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
      >
        {kpiData.map((kpi, index) => {
          const CardWrapper = kpi.onPress ? TouchableOpacity : View;
          return (
            <CardWrapper
              key={index}
              onPress={kpi.onPress}
              className="bg-[var(--card)] rounded-lg p-4 mr-3 min-w-[140px] border border-[var(--border)]"
            >
              <Text className="text-sm text-[var(--muted-foreground)] mb-2">
                {kpi.title}
              </Text>
              <Text className="text-2xl font-bold text-[var(--foreground)] mb-1">
                {kpi.value}
              </Text>
              <Text className="text-xs text-[var(--muted-foreground)] mb-1">
                {kpi.subtitle}
              </Text>
              {kpi.trend && (
                <Text className={`text-xs font-medium ${kpi.trendColor || 'text-[var(--muted-foreground)]'}`}>
                  {kpi.trend}
                </Text>
              )}
            </CardWrapper>
          );
        })}
      </ScrollView>
    </View>
  );
}
