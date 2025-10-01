import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'maintenance' | 'payment' | 'rules' | 'event' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  expiryDate?: string;
  isActive: boolean;
  targetAudience: 'all' | 'specific-rooms' | 'new-tenants';
  createdBy: string;
  readBy?: string[];
}

interface NoticesManagementProps {
  onTabChange?: (tab: string) => void;
}

export default function NoticesManagement({ onTabChange }: NoticesManagementProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('active');

  const notices: Notice[] = [
    {
      id: '1',
      title: 'Rent Payment Due Reminder',
      content: 'Dear Tenants, This is a friendly reminder that rent for October 2024 is due by 5th October. Please make your payment on time to avoid any late fees. Payment can be made via UPI, bank transfer, or cash. Contact the office for any queries.',
      category: 'payment',
      priority: 'high',
      createdDate: '2024-10-01',
      expiryDate: '2024-10-05',
      isActive: true,
      targetAudience: 'all',
      createdBy: 'Admin',
      readBy: ['tenant1', 'tenant2', 'tenant5']
    },
    {
      id: '2',
      title: 'WiFi Maintenance Schedule',
      content: 'WiFi maintenance will be conducted on 3rd October from 2 PM to 4 PM. Internet services will be temporarily unavailable during this time. We apologize for any inconvenience caused.',
      category: 'maintenance',
      priority: 'medium',
      createdDate: '2024-09-30',
      expiryDate: '2024-10-03',
      isActive: true,
      targetAudience: 'all',
      createdBy: 'IT Team',
      readBy: ['tenant1', 'tenant3', 'tenant4', 'tenant7']
    },
    {
      id: '3',
      title: 'New House Rules - Quiet Hours',
      content: 'Effective immediately, quiet hours are from 10 PM to 7 AM. Please keep noise levels to a minimum during these hours to ensure a peaceful environment for all residents. Violations may result in warnings or penalties.',
      category: 'rules',
      priority: 'high',
      createdDate: '2024-09-28',
      isActive: true,
      targetAudience: 'all',
      createdBy: 'Management',
      readBy: ['tenant1', 'tenant2', 'tenant3', 'tenant6', 'tenant8']
    },
    {
      id: '4',
      title: 'Diwali Celebration - October 12th',
      content: 'Join us for Diwali celebrations on October 12th at 7 PM in the common area. We will have special dinner, decorations, and cultural activities. All residents are invited to participate and make this festival memorable!',
      category: 'event',
      priority: 'medium',
      createdDate: '2024-09-25',
      expiryDate: '2024-10-12',
      isActive: true,
      targetAudience: 'all',
      createdBy: 'Cultural Committee',
      readBy: ['tenant2', 'tenant4', 'tenant5', 'tenant9']
    },
    {
      id: '5',
      title: 'Water Supply Disruption - Emergency',
      content: 'URGENT: Water supply will be disrupted tomorrow (2nd Oct) from 6 AM to 12 PM due to pipeline repair work by the municipal corporation. Please store sufficient water in advance. Emergency water will be available in the ground floor.',
      category: 'urgent',
      priority: 'urgent',
      createdDate: '2024-10-01',
      expiryDate: '2024-10-02',
      isActive: true,
      targetAudience: 'all',
      createdBy: 'Maintenance',
      readBy: ['tenant1', 'tenant3', 'tenant5', 'tenant7', 'tenant10']
    },
    {
      id: '6',
      title: 'Security Deposit Refund Process',
      content: 'For tenants planning to vacate, please note that security deposit refunds will be processed within 30 days of checkout. Ensure all dues are cleared and room is in good condition for smooth refund process.',
      category: 'general',
      priority: 'low',
      createdDate: '2024-09-20',
      isActive: false,
      targetAudience: 'all',
      createdBy: 'Admin',
      readBy: ['tenant2', 'tenant6']
    }
  ];

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === 'active') {
      matchesFilter = notice.isActive;
    } else if (selectedFilter === 'inactive') {
      matchesFilter = !notice.isActive;
    } else if (selectedFilter !== 'all') {
      matchesFilter = notice.category === selectedFilter;
    }
    
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { id: 'active', label: 'Active' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'payment', label: 'Payment' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'event', label: 'Events' },
    { id: 'all', label: 'All' },
    { id: 'inactive', label: 'Inactive' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'urgent':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'payment':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'maintenance':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'rules':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'event':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'general':
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
      case 'urgent': return '🚨';
      case 'payment': return '💰';
      case 'maintenance': return '🔧';
      case 'rules': return '📋';
      case 'event': return '🎉';
      case 'general': return '📢';
      default: return '📝';
    }
  };

  const activeNotices = notices.filter(n => n.isActive).length;
  const urgentNotices = notices.filter(n => n.priority === 'urgent' && n.isActive).length;
  const totalReads = notices.reduce((sum, notice) => sum + (notice.readBy?.length || 0), 0);

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

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
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Active Notices</Text>
              <Text className="text-lg font-bold text-[var(--foreground)]">
                {activeNotices}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 mx-1 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Urgent</Text>
              <Text className="text-lg font-bold text-red-600">
                {urgentNotices}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 ml-2 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Total Reads</Text>
              <Text className="text-lg font-bold text-green-600">
                {totalReads}
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-6">
          <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <TextInput
              className="text-[var(--foreground)] text-base"
              placeholder="Search notices by title, content, or category..."
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

        {/* Notice Cards */}
        <View className="px-4 mb-6">
        {filteredNotices.map((notice) => (
          <View key={notice.id} className={`bg-[var(--card)] rounded-lg p-4 mb-4 border ${
            notice.isActive ? 'border-[var(--border)]' : 'border-gray-300 opacity-60'
          }`}>
            {/* Header */}
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Text className="text-lg mr-2">{getCategoryIcon(notice.category)}</Text>
                  <Text className="text-lg font-semibold text-[var(--foreground)] flex-1">
                    {notice.title}
                  </Text>
                  {!notice.isActive && (
                    <View className="bg-gray-200 px-2 py-1 rounded ml-2">
                      <Text className="text-xs text-gray-600">INACTIVE</Text>
                    </View>
                  )}
                </View>
                
                <View className="flex-row items-center mb-2">
                  <View className={`px-2 py-1 rounded mr-2 ${getPriorityColor(notice.priority)}`}>
                    <Text className="text-xs font-medium">
                      {notice.priority.toUpperCase()}
                    </Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full border ${getCategoryColor(notice.category)}`}>
                    <Text className="text-xs font-medium">
                      {notice.category.toUpperCase()}
                    </Text>
                  </View>
                  {isExpiringSoon(notice.expiryDate) && (
                    <View className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded ml-2">
                      <Text className="text-xs text-yellow-800">EXPIRING SOON</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Content */}
            <Text className="text-[var(--muted-foreground)] text-sm mb-3 leading-5">
              {notice.content}
            </Text>

            {/* Footer */}
            <View className="flex-row justify-between items-center pt-3 border-t border-[var(--border)]">
              <View>
                <Text className="text-[var(--muted-foreground)] text-xs">
                  By {notice.createdBy} • {new Date(notice.createdDate).toLocaleDateString()}
                </Text>
                {notice.expiryDate && (
                  <Text className="text-[var(--muted-foreground)] text-xs">
                    Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
              <View className="items-end">
                <Text className="text-[var(--muted-foreground)] text-xs">
                  Read by {notice.readBy?.length || 0} tenants
                </Text>
                <Text className="text-[var(--muted-foreground)] text-xs">
                  Target: {notice.targetAudience.replace('-', ' ')}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {filteredNotices.length === 0 && (
          <View className="bg-[var(--card)] rounded-lg p-8 items-center border border-[var(--border)]">
            <Text className="text-[var(--muted-foreground)] text-center">
              No notices found matching your criteria
            </Text>
          </View>
        )}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="notices" onTabChange={onTabChange} />
    </View>
  );
}
