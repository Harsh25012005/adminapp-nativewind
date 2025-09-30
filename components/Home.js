import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function Home() {
  const quickActions = [
    { title: 'Query Tool', description: 'Execute SQL queries', icon: '🔍' },
    { title: 'Database Browser', description: 'Browse tables and schemas', icon: '📊' },
    { title: 'User Management', description: 'Manage database users', icon: '👥' },
    { title: 'Backup & Restore', description: 'Database backup operations', icon: '💾' },
  ];

  const recentConnections = [
    { name: 'Production DB', host: 'prod.example.com', status: 'Connected' },
    { name: 'Development DB', host: 'dev.example.com', status: 'Disconnected' },
    { name: 'Staging DB', host: 'staging.example.com', status: 'Connected' },
  ];

  return (
    <ScrollView className="flex-1 bg-[var(--background)]">
      {/* Header */}
      <View className="bg-[var(--card)] border-b border-[var(--border)] px-6 py-4">
        <Text className="text-2xl font-bold text-[var(--foreground)]">
          PG Admin Dashboard
        </Text>
        <Text className="text-[var(--muted-foreground)] mt-1">
          PostgreSQL Database Administration
        </Text>
      </View>

      <View className="p-6">
        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-[var(--foreground)] mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-4">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 flex-1 min-w-[150px] shadow-sm"
                style={{ minWidth: 150 }}
              >
                <Text className="text-2xl mb-2">{action.icon}</Text>
                <Text className="font-semibold text-[var(--foreground)] mb-1">
                  {action.title}
                </Text>
                <Text className="text-sm text-[var(--muted-foreground)]">
                  {action.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Connections */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-[var(--foreground)] mb-4">
            Recent Connections
          </Text>
          <View className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
            {recentConnections.map((connection, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 flex-row justify-between items-center ${
                  index !== recentConnections.length - 1 ? 'border-b border-[var(--border)]' : ''
                }`}
              >
                <View className="flex-1">
                  <Text className="font-semibold text-[var(--foreground)]">
                    {connection.name}
                  </Text>
                  <Text className="text-sm text-[var(--muted-foreground)]">
                    {connection.host}
                  </Text>
                </View>
                <View
                  className={`px-3 py-1 rounded-full ${
                    connection.status === 'Connected'
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-red-100 dark:bg-red-900'
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      connection.status === 'Connected'
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}
                  >
                    {connection.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* System Status */}
        <View>
          <Text className="text-xl font-semibold text-[var(--foreground)] mb-4">
            System Status
          </Text>
          <View className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-[var(--foreground)]">Server Status</Text>
              <View className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                <Text className="text-green-800 dark:text-green-200 text-xs font-medium">
                  Online
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-[var(--foreground)]">Active Connections</Text>
              <Text className="text-[var(--primary)] font-semibold">24</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-[var(--foreground)]">Database Size</Text>
              <Text className="text-[var(--muted-foreground)]">2.4 GB</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
