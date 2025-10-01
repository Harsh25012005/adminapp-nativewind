import { View, ScrollView } from 'react-native';
import Header from '~/components/layout/Header';
import RevenueChart from '~/components/charts/RevenueChart';
import KPICards from '~/components/cards/KPICards';
import PGInsightsCard from '~/components/cards/PGInsightsCard';
import ComplaintsCard from '~/components/cards/ComplaintsCard';
import BottomNavigation from '~/components/layout/BottomNavigation';
import type { ScreenProps } from '~/types';

export default function Home({ onTabChange }: ScreenProps) {
  return (
    <View className="flex-1 bg-[var(--background)]">
      {/* Header */}
      <Header />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Revenue Chart */}
        <RevenueChart />

        {/* KPI Cards */}
        <KPICards onTabChange={onTabChange} />

        {/* PG Insights */}
        <PGInsightsCard />

        {/* Rent Dues */}

        {/* Complaints */}
        <ComplaintsCard />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" onTabChange={onTabChange} />
    </View>
  );
}