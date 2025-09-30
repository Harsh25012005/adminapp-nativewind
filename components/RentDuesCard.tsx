import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RentDue {
  tenantName: string;
  roomNumber: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export default function RentDuesCard() {
  const rentDues: RentDue[] = [
    { tenantName: 'John Doe', roomNumber: 'A-101', amount: 8000, status: 'Pending' },
    { tenantName: 'Jane Smith', roomNumber: 'B-205', amount: 7500, status: 'Overdue' },
    { tenantName: 'Mike Johnson', roomNumber: 'C-301', amount: 9000, status: 'Paid' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600';
      case 'Pending': return 'text-yellow-600';
      case 'Overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <View className="mb-6 px-4">
      <Text className="text-lg font-semibold text-[var(--foreground)] mb-4">
        Rent Status
      </Text>
      
      <View className="bg-[var(--card)] rounded-lg border border-[var(--border)]">
        {rentDues.map((rent, index) => (
          <TouchableOpacity
            key={index}
            className={`p-4 flex-row justify-between items-center ${
              index !== rentDues.length - 1 ? 'border-b border-[var(--border)]' : ''
            }`}
          >
            <View className="flex-1">
              <Text className="font-medium text-[var(--foreground)]">
                {rent.tenantName}
              </Text>
              <Text className="text-sm text-[var(--muted-foreground)]">
                Room {rent.roomNumber}
              </Text>
            </View>
            
            <View className="items-end">
              <Text className="font-semibold text-[var(--foreground)]">
                ₹{rent.amount.toLocaleString()}
              </Text>
              <Text className={`text-sm font-medium ${getStatusColor(rent.status)}`}>
                {rent.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
