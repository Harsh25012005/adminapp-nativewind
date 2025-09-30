import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface Payment {
  id: string;
  tenantName: string;
  room: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
}

interface PaymentProps {
  onTabChange?: (tab: string) => void;
}

export default function Payment({ onTabChange }: PaymentProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const payments: Payment[] = [
    {
      id: '1',
      tenantName: 'John Smith',
      room: 'A-101',
      amount: 1200,
      dueDate: '2024-10-01',
      paidDate: '2024-09-28',
      status: 'paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '2',
      tenantName: 'Sarah Johnson',
      room: 'B-205',
      amount: 1500,
      dueDate: '2024-10-01',
      status: 'pending'
    },
    {
      id: '3',
      tenantName: 'Mike Wilson',
      room: 'C-301',
      amount: 1800,
      dueDate: '2024-09-15',
      status: 'overdue'
    },
    {
      id: '4',
      tenantName: 'Emma Davis',
      room: 'A-203',
      amount: 1350,
      dueDate: '2024-10-05',
      paidDate: '2024-10-01',
      status: 'paid',
      paymentMethod: 'Cash'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || payment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'paid', label: 'Paid' },
    { id: 'pending', label: 'Pending' },
    { id: 'overdue', label: 'Overdue' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'pending':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = filteredPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = filteredPayments
    .filter(p => p.status === 'pending' || p.status === 'overdue')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <View className="flex-1 bg-[var(--background)]">
      <Header />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Cards */}
        <View className="px-4 mb-6">
          <View className="flex-row">
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 mr-2 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Total</Text>
              <Text className="text-lg font-bold text-[var(--foreground)]">
                ${totalAmount.toLocaleString()}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 mx-1 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Collected</Text>
              <Text className="text-lg font-bold text-green-600">
                ${paidAmount.toLocaleString()}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 ml-2 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Pending</Text>
              <Text className="text-lg font-bold text-red-600">
                ${pendingAmount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-6">
          <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <TextInput
              className="text-[var(--foreground)] text-base"
              placeholder="Search payments by tenant or room..."
              placeholderTextColor="var(--muted-foreground)"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Filter Buttons */}
          <View className="flex-row mb-2">
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedFilter(option.id)}
                className={`px-4 py-2 rounded-lg mr-3 ${
                  selectedFilter === option.id
                    ? 'bg-[var(--primary)] border border-[var(--primary)]'
                    : 'bg-[var(--card)] border border-[var(--border)]'
                }`}
              >
                <Text className={`font-medium ${
                  selectedFilter === option.id
                    ? 'text-[var(--primary-foreground)]'
                    : 'text-[var(--foreground)]'
                }`}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Cards */}
        <View className="px-4 mb-6">
        {filteredPayments.map((payment) => (
          <View key={payment.id} className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-[var(--foreground)] mb-1">
                  {payment.tenantName}
                </Text>
                <Text className="text-[var(--muted-foreground)] mb-1">
                  Room: {payment.room}
                </Text>
                <Text className="text-xl font-bold text-[var(--foreground)]">
                  ${payment.amount.toLocaleString()}
                </Text>
              </View>
              <View className={`px-3 py-1 rounded-full border ${getStatusColor(payment.status)}`}>
                <Text className="text-xs font-medium">
                  {payment.status.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View className="pt-3 border-t border-[var(--border)]">
              <View className="flex-row justify-between mb-2">
                <Text className="text-[var(--muted-foreground)] text-sm">Due Date:</Text>
                <Text className="text-sm text-[var(--foreground)]">
                  {new Date(payment.dueDate).toLocaleDateString()}
                </Text>
              </View>
              
              {payment.paidDate && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-[var(--muted-foreground)] text-sm">Paid Date:</Text>
                  <Text className="text-sm text-[var(--foreground)]">
                    {new Date(payment.paidDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
              
              {payment.paymentMethod && (
                <View className="flex-row justify-between">
                  <Text className="text-[var(--muted-foreground)] text-sm">Method:</Text>
                  <Text className="text-sm text-[var(--foreground)]">
                    {payment.paymentMethod}
                  </Text>
                </View>
              )}
            </View>

            {payment.status !== 'paid' && (
              <TouchableOpacity className="mt-3 bg-[var(--primary)] rounded-lg py-2 px-4">
                <Text className="text-[var(--primary-foreground)] font-medium text-center">
                  Mark as Paid
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {filteredPayments.length === 0 && (
          <View className="bg-[var(--card)] rounded-lg p-8 items-center border border-[var(--border)]">
            <Text className="text-[var(--muted-foreground)] text-center">
              No payments found matching your criteria
            </Text>
          </View>
        )}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="payment" onTabChange={onTabChange} />
    </View>
  );
}
