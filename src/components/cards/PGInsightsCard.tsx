import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function SparkleIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"
        fill="#7C3AED"
        stroke="#7C3AED"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function PGInsightsCard() {
  return (
    <View className="px-4 mb-6">
      <View className="bg-purple-100 rounded-2xl p-4 border border-purple-200">
        <View className="flex-row items-center mb-3">
          <SparkleIcon />
          <Text className="text-sm font-semibold text-purple-900 ml-2">PG Insights</Text>
        </View>
        
        <Text className="text-sm text-purple-900 mb-4 leading-5">
          Room A-102 has been vacant for 15 days. Consider reducing rent by ₹500 or offering amenities to attract tenants quickly.
        </Text>

        <View className="flex-row gap-3">
          <TouchableOpacity className="bg-purple-700 px-4 py-2.5 rounded-lg flex-1">
            <Text className="text-white text-sm font-medium text-center">Adjust Pricing</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-purple-200 px-4 py-2.5 rounded-lg flex-1">
            <Text className="text-purple-900 text-sm font-medium text-center">Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
