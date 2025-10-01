import { View, Text } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface KPIMetricCardProps {
  icon: 'dollar' | 'gauge' | 'truck';
  label: string;
  value: string;
}

function DollarIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="2" />
      <Path
        d="M12 6v12M9 9h4.5a1.5 1.5 0 010 3H9m4.5 0H9m4.5 0a1.5 1.5 0 010 3H9"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function GaugeIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 17a5 5 0 100-10 5 5 0 000 10z"
        stroke="#6366F1"
        strokeWidth="2"
      />
      <Path
        d="M12 12l3-3"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M3 12h2m14 0h2M12 3v2m0 14v2"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function TruckIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 3h15v13H1V3z"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M16 8h3l3 3v5h-6V8z"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Circle cx="5.5" cy="18.5" r="2.5" stroke="#6366F1" strokeWidth="2" />
      <Circle cx="18.5" cy="18.5" r="2.5" stroke="#6366F1" strokeWidth="2" />
    </Svg>
  );
}

export default function KPIMetricCard({ icon, label, value }: KPIMetricCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'dollar':
        return <DollarIcon />;
      case 'gauge':
        return <GaugeIcon />;
      case 'truck':
        return <TruckIcon />;
      default:
        return null;
    }
  };

  return (
    <View className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)] flex-1 min-w-[30%]">
      <View className="bg-indigo-50 w-12 h-12 rounded-full items-center justify-center mb-3">
        {renderIcon()}
      </View>
      <Text className="text-xs text-[var(--muted-foreground)] mb-1">{label}</Text>
      <Text className="text-xl font-bold text-[var(--foreground)]">{value}</Text>
    </View>
  );
}