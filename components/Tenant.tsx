import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface Tenant {
  id: string;
  name: string;
  room: string;
  phone: string;
  email: string;
  rentAmount: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface TenantProps {
  onTabChange?: (tab: string) => void;
}

export default function Tenant({ onTabChange }: TenantProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tenants: Tenant[] = [
    {
      id: '1',
      name: 'John Smith',
      room: 'A-101',
      phone: '+1 234-567-8901',
      email: 'john.smith@email.com',
      rentAmount: 1200,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      room: 'B-205',
      phone: '+1 234-567-8902',
      email: 'sarah.j@email.com',
      rentAmount: 1500,
      status: 'active',
      joinDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      room: 'C-301',
      phone: '+1 234-567-8903',
      email: 'mike.wilson@email.com',
      rentAmount: 1800,
      status: 'inactive',
      joinDate: '2023-12-10'
    }
  ];

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || tenant.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' }
  ];

  return (
    <View className="flex-1 bg-[var(--background)]">
      <Header />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View className="px-4 mb-6">
          <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <TextInput
              className="text-[var(--foreground)] text-base"
              placeholder="Search tenants by name or room..."
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

        {/* Tenant Cards */}
        <View className="px-4 mb-6">
        {filteredTenants.map((tenant) => (
          <View key={tenant.id} className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-[var(--foreground)] mb-1">
                  {tenant.name}
                </Text>
                <Text className="text-[var(--muted-foreground)] mb-1">
                  Room: {tenant.room}
                </Text>
                <Text className="text-[var(--muted-foreground)] mb-1">
                  {tenant.phone}
                </Text>
                <Text className="text-[var(--muted-foreground)]">
                  {tenant.email}
                </Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${
                tenant.status === 'active' 
                  ? 'bg-green-100 border border-green-300' 
                  : 'bg-red-100 border border-red-300'
              }`}>
                <Text className={`text-xs font-medium ${
                  tenant.status === 'active' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {tenant.status.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center pt-3 border-t border-[var(--border)]">
              <View>
                <Text className="text-[var(--muted-foreground)] text-sm">Monthly Rent</Text>
                <Text className="text-lg font-semibold text-[var(--foreground)]">
                  ${tenant.rentAmount.toLocaleString()}
                </Text>
              </View>
              <View>
                <Text className="text-[var(--muted-foreground)] text-sm">Join Date</Text>
                <Text className="text-sm text-[var(--foreground)]">
                  {new Date(tenant.joinDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {filteredTenants.length === 0 && (
          <View className="bg-[var(--card)] rounded-lg p-8 items-center border border-[var(--border)]">
            <Text className="text-[var(--muted-foreground)] text-center">
              No tenants found matching your criteria
            </Text>
          </View>
        )}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="tenant" onTabChange={onTabChange} />
    </View>
  );
}
