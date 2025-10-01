import { View, ScrollView } from 'react-native';
import Header from '~/components/layout/Header';
import RevenueChart from '~/components/charts/RevenueChart';
import KPICards from '~/components/cards/KPICards';
import PGInsightsCard from '~/components/cards/PGInsightsCard';
import RentDuesCard from '~/components/cards/RentDuesCard';
import ComplaintsCard from '~/components/cards/ComplaintsCard';
import MealUpdatesCard from '~/components/cards/MealUpdatesCard';
import BottomNavigation from '~/components/layout/BottomNavigation';
import type { ScreenProps } from '~/types';

export default function Home({ onTabChange }: ScreenProps) {
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
        {/* Revenue Chart */}
        <RevenueChart />

        {/* KPI Cards */}
        <KPICards />

        {/* PG Insights */}
        <PGInsightsCard />

        {/* Rent Dues */}
        <RentDuesCard />

        {/* Complaints */}
        <ComplaintsCard />

        {/* Meal Updates */}
        <MealUpdatesCard />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" onTabChange={onTabChange} />
    </View>
  );
}