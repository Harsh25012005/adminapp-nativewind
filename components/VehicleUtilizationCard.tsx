import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Svg, { Path, Polyline } from 'react-native-svg';

interface VehicleData {
  type: string;
  percentage: number;
  color: string;
  avgMonthlyRevenue: string;
  avgDailyRate: string;
  avgRevenuePerVehicle: string;
  trend: 'up' | 'down' | 'neutral';
}

const vehicleData: VehicleData[] = [
  {
    type: 'SUV',
    percentage: 82,
    color: '#06B6D4',
    avgMonthlyRevenue: '$17.5k',
    avgDailyRate: '$68 per day',
    avgRevenuePerVehicle: '$2.1k',
    trend: 'up',
  },
  {
    type: 'Sedan',
    percentage: 74,
    color: '#3B82F6',
    avgMonthlyRevenue: '$12.3k',
    avgDailyRate: '$52 per day',
    avgRevenuePerVehicle: '$1.8k',
    trend: 'up',
  },
];

function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}>
      <Path d="M6 9l6 6 6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MiniTrendLine({ trend }: { trend: 'up' | 'down' | 'neutral' }) {
  const points = trend === 'up' ? '0,10 5,8 10,5 15,3 20,0' : '0,0 5,3 10,5 15,8 20,10';
  const color = trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#9CA3AF';
  
  return (
    <Svg width="24" height="12" viewBox="0 0 24 12">
      <Polyline points={points} stroke={color} strokeWidth="1.5" fill="none" />
    </Svg>
  );
}

export default function VehicleUtilizationCard() {
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>('SUV');

  const toggleVehicle = (type: string) => {
    setExpandedVehicle(expandedVehicle === type ? null : type);
  };

  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold text-[var(--foreground)] mb-4">Vehicle Utilization</Text>

      <View className="bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden">
        {/* Stacked Bar */}
        <View className="p-4">
          <View className="flex-row h-3 rounded-full overflow-hidden mb-4">
            <View style={{ width: '65%', backgroundColor: '#06B6D4' }} />
            <View style={{ width: '20%', backgroundColor: '#3B82F6' }} />
            <View style={{ width: '10%', backgroundColor: '#F59E0B' }} />
            <View style={{ width: '5%', backgroundColor: '#EF4444' }} />
          </View>

          {/* Vehicle Types */}
          {vehicleData.map((vehicle, index) => (
            <View key={vehicle.type}>
              <TouchableOpacity
                onPress={() => toggleVehicle(vehicle.type)}
                className="flex-row items-center justify-between py-3"
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: vehicle.color }} />
                  <Text className="text-sm font-medium text-[var(--foreground)]">{vehicle.type}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-sm font-semibold text-[var(--foreground)] mr-2">{vehicle.percentage}%</Text>
                  <ChevronIcon isExpanded={expandedVehicle === vehicle.type} />
                </View>
              </TouchableOpacity>

              {/* Expanded Details */}
              {expandedVehicle === vehicle.type && (
                <View className="pl-6 pb-3 space-y-3">
                  <View className="flex-row justify-between items-center py-2">
                    <Text className="text-xs text-[var(--muted-foreground)]">Avg. Monthly Revenue</Text>
                    <View className="flex-row items-center">
                      <Text className="text-sm font-medium text-[var(--foreground)] mr-2">{vehicle.avgMonthlyRevenue}</Text>
                      <MiniTrendLine trend={vehicle.trend} />
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center py-2">
                    <Text className="text-xs text-[var(--muted-foreground)]">Avg. Daily Rate</Text>
                    <View className="flex-row items-center">
                      <Text className="text-sm font-medium text-[var(--foreground)] mr-2">{vehicle.avgDailyRate}</Text>
                      <MiniTrendLine trend={vehicle.trend} />
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center py-2">
                    <Text className="text-xs text-[var(--muted-foreground)]">Avg. Revenue per Vehicle</Text>
                    <View className="flex-row items-center">
                      <Text className="text-sm font-medium text-[var(--foreground)] mr-2">{vehicle.avgRevenuePerVehicle}</Text>
                      <MiniTrendLine trend="neutral" />
                    </View>
                  </View>
                </View>
              )}

              {index < vehicleData.length - 1 && (
                <View className="h-px bg-[var(--border)]" />
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}