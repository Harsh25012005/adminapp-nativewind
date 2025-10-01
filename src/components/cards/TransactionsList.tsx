import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  icon: string;
}

export default function TransactionsList() {
  const [filter, setFilter] = useState('All');
  
  const transactions: Transaction[] = [
    {
      id: '1',
      date: 'Jan 18, 2025',
      category: 'Rent',
      description: 'Room A-101 Payment',
      amount: 8500,
      type: 'income',
      icon: '🏠'
    },
    {
      id: '2',
      date: 'Jan 14, 2025',
      category: 'Maintenance',
      description: 'AC Repair Service',
      amount: 2500,
      type: 'expense',
      icon: '🔧'
    },
    {
      id: '3',
      date: 'Jan 17, 2025',
      category: 'Utilities',
      description: 'Electricity Bill',
      amount: 1200,
      type: 'expense',
      icon: '⚡'
    },
    {
      id: '4',
      date: 'Jan 16, 2025',
      category: 'Rent',
      description: 'Room B-205 Payment',
      amount: 7500,
      type: 'income',
      icon: '🏠'
    },
    {
      id: '5',
      date: 'Jan 13, 2025',
      category: 'Food',
      description: 'Grocery Shopping',
      amount: 850,
      type: 'expense',
      icon: '🛒'
    }
  ];

  const getStatusColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  const getAmountPrefix = (type: string) => {
    return type === 'income' ? '+' : '-';
  };

  return (
    <View className="px-4 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-[var(--foreground)]">
          Transactions
        </Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity>
            <Text className="text-sm text-[var(--muted-foreground)]">🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-sm text-[var(--muted-foreground)]">Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
        {/* Filter Tabs */}
        <View className="flex-row p-1 m-4 bg-[var(--muted)] rounded-lg">
          {['All', 'Income', 'Expenses'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setFilter(tab)}
              className={`flex-1 py-2 px-3 rounded-md ${
                filter === tab ? 'bg-white dark:bg-gray-800 shadow-sm' : ''
              }`}
            >
              <Text className={`text-center text-sm font-medium ${
                filter === tab 
                  ? 'text-[var(--foreground)]' 
                  : 'text-[var(--muted-foreground)]'
              }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions List */}
        <View className="px-4 pb-4">
          {transactions.map((transaction, index) => (
            <TouchableOpacity
              key={transaction.id}
              className={`flex-row items-center py-3 ${
                index !== transactions.length - 1 ? 'border-b border-[var(--border)]' : ''
              }`}
            >
              {/* Icon */}
              <View className="w-10 h-10 bg-[var(--muted)] rounded-full items-center justify-center mr-3">
                <Text className="text-lg">{transaction.icon}</Text>
              </View>

              {/* Details */}
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="font-medium text-[var(--foreground)]">
                    {transaction.description}
                  </Text>
                  <Text className={`font-semibold ${getStatusColor(transaction.type)}`}>
                    {getAmountPrefix(transaction.type)}₹{transaction.amount.toLocaleString()}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <Text className="text-sm text-[var(--muted-foreground)]">
                      {transaction.date}
                    </Text>
                    <View className="w-1 h-1 bg-[var(--muted-foreground)] rounded-full mx-2" />
                    <Text className="text-sm text-[var(--muted-foreground)]">
                      {transaction.category}
                    </Text>
                  </View>
                  <View className={`px-2 py-1 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      transaction.type === 'income' 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {transaction.type === 'income' ? 'Credit' : 'Debit'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
