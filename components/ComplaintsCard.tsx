import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Complaint {
  tenantName: string;
  roomNumber: string;
  issue: string;
  priority: 'High' | 'Medium' | 'Low';
}

export default function ComplaintsCard() {
  const complaints: Complaint[] = [
    { tenantName: 'Alice Brown', roomNumber: 'A-102', issue: 'AC not working', priority: 'High' },
    { tenantName: 'Bob Wilson', roomNumber: 'B-301', issue: 'Water leakage', priority: 'Medium' },
    { tenantName: 'Carol Davis', roomNumber: 'C-205', issue: 'WiFi issues', priority: 'Low' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <View className="mb-6 px-4">
      <Text className="text-lg font-semibold text-[var(--foreground)] mb-4">
        Complaints
      </Text>

      <View className="bg-[var(--card)] rounded-lg border border-[var(--border)]">
        {complaints.map((complaint, index) => (
          <TouchableOpacity
            key={index}
            className={`p-4 ${
              index !== complaints.length - 1 ? 'border-b border-[var(--border)]' : ''
            }`}
          >
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="font-medium text-[var(--foreground)]">
                  {complaint.tenantName}
                </Text>
                <Text className="text-sm text-[var(--muted-foreground)]">
                  Room {complaint.roomNumber}
                </Text>
              </View>
              <Text className={`text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                {complaint.priority}
              </Text>
            </View>
            
            <Text className="text-sm text-[var(--muted-foreground)]">
              {complaint.issue}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
