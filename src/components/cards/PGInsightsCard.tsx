import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

function CalendarIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function WrenchIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function UserPlusIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function FileTextIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function PGInsightsCard() {
  const notifications = [
    {
      icon: <CalendarIcon />,
      title: 'Rent Due Dates',
      count: '8',
      description: 'Tenants with rent due in 3 days',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      textColor: 'text-orange-700',
      countBg: 'bg-orange-500'
    },
    {
      icon: <WrenchIcon />,
      title: 'Maintenance Requests',
      count: '5',
      description: 'Pending maintenance tasks',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-700',
      countBg: 'bg-blue-500'
    },
    {
      icon: <UserPlusIcon />,
      title: 'New Applications',
      count: '3',
      description: 'Tenant applications to review',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      textColor: 'text-green-700',
      countBg: 'bg-green-500'
    },
    {
      icon: <FileTextIcon />,
      title: 'Expiring Agreements',
      count: '2',
      description: 'Agreements expiring this month',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-100',
      textColor: 'text-red-700',
      countBg: 'bg-red-500'
    }
  ];

  return (
    <View className="mb-6 px-4">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-xl font-bold text-[var(--foreground)]">Important Alerts</Text>
          <Text className="text-xs text-[var(--muted-foreground)] mt-0.5">18 notifications require attention</Text>
        </View>
        <View className="bg-red-500 w-2 h-2 rounded-full" />
      </View>

      {/* Notifications Grid */}
      <View className="flex-row flex-wrap gap-3">
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            className={`${notification.bgColor} rounded-xl p-4 flex-1 min-w-[45%] border border-[var(--border)]`}
          >
            {/* Icon and Count Badge */}
            <View className="flex-row items-center justify-between mb-3">
              <View className={`${notification.iconBg} rounded-full p-2`}>
                {notification.icon}
              </View>
              <View className={`${notification.countBg} w-8 h-8 rounded-full items-center justify-center`}>
                <Text className="text-white text-sm font-bold">{notification.count}</Text>
              </View>
            </View>

            {/* Title */}
            <Text className={`text-sm font-bold ${notification.textColor} mb-1`}>
              {notification.title}
            </Text>

            {/* Description */}
            <Text className="text-xs text-gray-600 leading-4">
              {notification.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* View All Button */}
      <TouchableOpacity className="bg-[var(--card)] border border-[var(--border)] rounded-xl py-3 mt-4">
        <Text className="text-center text-sm font-semibold text-[var(--foreground)]">
          View All Notifications →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
