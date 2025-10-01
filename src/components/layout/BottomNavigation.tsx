import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#1F2937' : 'none'}>
      <Path
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        stroke={active ? '#1F2937' : '#9CA3AF'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 22V12h6v10"
        stroke={active ? '#1F2937' : '#9CA3AF'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function RoomsIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="18" height="18" rx="2" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
      <Path d="M9 3v18" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
      <Path d="M3 9h18" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
      <Path d="M3 15h18" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
    </Svg>
  );
}

function TenantsIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke={active ? '#1F2937' : '#9CA3AF'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="7" r="4" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
    </Svg>
  );
}

function ComplaintsIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        stroke={active ? '#1F2937' : '#9CA3AF'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8v4M12 16h.01"
        stroke={active ? '#1F2937' : '#9CA3AF'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MoreIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="1" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
      <Rect x="14" y="3" width="7" height="7" rx="1" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
      <Rect x="3" y="14" width="7" height="7" rx="1" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
      <Rect x="14" y="14" width="7" height="7" rx="1" stroke={active ? '#1F2937' : '#9CA3AF'} strokeWidth="2" />
    </Svg>
  );
}

export default function BottomNavigation({ activeTab = 'home', onTabChange }: BottomNavigationProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: HomeIcon },
    { id: 'room', label: 'Rooms', icon: RoomsIcon },
    { id: 'tenant', label: 'Tenants', icon: TenantsIcon },
    { id: 'complaints', label: 'Support', icon: ComplaintsIcon },
    { id: 'more', label: 'More', icon: MoreIcon }
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-[var(--card)] border-t border-[var(--border)] px-2 py-2 pb-6">
      <View className="flex-row justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setCurrentTab(item.id);
                onTabChange?.(item.id);
              }}
              className="items-center py-2 px-3"
            >
              <Icon active={isActive} />
              <Text className={`text-xs mt-1 ${
                isActive 
                  ? 'text-[var(--foreground)] font-medium' 
                  : 'text-[var(--muted-foreground)]'
              }`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}