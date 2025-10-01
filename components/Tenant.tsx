import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface Tenant {
  id: string;
  name: string;
  room: string;
  bedNumber: string;
  phone: string;
  email: string;
  rentAmount: number;
  securityDeposit: number;
  status: 'active' | 'inactive' | 'notice-period';
  joinDate: string;
  emergencyContact: string;
  occupation: string;
  hometown: string;
  lastRentPaid: string;
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
      name: 'Rahul Sharma',
      room: 'A-101',
      bedNumber: 'Bed-1',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@gmail.com',
      rentAmount: 8500,
      securityDeposit: 17000,
      status: 'active',
      joinDate: '2024-01-15',
      emergencyContact: '+91 98765 43211',
      occupation: 'Software Engineer',
      hometown: 'Delhi',
      lastRentPaid: '2024-09-01'
    },
    {
      id: '2',
      name: 'Priya Patel',
      room: 'A-101',
      bedNumber: 'Bed-2',
      phone: '+91 87654 32109',
      email: 'priya.patel@gmail.com',
      rentAmount: 8500,
      securityDeposit: 17000,
      status: 'active',
      joinDate: '2024-02-01',
      emergencyContact: '+91 87654 32108',
      occupation: 'Marketing Executive',
      hometown: 'Mumbai',
      lastRentPaid: '2024-09-01'
    },
    {
      id: '3',
      name: 'Amit Kumar',
      room: 'B-205',
      bedNumber: 'Bed-1',
      phone: '+91 76543 21098',
      email: 'amit.kumar@gmail.com',
      rentAmount: 9500,
      securityDeposit: 19000,
      status: 'active',
      joinDate: '2023-12-10',
      emergencyContact: '+91 76543 21097',
      occupation: 'Data Analyst',
      hometown: 'Bangalore',
      lastRentPaid: '2024-08-01'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      room: 'B-205',
      bedNumber: 'Bed-2',
      phone: '+91 65432 10987',
      email: 'sneha.reddy@gmail.com',
      rentAmount: 9500,
      securityDeposit: 19000,
      status: 'notice-period',
      joinDate: '2024-03-15',
      emergencyContact: '+91 65432 10986',
      occupation: 'Graphic Designer',
      hometown: 'Hyderabad',
      lastRentPaid: '2024-09-01'
    },
    {
      id: '5',
      name: 'Vikash Singh',
      room: 'C-301',
      bedNumber: 'Bed-3',
      phone: '+91 54321 09876',
      email: 'vikash.singh@gmail.com',
      rentAmount: 7500,
      securityDeposit: 15000,
      status: 'inactive',
      joinDate: '2024-01-20',
      emergencyContact: '+91 54321 09875',
      occupation: 'Sales Executive',
      hometown: 'Pune',
      lastRentPaid: '2024-07-01'
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
    { id: 'notice-period', label: 'Notice Period' },
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
                  {tenant.room} • {tenant.bedNumber}
                </Text>
                <Text className="text-[var(--muted-foreground)] mb-1">
                  {tenant.phone}
                </Text>
                <Text className="text-[var(--muted-foreground)] mb-1">
                  {tenant.occupation} • {tenant.hometown}
                </Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${
                tenant.status === 'active' 
                  ? 'bg-green-100 border border-green-300' 
                  : tenant.status === 'notice-period'
                  ? 'bg-orange-100 border border-orange-300'
                  : 'bg-red-100 border border-red-300'
              }`}>
                <Text className={`text-xs font-medium ${
                  tenant.status === 'active' 
                    ? 'text-green-800' 
                    : tenant.status === 'notice-period'
                    ? 'text-orange-800'
                    : 'text-red-800'
                }`}>
                  {tenant.status.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View className="grid grid-cols-2 gap-4 pt-3 border-t border-[var(--border)]">
              <View>
                <Text className="text-[var(--muted-foreground)] text-sm">Monthly Rent</Text>
                <Text className="text-lg font-semibold text-[var(--foreground)]">
                  ₹{tenant.rentAmount.toLocaleString()}
                </Text>
              </View>
              <View>
                <Text className="text-[var(--muted-foreground)] text-sm">Security Deposit</Text>
                <Text className="text-sm text-[var(--foreground)]">
                  ₹{tenant.securityDeposit.toLocaleString()}
                </Text>
              </View>
              <View>
                <Text className="text-[var(--muted-foreground)] text-sm">Join Date</Text>
                <Text className="text-sm text-[var(--foreground)]">
                  {new Date(tenant.joinDate).toLocaleDateString()}
                </Text>
              </View>
              <View>
                <Text className="text-[var(--muted-foreground)] text-sm">Last Rent Paid</Text>
                <Text className="text-sm text-[var(--foreground)]">
                  {new Date(tenant.lastRentPaid).toLocaleDateString()}
                </Text>
              </View>
            </View>
            
            <View className="mt-3 pt-3 border-t border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Emergency Contact</Text>
              <Text className="text-sm text-[var(--foreground)]">
                {tenant.emergencyContact}
              </Text>
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
