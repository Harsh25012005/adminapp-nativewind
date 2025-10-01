import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function SimpleTransactions() {
  const transactions = [
    { name: 'Room A-101 Rent', amount: 8500, type: 'income', date: 'Jan 18' },
    { name: 'Electricity Bill', amount: 1200, type: 'expense', date: 'Jan 17' },
    { name: 'Room B-205 Rent', amount: 7500, type: 'income', date: 'Jan 16' },
    { name: 'Maintenance', amount: 850, type: 'expense', date: 'Jan 15' },
    { name: 'Room C-301 Rent', amount: 9000, type: 'income', date: 'Jan 14' }
  ];

  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold text-[var(--foreground)] mb-4">
        Recent Transactions
      </Text>
      
      <View className="bg-[var(--card)] rounded-lg border border-[var(--border)]">
        {transactions.map((transaction, index) => (
          <TouchableOpacity
            key={index}
            className={`p-4 flex-row justify-between items-center ${
              index !== transactions.length - 1 ? 'border-b border-[var(--border)]' : ''
            }`}
          >
            <View className="flex-1">
              <Text className="font-medium text-[var(--foreground)]">
                {transaction.name}
              </Text>
              <Text className="text-sm text-[var(--muted-foreground)]">
                {transaction.date}
              </Text>
            </View>
            
            <Text className={`font-semibold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
