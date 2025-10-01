import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '~/components/layout/Header';
import BottomNavigation from '~/components/layout/BottomNavigation';
import type { ScreenProps, TabType } from '~/types';

interface MenuItem {
  id: TabType | string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function More({ onTabChange }: ScreenProps = {}) {
  const menuItems: MenuItem[] = [
    {
      id: 'complaints',
      title: 'Complaints Management',
      description: 'View and manage tenant complaints',
      icon: '🔧',
      color: 'bg-orange-100 border-orange-300'
    },
    {
      id: 'meals',
      title: 'Meals & Menu',
      description: 'Manage daily meals and weekly menu',
      icon: '🍽️',
      color: 'bg-green-100 border-green-300'
    },
    {
      id: 'notices',
      title: 'Notices & Announcements',
      description: 'Create and manage notices for tenants',
      icon: '📢',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: 'payment',
      title: 'Payment Management',
      description: 'Track rent payments and dues',
      icon: '💰',
      color: 'bg-purple-100 border-purple-300'
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      description: 'View detailed PG reports and analytics',
      icon: '📊',
      color: 'bg-indigo-100 border-indigo-300'
    },
    {
      id: 'settings',
      title: 'PG Settings',
      description: 'Configure PG property details',
      icon: '🏢',
      color: 'bg-gray-100 border-gray-300'
    },
    {
      id: 'documents',
      title: 'Document Manager',
      description: 'Manage tenant agreements and documents',
      icon: '📄',
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      id: 'communication',
      title: 'Bulk Communication',
      description: 'Send messages to all tenants',
      icon: '💬',
      color: 'bg-pink-100 border-pink-300'
    }
  ];

  const quickActions = [
    { id: '1', title: 'Export Data', icon: '📤' },
    { id: '2', title: 'Import Data', icon: '📥' },
    { id: '3', title: 'Generate Report', icon: '📋' },
    { id: '4', title: 'Send Reminder', icon: '⏰' }
  ];

  const appInfo = {
    version: '1.0.0',
    lastUpdate: '2024-10-01',
    developer: 'PG Management Solutions'
  };

  return (
    <View className="flex-1 bg-[var(--background)]">
      <Header />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View className="px-4 mb-6">
          <View className="flex-row flex-wrap">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="bg-[var(--card)] rounded-lg p-4 mr-3 mb-3 border border-[var(--border)] flex-1 min-w-[45%]"
              >
                <Text className="text-2xl mb-2">{action.icon}</Text>
                <Text className="text-[var(--foreground)] font-medium text-sm">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Main Menu Items */}
        <View className="px-4 mb-6">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                // Only navigate if the item.id is a valid TabType
                const validTabs: TabType[] = ['home', 'room', 'tenant', 'payment', 'complaints', 'meals', 'notices', 'more'];
                if (validTabs.includes(item.id as TabType)) {
                  onTabChange?.(item.id as TabType);
                }
              }}
              className="bg-[var(--card)] rounded-lg p-4 mb-3 border border-[var(--border)]"
            >
              <View className="flex-row items-center">
                <View className={`w-12 h-12 rounded-lg ${item.color} items-center justify-center mr-4`}>
                  <Text className="text-xl">{item.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-[var(--foreground)] font-semibold text-base mb-1">
                    {item.title}
                  </Text>
                  <Text className="text-[var(--muted-foreground)] text-sm">
                    {item.description}
                  </Text>
                </View>
                <Text className="text-[var(--muted-foreground)] text-lg">›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Section */}
        <View className="px-4 mb-6">
          <TouchableOpacity className="bg-[var(--card)] rounded-lg p-4 mb-3 border border-[var(--border)]">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-lg bg-blue-100 border border-blue-300 items-center justify-center mr-4">
                <Text className="text-xl">👤</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[var(--foreground)] font-semibold text-base mb-1">
                  Profile Settings
                </Text>
                <Text className="text-[var(--muted-foreground)] text-sm">
                  Update your profile information
                </Text>
              </View>
              <Text className="text-[var(--muted-foreground)] text-lg">›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[var(--card)] rounded-lg p-4 mb-3 border border-[var(--border)]">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-lg bg-red-100 border border-red-300 items-center justify-center mr-4">
                <Text className="text-xl">🔐</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[var(--foreground)] font-semibold text-base mb-1">
                  Security
                </Text>
                <Text className="text-[var(--muted-foreground)] text-sm">
                  Change password and security settings
                </Text>
              </View>
              <Text className="text-[var(--muted-foreground)] text-lg">›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View className="px-4 mb-6">
          <TouchableOpacity className="bg-[var(--card)] rounded-lg p-4 mb-3 border border-[var(--border)]">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-lg bg-green-100 border border-green-300 items-center justify-center mr-4">
                <Text className="text-xl">❓</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[var(--foreground)] font-semibold text-base mb-1">
                  Help Center
                </Text>
                <Text className="text-[var(--muted-foreground)] text-sm">
                  Get help and support
                </Text>
              </View>
              <Text className="text-[var(--muted-foreground)] text-lg">›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[var(--card)] rounded-lg p-4 mb-3 border border-[var(--border)]">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-lg bg-purple-100 border border-purple-300 items-center justify-center mr-4">
                <Text className="text-xl">📞</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[var(--foreground)] font-semibold text-base mb-1">
                  Contact Support
                </Text>
                <Text className="text-[var(--muted-foreground)] text-sm">
                  Reach out to our support team
                </Text>
              </View>
              <Text className="text-[var(--muted-foreground)] text-lg">›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Information & Sign Out */}
        <View className="px-4 mb-6">
          <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <Text className="text-lg font-semibold text-[var(--foreground)] mb-3">
              App Information
            </Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-[var(--muted-foreground)]">Version</Text>
                <Text className="text-[var(--foreground)]">{appInfo.version}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-[var(--muted-foreground)]">Last Update</Text>
                <Text className="text-[var(--foreground)]">
                  {new Date(appInfo.lastUpdate).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-[var(--muted-foreground)]">Developer</Text>
                <Text className="text-[var(--foreground)]">{appInfo.developer}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity className="bg-red-500 rounded-lg p-4">
            <Text className="text-white font-semibold text-center text-base">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation activeTab="more" onTabChange={onTabChange} />
    </View>
  );
}
