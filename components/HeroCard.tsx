import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HeroCard() {
  return (
    <View className="px-4 mb-6">
      <View className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <View className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full" />
        <View className="absolute -top-2 -right-2 w-12 h-12 bg-white/5 rounded-full" />
        
        {/* Content */}
        <View className="flex-row items-center mb-4">
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
            <Text className="text-white text-lg">🏠</Text>
          </View>
          <View>
            <Text className="text-white font-semibold">PG Management</Text>
            <View className="flex-row items-center">
              <Text className="text-white/80 text-sm">₹85,000</Text>
              <Text className="text-green-300 text-sm ml-2">+12.5% (+3K)</Text>
            </View>
          </View>
        </View>

        {/* Mini Chart */}
        <View className="flex-row items-end mb-4" style={{ height: 40 }}>
          {[20, 35, 25, 45, 30, 50, 40, 55, 45, 60].map((height, index) => (
            <View
              key={index}
              className="bg-white/30 rounded-sm flex-1 mx-0.5"
              style={{ height: height / 2 }}
            />
          ))}
        </View>

        <Text className="text-white/90 text-sm mb-3">
          Now your PG isn't just for accommodation
        </Text>
        
        <Text className="text-white/70 text-xs mb-4">
          Start growing your revenue by optimizing occupancy and rent collection
        </Text>

        <TouchableOpacity className="bg-white/20 rounded-lg py-2 px-4 self-start">
          <Text className="text-white font-medium text-sm">View Analytics →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
