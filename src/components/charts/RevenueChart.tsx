import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import Svg, { Path, Circle, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

interface DataPoint {
  month: string;
  value: number;
}

const revenueData = {
  '1year': [
    { month: 'Jan', value: 180000 },
    { month: 'Feb', value: 195000 },
    { month: 'Mar', value: 210000 },
    { month: 'Apr', value: 205000 },
    { month: 'May', value: 220000 },
    { month: 'Jun', value: 245000 },
    { month: 'Jul', value: 260000 },
    { month: 'Aug', value: 255000 },
    { month: 'Sep', value: 275000 },
    { month: 'Oct', value: 290000 },
    { month: 'Nov', value: 285000 },
    { month: 'Dec', value: 300000 },
  ],
  '6months': [
    { month: 'May', value: 220000 },
    { month: 'Jun', value: 245000 },
    { month: 'Jul', value: 260000 },
    { month: 'Aug', value: 255000 },
    { month: 'Sep', value: 275000 },
    { month: 'Oct', value: 290000 },
  ],
  '3months': [
    { month: 'Aug', value: 255000 },
    { month: 'Sep', value: 275000 },
    { month: 'Oct', value: 290000 },
  ],
  '1month': [
    { month: 'W1', value: 65000 },
    { month: 'W2', value: 72000 },
    { month: 'W3', value: 78000 },
    { month: 'W4', value: 75000 },
  ],
  '1week': [
    { month: 'Mon', value: 12000 },
    { month: 'Tue', value: 15000 },
    { month: 'Wed', value: 18000 },
    { month: 'Thu', value: 16000 },
    { month: 'Fri', value: 14000 },
    { month: 'Sat', value: 10000 },
    { month: 'Sun', value: 8000 },
  ]
};

const tenantData = {
  '1year': [
    { month: 'Jan', value: 38 },
    { month: 'Feb', value: 40 },
    { month: 'Mar', value: 41 },
    { month: 'Apr', value: 40 },
    { month: 'May', value: 42 },
    { month: 'Jun', value: 45 },
    { month: 'Jul', value: 46 },
    { month: 'Aug', value: 44 },
    { month: 'Sep', value: 47 },
    { month: 'Oct', value: 48 },
    { month: 'Nov', value: 48 },
    { month: 'Dec', value: 50 },
  ],
  '6months': [
    { month: 'May', value: 42 },
    { month: 'Jun', value: 45 },
    { month: 'Jul', value: 46 },
    { month: 'Aug', value: 44 },
    { month: 'Sep', value: 47 },
    { month: 'Oct', value: 48 },
  ],
  '3months': [
    { month: 'Aug', value: 44 },
    { month: 'Sep', value: 47 },
    { month: 'Oct', value: 48 },
  ],
  '1month': [
    { month: 'W1', value: 46 },
    { month: 'W2', value: 47 },
    { month: 'W3', value: 48 },
    { month: 'W4', value: 48 },
  ],
  '1week': [
    { month: 'Mon', value: 48 },
    { month: 'Tue', value: 48 },
    { month: 'Wed', value: 47 },
    { month: 'Thu', value: 48 },
    { month: 'Fri', value: 48 },
    { month: 'Sat', value: 48 },
    { month: 'Sun', value: 48 },
  ]
};

export default function RevenueChart() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'tenants'>('revenue');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [timeFilter, setTimeFilter] = useState<'1year' | '6months' | '3months' | '1month' | '1week'>('6months');
  const [showDropdown, setShowDropdown] = useState(false);

  const chartWidth = screenWidth - 64;
  const chartHeight = 180;
  const padding = { top: 20, right: 5, bottom: 30, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Select data based on active tab and time filter
  const data = activeTab === 'revenue' ? revenueData[timeFilter] : tenantData[timeFilter];
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = 0;

  // Get filter label
  const getFilterLabel = () => {
    switch(timeFilter) {
      case '1year': return '1 Year';
      case '6months': return '6 Months';
      case '3months': return '3 Months';
      case '1month': return '1 Month';
      case '1week': return '1 Week';
    }
  };

  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth;
  const yScale = (value: number) => padding.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;

  const pathData = data.map((d, i) => {
    const x = xScale(i);
    const y = yScale(d.value);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  const areaPath = `${pathData} L ${xScale(data.length - 1)} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`;

  // Y-axis labels based on active tab
  const yAxisLabels = activeTab === 'revenue' 
    ? ['₹0', '₹1L', '₹2L', '₹3L', '₹4L']
    : ['0', '12', '24', '36', '48'];

  return (
    <View className="px-4 mb-6">
      <View className="flex-row mb-4 bg-[var(--card)] rounded-lg p-1 border border-[var(--border)]">
        <TouchableOpacity
          onPress={() => setActiveTab('revenue')}
          className={`flex-1 py-3 rounded-md ${activeTab === 'revenue' ? 'bg-blue-500' : ''}`}
        >
          <Text className={`text-center text-sm font-semibold ${activeTab === 'revenue' ? 'text-white' : 'text-[var(--muted-foreground)]'}`}>
            Revenue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('tenants')}
          className={`flex-1 py-3 rounded-md ${activeTab === 'tenants' ? 'bg-blue-500' : ''}`}
        >
          <Text className={`text-center text-sm font-semibold ${activeTab === 'tenants' ? 'text-white' : 'text-[var(--muted-foreground)]'}`}>
            Tenants
          </Text>
        </TouchableOpacity>
      </View>

      {/* Header Info */}
      <View className="mb-4 flex-row items-center justify-between">
        {/* Left Side - Heading and Number */}
        <View className="flex-1">
          <Text className="text-m text-[var(--muted-foreground)] mb-2">
            {activeTab === 'revenue' ? 'Total PG Revenue' : 'Tenant Occupancy'}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-3xl font-bold text-[var(--foreground)]">
              {activeTab === 'revenue' ? '₹15.45L' : '48'}
            </Text>
            <View className={`ml-2 px-2 py-1 rounded ${activeTab === 'revenue' ? 'bg-green-100' : 'bg-blue-100'}`}>
              <Text className={`text-xs font-medium ${activeTab === 'revenue' ? 'text-green-700' : 'text-blue-700'}`}>
                {activeTab === 'revenue' ? '↑ +8.5%' : '↑ +6.25%'}
              </Text>
            </View>
          </View>
        </View>

        {/* Right Side - Time Filter Dropdown */}
        <View className="relative ml-2">
          <TouchableOpacity 
            onPress={() => setShowDropdown(!showDropdown)}
            className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2.5 flex-row items-center justify-center"
          >
            <Text className="text-sm font-medium text-[var(--foreground)] mr-1">
              {getFilterLabel()}
            </Text>
            <Text className="text-xs text-[var(--muted-foreground)]">▼</Text>
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {showDropdown && (
            <View className="absolute top-12 right-0 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-50 min-w-[120px]">
              <TouchableOpacity 
                onPress={() => {
                  setTimeFilter('1week');
                  setShowDropdown(false);
                }}
                className="px-4 py-3 border-b border-[var(--border)]"
              >
                <Text className={`text-sm ${timeFilter === '1week' ? 'font-bold text-blue-600' : 'text-[var(--foreground)]'}`}>
                  1 Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setTimeFilter('1month');
                  setShowDropdown(false);
                }}
                className="px-4 py-3 border-b border-[var(--border)]"
              >
                <Text className={`text-sm ${timeFilter === '1month' ? 'font-bold text-blue-600' : 'text-[var(--foreground)]'}`}>
                  1 Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setTimeFilter('3months');
                  setShowDropdown(false);
                }}
                className="px-4 py-3 border-b border-[var(--border)]"
              >
                <Text className={`text-sm ${timeFilter === '3months' ? 'font-bold text-blue-600' : 'text-[var(--foreground)]'}`}>
                  3 Months
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setTimeFilter('6months');
                  setShowDropdown(false);
                }}
                className="px-4 py-3 border-b border-[var(--border)]"
              >
                <Text className={`text-sm ${timeFilter === '6months' ? 'font-bold text-blue-600' : 'text-[var(--foreground)]'}`}>
                  6 Months
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setTimeFilter('1year');
                  setShowDropdown(false);
                }}
                className="px-4 py-3"
              >
                <Text className={`text-sm ${timeFilter === '1year' ? 'font-bold text-blue-600' : 'text-[var(--foreground)]'}`}>
                  1 Year
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
                x={10}
                y={y + 4}
                fontSize="11"
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
            <Text className="text-white text-xs font-medium">
              {activeTab === 'revenue' 
                ? `₹${(data[hoveredPoint].value / 100000).toFixed(1)}L`
                : `${data[hoveredPoint].value} Tenants`
              }
            </Text>
            <Text className="text-white text-xs">{data[hoveredPoint].month}</Text>
          </View>
        )}
      </View>
    </View>
  );
}