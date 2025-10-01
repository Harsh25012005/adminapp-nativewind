import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface Complaint {
  id: string;
  tenantName: string;
  room: string;
  category: 'maintenance' | 'cleanliness' | 'noise' | 'wifi' | 'food' | 'other';
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  resolvedDate?: string;
  assignedTo?: string;
}

interface ComplaintsManagementProps {
  onTabChange?: (tab: string) => void;
}

export default function ComplaintsManagement({ onTabChange }: ComplaintsManagementProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const complaints: Complaint[] = [
    {
      id: '1',
      tenantName: 'Rahul Sharma',
      room: 'A-101',
      category: 'maintenance',
      title: 'AC not working properly',
      description: 'The air conditioner in room A-101 is not cooling properly. It makes strange noises.',
      status: 'open',
      priority: 'high',
      createdDate: '2024-09-28',
      assignedTo: 'Maintenance Team'
    },
    {
      id: '2',
      tenantName: 'Priya Patel',
      room: 'A-101',
      category: 'cleanliness',
      title: 'Bathroom cleaning issue',
      description: 'Common bathroom on 1st floor needs better cleaning. Water logging issue.',
      status: 'in-progress',
      priority: 'medium',
      createdDate: '2024-09-27',
      assignedTo: 'Housekeeping'
    },
    {
      id: '3',
      tenantName: 'Amit Kumar',
      room: 'B-205',
      category: 'wifi',
      title: 'Internet connectivity poor',
      description: 'WiFi speed is very slow in room B-205. Unable to attend online meetings.',
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-09-25',
      resolvedDate: '2024-09-26',
      assignedTo: 'IT Support'
    },
    {
      id: '4',
      tenantName: 'Sneha Reddy',
      room: 'B-205',
      category: 'food',
      title: 'Meal quality concern',
      description: 'Dinner quality has been poor for the last 3 days. Food is not fresh.',
      status: 'open',
      priority: 'high',
      createdDate: '2024-09-29'
    },
    {
      id: '5',
      tenantName: 'Vikash Singh',
      room: 'C-301',
      category: 'noise',
      title: 'Noise from neighboring room',
      description: 'Too much noise from room C-302 during night hours. Disturbing sleep.',
      status: 'closed',
      priority: 'low',
      createdDate: '2024-09-20',
      resolvedDate: '2024-09-22'
    }
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || complaint.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
    { id: 'closed', label: 'Closed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'closed':
        return 'bg-gray-100 border-gray-300 text-gray-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-blue-500 text-white';
      case 'low':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'maintenance': return '🔧';
      case 'cleanliness': return '🧹';
      case 'noise': return '🔊';
      case 'wifi': return '📶';
      case 'food': return '🍽️';
      default: return '📝';
    }
  };

  const openComplaints = complaints.filter(c => c.status === 'open').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedToday = complaints.filter(c => c.resolvedDate === '2024-09-29').length;

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
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Open</Text>
              <Text className="text-lg font-bold text-red-600">
                {openComplaints}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 mx-1 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">In Progress</Text>
              <Text className="text-lg font-bold text-yellow-600">
                {inProgressComplaints}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 ml-2 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Resolved Today</Text>
              <Text className="text-lg font-bold text-green-600">
                {resolvedToday}
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-6">
          <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <TextInput
              className="text-[var(--foreground)] text-base"
              placeholder="Search complaints by tenant, room, or title..."
              placeholderTextColor="var(--muted-foreground)"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Filter Buttons */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          </ScrollView>
        </View>

        {/* Complaint Cards */}
        <View className="px-4 mb-6">
        {filteredComplaints.map((complaint) => (
          <View key={complaint.id} className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Text className="text-lg mr-2">{getCategoryIcon(complaint.category)}</Text>
                  <Text className="text-lg font-semibold text-[var(--foreground)] flex-1">
                    {complaint.title}
                  </Text>
                  <View className={`px-2 py-1 rounded ${getPriorityColor(complaint.priority)}`}>
                    <Text className="text-xs font-medium">
                      {complaint.priority.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text className="text-[var(--muted-foreground)] mb-1">
                  {complaint.tenantName} • {complaint.room}
                </Text>
                <Text className="text-[var(--muted-foreground)] text-sm mb-2">
                  {complaint.description}
                </Text>
                {complaint.assignedTo && (
                  <Text className="text-[var(--muted-foreground)] text-sm">
                    Assigned to: {complaint.assignedTo}
                  </Text>
                )}
              </View>
            </View>
            
            <View className="flex-row justify-between items-center pt-3 border-t border-[var(--border)]">
              <View>
                <Text className="text-[var(--muted-foreground)] text-sm">Created</Text>
                <Text className="text-sm text-[var(--foreground)]">
                  {new Date(complaint.createdDate).toLocaleDateString()}
                </Text>
              </View>
              {complaint.resolvedDate && (
                <View>
                  <Text className="text-[var(--muted-foreground)] text-sm">Resolved</Text>
                  <Text className="text-sm text-[var(--foreground)]">
                    {new Date(complaint.resolvedDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
              <View className={`px-3 py-1 rounded-full border ${getStatusColor(complaint.status)}`}>
                <Text className="text-xs font-medium">
                  {complaint.status.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {filteredComplaints.length === 0 && (
          <View className="bg-[var(--card)] rounded-lg p-8 items-center border border-[var(--border)]">
            <Text className="text-[var(--muted-foreground)] text-center">
              No complaints found matching your criteria
            </Text>
          </View>
        )}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="complaints" onTabChange={onTabChange} />
    </View>
  );
}
