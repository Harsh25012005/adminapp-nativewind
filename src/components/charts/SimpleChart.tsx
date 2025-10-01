import React from 'react';
import { View, Text } from 'react-native';

export default function SimpleChart() {
  const monthlyData = [
    { month: 'Jan', income: 85, expense: 28 },
    { month: 'Feb', income: 92, expense: 32 },
    { month: 'Mar', income: 88, expense: 29 },
    { month: 'Apr', income: 95, expense: 35 },
    { month: 'May', income: 89, expense: 31 },
    { month: 'Jun', income: 98, expense: 33 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));

  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold text-[var(--foreground)] mb-4">
        Monthly Overview
      </Text>
      
      <View className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
        {/* Simple Bar Chart */}
        <View className="flex-row items-end justify-between mb-4" style={{ height: 100 }}>
          {monthlyData.map((data, index) => (
            <View key={index} className="items-center flex-1">
              <View className="w-full flex-row justify-center gap-1">
                <View 
                  className="bg-blue-500 rounded-sm w-3"
                  style={{ height: (data.income / maxValue) * 80 }}
                />
                <View 
                  className="bg-red-500 rounded-sm w-3"
                  style={{ height: (data.expense / maxValue) * 80 }}
                />
              </View>
              <Text className="text-xs text-[var(--muted-foreground)] mt-2">
                {data.month}
              </Text>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View className="flex-row justify-center gap-6">
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-blue-500 rounded mr-2" />
            <Text className="text-sm text-[var(--muted-foreground)]">Income</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-red-500 rounded mr-2" />
            <Text className="text-sm text-[var(--muted-foreground)]">Expenses</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
