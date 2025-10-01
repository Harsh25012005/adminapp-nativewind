import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

function BellIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0"
        stroke="#1F2937"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="18" cy="6" r="3" fill="#EF4444" />
    </Svg>
  );
}

function ChevronDownIcon() {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <Path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function Header() {
  return (
    <View className="bg-[var(--background)] px-4 py-6 pt-12">
      <View className="flex-row justify-between items-start mb-4">
        <Text className="text-2xl font-bold text-[var(--foreground)]">Overview</Text>
        <TouchableOpacity className="p-1">
          <BellIcon />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity className="flex-row items-center self-start">
        <Text className="text-sm text-[var(--muted-foreground)] mr-1">Last 6 months</Text>
        <ChevronDownIcon />
      </TouchableOpacity>
    </View>
  );
}