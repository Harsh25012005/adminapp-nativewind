import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import Svg, { Path, Circle, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

interface DataPoint {
  month: string;
  value: number;
}

const data: DataPoint[] = [
  { month: 'May', value: 220000 },
  { month: 'Jun', value: 245000 },
  { month: 'Jul', value: 260000 },
  { month: 'Aug', value: 255000 },
  { month: 'Sep', value: 275000 },
  { month: 'Oct', value: 290000 },
];

export default function RevenueChart() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'cost' | 'netProfit'>('revenue');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const chartWidth = screenWidth - 64;
  const chartHeight = 180;
  const padding = { top: 20, right: 10, bottom: 30, left: 10 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = 0;

  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth;
  const yScale = (value: number) => padding.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;

  const pathData = data.map((d, i) => {
    const x = xScale(i);
    const y = yScale(d.value);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  const areaPath = `${pathData} L ${xScale(data.length - 1)} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`;

  const yAxisLabels = ['₹0', '₹1L', '₹2L', '₹3L', '₹4L'];

  return (
    <View className="px-4 mb-6">
      {/* Tabs */}
      <View className="flex-row mb-4 bg-[var(--card)] rounded-lg p-1 border border-[var(--border)]">
        <TouchableOpacity
          onPress={() => setActiveTab('revenue')}
          className={`flex-1 py-2 rounded-md ${activeTab === 'revenue' ? 'bg-[var(--background)]' : ''}`}
        >
          <Text className={`text-center text-sm font-medium ${activeTab === 'revenue' ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
            Revenue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('cost')}
          className={`flex-1 py-2 rounded-md ${activeTab === 'cost' ? 'bg-[var(--background)]' : ''}`}
        >
          <Text className={`text-center text-sm font-medium ${activeTab === 'cost' ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
            Cost
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('netProfit')}
          className={`flex-1 py-2 rounded-md ${activeTab === 'netProfit' ? 'bg-[var(--background)]' : ''}`}
        >
          <Text className={`text-center text-sm font-medium ${activeTab === 'netProfit' ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
            Net Profit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Total Revenue */}
      <View className="mb-4">
        <Text className="text-sm text-[var(--muted-foreground)] mb-1">Total PG Revenue</Text>
        <View className="flex-row items-center">
          <Text className="text-3xl font-bold text-[var(--foreground)]">₹15.45L</Text>
          <View className="ml-2 bg-green-100 px-2 py-1 rounded">
            <Text className="text-xs font-medium text-green-700">↑ +8.5%</Text>
          </View>
        </View>
        <Text className="text-sm text-[var(--muted-foreground)] mt-1">Last 6 months collection</Text>
      </View>

      {/* Chart */}
      <View className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
            </LinearGradient>
          </Defs>

          {/* Y-axis labels */}
          {yAxisLabels.map((label, i) => {
            const y = padding.top + (innerHeight / (yAxisLabels.length - 1)) * i;
            return (
              <SvgText
                key={i}
                x={5}
                y={y}
                fontSize="10"
                fill="#9CA3AF"
                textAnchor="start"
              >
                {yAxisLabels[yAxisLabels.length - 1 - i]}
              </SvgText>
            );
          })}

          {/* Grid lines */}
          {yAxisLabels.map((_, i) => {
            const y = padding.top + (innerHeight / (yAxisLabels.length - 1)) * i;
            return (
              <Line
                key={i}
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            );
          })}

          {/* Area */}
          <Path d={areaPath} fill="url(#areaGradient)" />

          {/* Line */}
          <Path d={pathData} stroke="#6366F1" strokeWidth="2" fill="none" />

          {/* Data points */}
          {data.map((d, i) => {
            const x = xScale(i);
            const y = yScale(d.value);
            return (
              <Circle
                key={i}
                cx={x}
                cy={y}
                r={hoveredPoint === i ? 5 : 3}
                fill="#6366F1"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}

          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = xScale(i);
            return (
              <SvgText
                key={i}
                x={x}
                y={chartHeight - 10}
                fontSize="10"
                fill="#9CA3AF"
                textAnchor="middle"
              >
                {d.month}
              </SvgText>
            );
          })}

          {/* Tooltip */}
          {hoveredPoint !== null && (
            <>
              <Line
                x1={xScale(hoveredPoint)}
                y1={padding.top}
                x2={xScale(hoveredPoint)}
                y2={chartHeight - padding.bottom}
                stroke="#6366F1"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            </>
          )}
        </Svg>

        {/* Tooltip value */}
        {hoveredPoint !== null && (
          <View className="absolute bg-[#1E293B] px-3 py-2 rounded-lg" style={{ top: 40, left: xScale(hoveredPoint) - 40 }}>
            <Text className="text-white text-xs font-medium">₹{(data[hoveredPoint].value / 100000).toFixed(1)}L</Text>
            <Text className="text-white text-xs">{data[hoveredPoint].month}</Text>
          </View>
        )}
      </View>
    </View>
  );
}