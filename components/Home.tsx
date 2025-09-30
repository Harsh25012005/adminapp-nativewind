import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from './Header';
import SimpleStats from './SimpleStats';
import SimpleChart from './SimpleChart';
import SimpleTransactions from './SimpleTransactions';
import BottomNavigation from './BottomNavigation';

interface HomeProps {
  onTabChange?: (tab: string) => void;
}

export default function Home({ onTabChange }: HomeProps) {
  return (
    <View className="flex-1 bg-[var(--background)]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Simple Stats Cards */}
        <SimpleStats />

        {/* Simple Chart */}
        <SimpleChart />

        {/* Simple Transactions */}
        <SimpleTransactions />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" onTabChange={onTabChange} />
    </View>
  );
}
