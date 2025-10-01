import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface Complaint {
  tenantName: string;
  roomNumber: string;
  issue: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  status: 'Open' | 'In Progress';
}

export default function ComplaintsCard() {
  const complaints: Complaint[] = [
    { tenantName: 'Alice Brown', roomNumber: 'A-102', issue: 'AC not working', priority: 'High', time: '2h ago', status: 'Open' },
    { tenantName: 'Bob Wilson', roomNumber: 'B-301', issue: 'Water leakage', priority: 'Medium', time: '5h ago', status: 'In Progress' },
    { tenantName: 'Carol Davis', roomNumber: 'C-205', issue: 'WiFi issues', priority: 'Low', time: '1d ago', status: 'Open' }
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High': 
        return { bg: 'bg-red-500', text: 'text-white' };
      case 'Medium': 
        return { bg: 'bg-yellow-500', text: 'text-white' };
      case 'Low': 
        return { bg: 'bg-green-500', text: 'text-white' };
      default: 
        return { bg: 'bg-gray-500', text: 'text-white' };
    }
  };

  return (
    <View className="mb-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4 px-4">
        <View>
          <Text className="text-xl font-bold text-[var(--foreground)]">Active Complaints</Text>
          <Text className="text-xs text-[var(--muted-foreground)] mt-0.5">3 issues need attention</Text>
        </View>
        <TouchableOpacity className="bg-blue-500 px-3 py-1.5 rounded-full">
          <Text className="text-white text-xs font-bold">+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
      >
        {complaints.map((complaint, index) => {
          const priorityStyle = getPriorityStyle(complaint.priority);
          return (
            <TouchableOpacity
              key={index}
              className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)] mr-3 w-80"
            >
              {/* Top Row: Priority Badge and Time */}
              <View className="flex-row items-center justify-between mb-3">
                <View className={`${priorityStyle.bg} px-3 py-1 rounded-full`}>
                  <Text className={`text-xs font-bold ${priorityStyle.text}`}>
                    {complaint.priority} Priority
                  </Text>
                </View>
                <Text className="text-xs text-[var(--muted-foreground)]">{complaint.time}</Text>
              </View>

              {/* Room and Tenant Info */}
              <View className="flex-row items-center mb-2">
                <View className="bg-[var(--muted)] px-2 py-1 rounded-md mr-2">
                  <Text className="text-xs font-bold text-[var(--foreground)]">
                    {complaint.roomNumber}
                  </Text>
                </View>
                <Text className="text-base font-bold text-[var(--foreground)]">
                  {complaint.tenantName}
                </Text>
              </View>

              {/* Issue Description */}
              <Text className="text-sm text-[var(--muted-foreground)] mb-3">
                {complaint.issue}
              </Text>

              {/* Bottom Row: Status and Actions */}
              <View className="flex-row items-center justify-between pt-3 border-t border-[var(--border)]">
                <View className="flex-row items-center">
                  <View className={`w-2 h-2 rounded-full mr-2 ${complaint.status === 'In Progress' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                  <Text className="text-xs font-medium text-[var(--muted-foreground)]">
                    {complaint.status}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity className="bg-blue-500 px-3 py-1.5 rounded-lg">
                    <Text className="text-white text-xs font-semibold">Resolve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-[var(--muted)] px-3 py-1.5 rounded-lg">
                    <Text className="text-[var(--foreground)] text-xs font-semibold">Contact</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
