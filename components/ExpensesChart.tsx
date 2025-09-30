import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ExpenseCategory {
  name: string;
  amount: number;
  color: string;
  percentage: number;
}

export default function ExpensesChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 5 months');
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([
    { name: 'Food & Groceries', amount: 1850, color: '#3B82F6', percentage: 35 },
    { name: 'Utilities', amount: 1200, color: '#1E40AF', percentage: 23 },
    { name: 'Maintenance', amount: 980, color: '#60A5FA', percentage: 18 },
    { name: 'Transportation', amount: 750, color: '#93C5FD', percentage: 14 },
    { name: 'Others', amount: 520, color: '#DBEAFE', percentage: 10 }
  ]);

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setExpenses(prev => prev.map(expense => ({
        ...expense,
        amount: Math.max(100, expense.amount + (Math.random() - 0.5) * 100)
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Calculate updated percentages
  const updatedExpenses = expenses.map(expense => ({
    ...expense,
    percentage: Math.round((expense.amount / totalAmount) * 100)
  }));

  return (
    <View className="px-4 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-[var(--foreground)]">
          Expenses
        </Text>
        <TouchableOpacity>
          <Text className="text-sm text-[var(--muted-foreground)]">
            {selectedPeriod} ▼
          </Text>
        </TouchableOpacity>
      </View>

      <View className="bg-[var(--card)] rounded-2xl p-4 border border-[var(--border)]">
        {/* Donut Chart */}
        <View className="items-center mb-6">
          <View className="relative">
            {/* Outer circle */}
            <View className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-gray-700" />
            
            {/* Colored segments - simplified representation */}
            <View className="absolute inset-0 w-32 h-32 rounded-full overflow-hidden">
              {updatedExpenses.map((expense, index) => {
                const rotation = updatedExpenses
                  .slice(0, index)
                  .reduce((sum, e) => sum + (e.percentage * 3.6), 0);
                
                return (
                  <View
                    key={expense.name}
                    className="absolute inset-0 w-32 h-32"
                    style={{
                      transform: [{ rotate: `${rotation}deg` }]
                    }}
                  >
                    <View
                      className="absolute top-0 left-1/2 w-4 h-16 -ml-2 origin-bottom"
                      style={{
                        backgroundColor: expense.color,
                        transform: [{ rotate: `${expense.percentage * 1.8}deg` }]
                      }}
                    />
                  </View>
                );
              })}
            </View>

            {/* Center content */}
            <View className="absolute inset-4 bg-[var(--card)] rounded-full items-center justify-center">
              <Text className="text-sm text-[var(--muted-foreground)]">Total</Text>
              <Text className="text-lg font-bold text-[var(--foreground)]">
                ₹{totalAmount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Legend */}
        <View className="space-y-3">
          {updatedExpenses.map((expense, index) => (
            <View key={expense.name} className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: expense.color }}
                />
                <Text className="text-sm text-[var(--foreground)] flex-1">
                  {expense.name}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-sm font-semibold text-[var(--foreground)]">
                  ₹{expense.amount.toLocaleString()}
                </Text>
                <Text className="text-xs text-[var(--muted-foreground)]">
                  {expense.percentage}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
