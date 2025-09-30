import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ChartData {
  income: number[];
  expense: number[];
  labels: string[];
}

export default function RealtimeChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('6 months');
  const [chartData, setChartData] = useState<ChartData>({
    income: [8500, 9200, 8800, 9500, 8900, 9800],
    expense: [2800, 3200, 2900, 3500, 3100, 3300],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => ({
        ...prev,
        income: prev.income.map(val => val + (Math.random() - 0.5) * 200),
        expense: prev.expense.map(val => val + (Math.random() - 0.5) * 100)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...chartData.income, ...chartData.expense);
  const chartHeight = 120;

  return (
    <View className="px-4 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-[var(--foreground)]">
          Revenue Cashflow
        </Text>
        <TouchableOpacity>
          <Text className="text-sm text-[var(--muted-foreground)]">
            Last {selectedPeriod} ▼
          </Text>
        </TouchableOpacity>
      </View>

      <View className="bg-[var(--card)] rounded-2xl p-4 border border-[var(--border)]">
        {/* Stats */}
        <View className="flex-row justify-between mb-6">
          <View>
            <Text className="text-sm text-[var(--muted-foreground)]">Income</Text>
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-[var(--foreground)]">
                ₹{chartData.income[chartData.income.length - 1]?.toLocaleString()}
              </Text>
              <Text className="text-green-600 text-sm ml-2">+5.7%</Text>
            </View>
          </View>
          <View>
            <Text className="text-sm text-[var(--muted-foreground)]">Expenses</Text>
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-[var(--foreground)]">
                ₹{chartData.expense[chartData.expense.length - 1]?.toLocaleString()}
              </Text>
              <Text className="text-red-600 text-sm ml-2">+8.6%</Text>
            </View>
          </View>
        </View>

        {/* Chart */}
        <View style={{ height: chartHeight }} className="relative mb-4">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <View
              key={percent}
              className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700"
              style={{ top: `${percent}%` }}
            />
          ))}

          {/* Income Line */}
          <View className="absolute inset-0 flex-row items-end">
            {chartData.income.map((value, index) => {
              const height = (value / maxValue) * chartHeight;
              const nextValue = chartData.income[index + 1];
              const nextHeight = nextValue ? (nextValue / maxValue) * chartHeight : height;
              
              return (
                <View key={`income-${index}`} className="flex-1 relative">
                  {/* Data point */}
                  <View
                    className="absolute w-2 h-2 bg-blue-500 rounded-full -ml-1"
                    style={{ bottom: height - 4 }}
                  />
                  {/* Line to next point */}
                  {index < chartData.income.length - 1 && (
                    <View
                      className="absolute w-full h-0.5 bg-blue-500"
                      style={{
                        bottom: height,
                        transform: [
                          { rotate: `${Math.atan2(nextHeight - height, 100 / chartData.income.length)}rad` }
                        ]
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>

          {/* Expense Line */}
          <View className="absolute inset-0 flex-row items-end">
            {chartData.expense.map((value, index) => {
              const height = (value / maxValue) * chartHeight;
              const nextValue = chartData.expense[index + 1];
              const nextHeight = nextValue ? (nextValue / maxValue) * chartHeight : height;
              
              return (
                <View key={`expense-${index}`} className="flex-1 relative">
                  {/* Data point */}
                  <View
                    className="absolute w-2 h-2 bg-red-500 rounded-full -ml-1"
                    style={{ bottom: height - 4 }}
                  />
                  {/* Line to next point */}
                  {index < chartData.expense.length - 1 && (
                    <View
                      className="absolute w-full h-0.5 bg-red-500"
                      style={{
                        bottom: height,
                        transform: [
                          { rotate: `${Math.atan2(nextHeight - height, 100 / chartData.expense.length)}rad` }
                        ]
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* X-axis labels */}
        <View className="flex-row justify-between">
          {chartData.labels.map((label, index) => (
            <Text key={index} className="text-xs text-[var(--muted-foreground)]">
              {label}
            </Text>
          ))}
        </View>

        {/* Legend */}
        <View className="flex-row justify-center mt-4 gap-6">
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            <Text className="text-sm text-[var(--muted-foreground)]">Income</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-red-500 rounded-full mr-2" />
            <Text className="text-sm text-[var(--muted-foreground)]">Expenses</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
