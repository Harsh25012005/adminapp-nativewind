import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from '~/components/layout/Header';
import BottomNavigation from '~/components/layout/BottomNavigation';
import type { Room, Bed, ScreenProps } from '~/types';

export default function Room({ onTabChange }: ScreenProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const rooms: Room[] = [
    {
      id: '1',
      number: 'A-101',
      floor: '1st Floor',
      type: 'Shared Room',
      size: 400,
      totalBeds: 2,
      beds: [
        { bedNumber: 'Bed-1', tenant: 'Rahul Sharma', status: 'occupied', rentAmount: 8500 },
        { bedNumber: 'Bed-2', tenant: 'Priya Patel', status: 'occupied', rentAmount: 8500 }
      ],
      status: 'fully-occupied',
      amenities: ['AC', 'Attached Bathroom', 'WiFi', 'Study Table', 'Wardrobe'],
      lastUpdated: '2024-09-15'
    },
    {
      id: '2',
      number: 'A-102',
      floor: '1st Floor',
      type: 'Shared Room',
      size: 400,
      totalBeds: 3,
      beds: [
        { bedNumber: 'Bed-1', status: 'vacant', rentAmount: 7500 },
        { bedNumber: 'Bed-2', status: 'vacant', rentAmount: 7500 },
        { bedNumber: 'Bed-3', status: 'vacant', rentAmount: 7500 }
      ],
      status: 'vacant',
      amenities: ['AC', 'Attached Bathroom', 'WiFi', 'Study Table'],
      lastUpdated: '2024-09-20'
    },
    {
      id: '3',
      number: 'B-205',
      floor: '2nd Floor',
      type: 'Shared Room',
      size: 450,
      totalBeds: 2,
      beds: [
        { bedNumber: 'Bed-1', tenant: 'Amit Kumar', status: 'occupied', rentAmount: 9500 },
        { bedNumber: 'Bed-2', tenant: 'Sneha Reddy', status: 'occupied', rentAmount: 9500 }
      ],
      status: 'fully-occupied',
      amenities: ['AC', 'Attached Bathroom', 'WiFi', 'Study Table', 'Wardrobe', 'Balcony'],
      lastUpdated: '2024-09-10'
    },
    {
      id: '4',
      number: 'C-301',
      floor: '3rd Floor',
      type: 'Shared Room',
      size: 500,
      totalBeds: 4,
      beds: [
        { bedNumber: 'Bed-1', status: 'vacant', rentAmount: 7000 },
        { bedNumber: 'Bed-2', status: 'vacant', rentAmount: 7000 },
        { bedNumber: 'Bed-3', tenant: 'Vikash Singh', status: 'occupied', rentAmount: 7000 },
        { bedNumber: 'Bed-4', status: 'vacant', rentAmount: 7000 }
      ],
      status: 'partially-occupied',
      amenities: ['AC', 'Common Bathroom', 'WiFi', 'Study Table'],
      lastUpdated: '2024-09-25'
    },
    {
      id: '5',
      number: 'B-203',
      floor: '2nd Floor',
      type: 'Single Room',
      size: 250,
      totalBeds: 1,
      beds: [
        { bedNumber: 'Single', status: 'vacant', rentAmount: 12000 }
      ],
      status: 'vacant',
      amenities: ['AC', 'Attached Bathroom', 'WiFi', 'Study Table', 'Wardrobe', 'Mini Fridge'],
      lastUpdated: '2024-09-18'
    },
    {
      id: '6',
      number: 'D-401',
      floor: '4th Floor',
      type: 'Maintenance',
      size: 400,
      totalBeds: 3,
      beds: [
        { bedNumber: 'Bed-1', status: 'vacant', rentAmount: 8000 },
        { bedNumber: 'Bed-2', status: 'vacant', rentAmount: 8000 },
        { bedNumber: 'Bed-3', status: 'vacant', rentAmount: 8000 }
      ],
      status: 'maintenance',
      amenities: ['AC', 'Attached Bathroom', 'WiFi'],
      lastUpdated: '2024-09-28'
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const tenantNames = room.beds.filter(bed => bed.tenant).map(bed => bed.tenant!.toLowerCase());
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenantNames.some(name => name.includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || room.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'fully-occupied', label: 'Fully Occupied' },
    { id: 'partially-occupied', label: 'Partially Occupied' },
    { id: 'vacant', label: 'Vacant' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fully-occupied':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'partially-occupied':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'vacant':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'maintenance':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const totalRooms = rooms.length;
  const totalBeds = rooms.reduce((sum, room) => sum + room.totalBeds, 0);
  const occupiedBeds = rooms.reduce((sum, room) => 
    sum + room.beds.filter(bed => bed.status === 'occupied').length, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <View className="flex-1 bg-[var(--background)]">
      <Header />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Cards */}
        <View className="px-4 mb-6">
          <View className="flex-row">
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 mr-2 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Total Rooms</Text>
              <Text className="text-lg font-bold text-[var(--foreground)]">
                {totalRooms}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 mx-1 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Occupied Beds</Text>
              <Text className="text-lg font-bold text-green-600">
                {occupiedBeds}/{totalBeds}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 ml-2 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Occupancy</Text>
              <Text className="text-lg font-bold text-[var(--foreground)]">
                {occupancyRate}%
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-6">
          <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <TextInput
              className="text-[var(--foreground)] text-base"
              placeholder="Search rooms by number, type, or tenant..."
              placeholderTextColor="var(--muted-foreground)"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Filter Buttons */}
          <View className="flex-row mb-2">
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedFilter(option.id)}
                className={`px-4 py-2 rounded-lg mr-3 ${
                  selectedFilter === option.id
                    ? 'bg-[var(--primary)] border border-[var(--primary)]'
                    : 'bg-[var(--card)] border border-[var(--border)]'
                }`}
              >
                <Text className={`font-medium ${
                  selectedFilter === option.id
                    ? 'text-[var(--primary-foreground)]'
                    : 'text-[var(--foreground)]'
                }`}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Room Cards */}
        <View className="px-4 mb-6">
        {filteredRooms.map((room) => (
          <View key={room.id} className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-[var(--foreground)] mb-1">
                  Room {room.number}
                </Text>
                <Text className="text-[var(--muted-foreground)] mb-1">
                  {room.floor} • {room.type} • {room.size} sq ft
                </Text>
                <Text className="text-[var(--muted-foreground)] mb-1">
                  {room.totalBeds} beds • {room.beds.filter(bed => bed.status === 'occupied').length} occupied
                </Text>
              </View>
              <View className={`px-3 py-1 rounded-full border ${getStatusColor(room.status)}`}>
                <Text className="text-xs font-medium">
                  {room.status.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
            </View>
            
            {/* Bed Details */}
            <View className="mb-3">
              <Text className="text-[var(--muted-foreground)] text-sm mb-2">Bed Details:</Text>
              {room.beds.map((bed, bedIndex) => (
                <View key={bedIndex} className="flex-row justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                  <View className="flex-1">
                    <Text className="text-[var(--foreground)] font-medium">{bed.bedNumber}</Text>
                    {bed.tenant && (
                      <Text className="text-[var(--muted-foreground)] text-sm">{bed.tenant}</Text>
                    )}
                  </View>
                  <View className="items-end">
                    <Text className="text-[var(--foreground)] font-semibold">₹{bed.rentAmount.toLocaleString()}</Text>
                    <View className={`px-2 py-1 rounded ${bed.status === 'occupied' ? 'bg-green-100' : 'bg-blue-100'}`}>
                      <Text className={`text-xs ${bed.status === 'occupied' ? 'text-green-800' : 'text-blue-800'}`}>
                        {bed.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Amenities */}
            <View className="mb-3">
              <Text className="text-[var(--muted-foreground)] text-sm mb-2">Amenities:</Text>
              <View className="flex-row flex-wrap">
                {room.amenities.map((amenity, index) => (
                  <View key={index} className="bg-[var(--muted)] rounded-full px-3 py-1 mr-2 mb-2">
                    <Text className="text-[var(--muted-foreground)] text-xs">
                      {amenity}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View className="pt-3 border-t border-[var(--border)]">
              <View className="flex-row justify-between items-center">
                <Text className="text-[var(--muted-foreground)] text-sm">
                  Last Updated: {new Date(room.lastUpdated).toLocaleDateString()}
                </Text>
                <TouchableOpacity className="bg-[var(--primary)] rounded-lg py-2 px-4">
                  <Text className="text-[var(--primary-foreground)] font-medium text-sm">
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {filteredRooms.length === 0 && (
          <View className="bg-[var(--card)] rounded-lg p-8 items-center border border-[var(--border)]">
            <Text className="text-[var(--muted-foreground)] text-center">
              No rooms found matching your criteria
            </Text>
          </View>
        )}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="room" onTabChange={onTabChange} />
    </View>
  );
}
