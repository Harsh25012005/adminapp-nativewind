import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function BottomNavigation({ activeTab = 'home', onTabChange }: BottomNavigationProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tenant', label: 'Tenants' },
    { id: 'payment', label: 'Payments' },
    { id: 'room', label: 'Rooms' },
    { id: 'more', label: 'More' }
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-[var(--card)] border-t border-[var(--border)] px-4 py-3 pb-6">
      <View className="flex-row justify-around items-center">
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setCurrentTab(item.id);
              onTabChange?.(item.id);
            }}
            className="py-2"
          >
            <Text className={`text-sm font-medium ${
              currentTab === item.id 
                ? 'text-[var(--foreground)]' 
                : 'text-[var(--muted-foreground)]'
            }`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
