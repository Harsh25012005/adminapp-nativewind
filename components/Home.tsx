import { View, ScrollView } from 'react-native';
import Header from './Header';
import RevenueChart from './RevenueChart';
import KPICards from './KPICards';
import PGInsightsCard from './PGInsightsCard';
import RentDuesCard from './RentDuesCard';
import ComplaintsCard from './ComplaintsCard';
import MealUpdatesCard from './MealUpdatesCard';
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