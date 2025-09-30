import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface Room {
  id: string;
  number: string;
  floor: string;
  type: string;
  size: number; // in sq ft
  rent: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  tenant?: string;
  amenities: string[];
  lastUpdated: string;
}

interface RoomProps {
  onTabChange?: (tab: string) => void;
}

export default function Room({ onTabChange }: RoomProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const rooms: Room[] = [
    {
      id: '1',
      number: 'A-101',
      floor: '1st Floor',
      type: '1BHK',
      size: 650,
      rent: 1200,
      status: 'occupied',
      tenant: 'John Smith',
      amenities: ['AC', 'Furnished', 'Balcony', 'Parking'],
      lastUpdated: '2024-09-15'
    },
    {
      id: '2',
      number: 'A-102',
      floor: '1st Floor',
      type: '1BHK',
      size: 650,
      rent: 1200,
      status: 'vacant',
      amenities: ['AC', 'Furnished', 'Balcony'],
      lastUpdated: '2024-09-20'
    },
    {
      id: '3',
      number: 'B-205',
      floor: '2nd Floor',
      type: '2BHK',
      size: 900,
      rent: 1500,
      status: 'occupied',
      tenant: 'Sarah Johnson',
      amenities: ['AC', 'Semi-Furnished', 'Balcony', 'Parking', 'Garden View'],
      lastUpdated: '2024-09-10'
    },
    {
      id: '4',
      number: 'C-301',
      floor: '3rd Floor',
      type: '3BHK',
      size: 1200,
      rent: 1800,
      status: 'maintenance',
      amenities: ['AC', 'Unfurnished', 'Balcony', 'Parking', 'City View'],
      lastUpdated: '2024-09-25'
    },
    {
      id: '5',
      number: 'B-203',
      floor: '2nd Floor',
      type: '2BHK',
      size: 850,
      rent: 1400,
      status: 'vacant',
      amenities: ['AC', 'Furnished', 'Parking'],
      lastUpdated: '2024-09-18'
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (room.tenant && room.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || room.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'occupied', label: 'Occupied' },
    { id: 'vacant', label: 'Vacant' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'vacant':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'maintenance':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const vacantRooms = rooms.filter(r => r.status === 'vacant').length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

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
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Occupied</Text>
              <Text className="text-lg font-bold text-green-600">
                {occupiedRooms}
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
                {room.tenant && (
                  <Text className="text-[var(--foreground)] font-medium">
                    Tenant: {room.tenant}
                  </Text>
                )}
              </View>
              <View className={`px-3 py-1 rounded-full border ${getStatusColor(room.status)}`}>
                <Text className="text-xs font-medium">
                  {room.status.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View className="mb-3">
              <Text className="text-xl font-bold text-[var(--foreground)]">
                ${room.rent.toLocaleString()}/month
              </Text>
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
