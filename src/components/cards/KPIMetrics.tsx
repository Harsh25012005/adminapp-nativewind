import { View } from 'react-native';
import KPIMetricCard from './KPIMetricCard';

export default function KPIMetrics() {
  return (
    <View className="px-4 mb-6">
      <View className="flex-row gap-3">
        <KPIMetricCard icon="dollar" label="Profit Margin" value="23.5%" />
        <KPIMetricCard icon="gauge" label="Utilization Ra..." value="78%" />
        <KPIMetricCard icon="truck" label="Avg. Days on..." value="5.2 days" />
      </View>
    </View>
  );
}