import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface MoreProps {
  onTabChange?: (tab: string) => void;
}

export default function More({ onTabChange }: MoreProps = {}) {
  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Reports & Analytics',
      description: 'View detailed reports and analytics',
      icon: '📊',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: '2',
      title: 'Maintenance Requests',
      description: 'Manage property maintenance requests',
      icon: '🔧',
      color: 'bg-orange-100 border-orange-300'
    },
    {
      id: '3',
      title: 'Notifications',
      description: 'Configure app notifications',
      icon: '🔔',
      color: 'bg-purple-100 border-purple-300'
    },
    {
      id: '4',
      title: 'Backup & Sync',
      description: 'Backup and sync your data',
      icon: '☁️',
      color: 'bg-green-100 border-green-300'
    },
    {
      id: '5',
      title: 'User Management',
      description: 'Manage users and permissions',
      icon: '👥',
      color: 'bg-indigo-100 border-indigo-300'
    },
    {
      id: '6',
      title: 'Property Settings',
      description: 'Configure property details',
      icon: '🏢',
      color: 'bg-gray-100 border-gray-300'
    },
    {
      id: '7',
      title: 'Document Manager',
      description: 'Manage contracts and documents',
      icon: '📄',
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      id: '8',
      title: 'Communication',
      description: 'Send messages to tenants',
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
    developer: 'Property Management Solutions'
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
