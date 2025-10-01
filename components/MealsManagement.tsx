import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface MealItem {
  name: string;
  type: 'veg' | 'non-veg';
}

interface DayMeal {
  day: string;
  date: string;
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  specialNote?: string;
}

interface MealStats {
  totalServed: number;
  vegetarian: number;
  nonVegetarian: number;
  avgRating: number;
}

interface MealsManagementProps {
  onTabChange?: (tab: string) => void;
}

export default function MealsManagement({ onTabChange }: MealsManagementProps = {}) {
  const [selectedDay, setSelectedDay] = useState('today');

  const weeklyMenu: DayMeal[] = [
    {
      day: 'Monday',
      date: '2024-09-30',
      breakfast: [
        { name: 'Poha', type: 'veg' },
        { name: 'Tea/Coffee', type: 'veg' },
        { name: 'Banana', type: 'veg' }
      ],
      lunch: [
        { name: 'Dal Rice', type: 'veg' },
        { name: 'Chicken Curry', type: 'non-veg' },
        { name: 'Roti', type: 'veg' },
        { name: 'Mixed Vegetables', type: 'veg' },
        { name: 'Pickle', type: 'veg' }
      ],
      dinner: [
        { name: 'Rajma Rice', type: 'veg' },
        { name: 'Fish Fry', type: 'non-veg' },
        { name: 'Chapati', type: 'veg' },
        { name: 'Salad', type: 'veg' }
      ]
    },
    {
      day: 'Tuesday',
      date: '2024-10-01',
      breakfast: [
        { name: 'Upma', type: 'veg' },
        { name: 'Tea/Coffee', type: 'veg' },
        { name: 'Boiled Eggs', type: 'non-veg' }
      ],
      lunch: [
        { name: 'Chole Rice', type: 'veg' },
        { name: 'Mutton Curry', type: 'non-veg' },
        { name: 'Naan', type: 'veg' },
        { name: 'Aloo Gobi', type: 'veg' },
        { name: 'Raita', type: 'veg' }
      ],
      dinner: [
        { name: 'Biryani', type: 'non-veg' },
        { name: 'Paneer Butter Masala', type: 'veg' },
        { name: 'Roti', type: 'veg' },
        { name: 'Papad', type: 'veg' }
      ],
      specialNote: 'Special Biryani Day!'
    },
    {
      day: 'Wednesday',
      date: '2024-10-02',
      breakfast: [
        { name: 'Paratha', type: 'veg' },
        { name: 'Curd', type: 'veg' },
        { name: 'Tea/Coffee', type: 'veg' }
      ],
      lunch: [
        { name: 'Sambar Rice', type: 'veg' },
        { name: 'Chicken Biryani', type: 'non-veg' },
        { name: 'Chapati', type: 'veg' },
        { name: 'Bhindi', type: 'veg' },
        { name: 'Pickle', type: 'veg' }
      ],
      dinner: [
        { name: 'Khichdi', type: 'veg' },
        { name: 'Egg Curry', type: 'non-veg' },
        { name: 'Roti', type: 'veg' },
        { name: 'Salad', type: 'veg' }
      ]
    }
  ];

  const todayStats: MealStats = {
    totalServed: 144, // 48 tenants × 3 meals
    vegetarian: 96,
    nonVegetarian: 48,
    avgRating: 4.2
  };

  const dayOptions = [
    { id: 'today', label: 'Today', day: 'Tuesday' },
    { id: 'tomorrow', label: 'Tomorrow', day: 'Wednesday' },
    { id: 'week', label: 'This Week', day: 'Monday' }
  ];

  const getCurrentMenu = () => {
    if (selectedDay === 'today') return weeklyMenu.find(m => m.day === 'Tuesday');
    if (selectedDay === 'tomorrow') return weeklyMenu.find(m => m.day === 'Wednesday');
    return weeklyMenu[0]; // Default to Monday for week view
  };

  const currentMenu = getCurrentMenu();

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      default: return '🍽️';
    }
  };

  const getTypeColor = (type: 'veg' | 'non-veg') => {
    return type === 'veg' ? 'text-green-600' : 'text-red-600';
  };

  const getTypeIcon = (type: 'veg' | 'non-veg') => {
    return type === 'veg' ? '🟢' : '🔴';
  };

  return (
    <View className="flex-1 bg-[var(--background)]">
      <Header />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View className="px-4 mb-6">
          <View className="flex-row">
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 mr-2 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Total Served</Text>
              <Text className="text-lg font-bold text-[var(--foreground)]">
                {todayStats.totalServed}
              </Text>
              <Text className="text-xs text-[var(--muted-foreground)]">Today</Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 mx-1 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Veg/Non-Veg</Text>
              <Text className="text-lg font-bold text-green-600">
                {todayStats.vegetarian}
              </Text>
              <Text className="text-sm font-bold text-red-600">
                {todayStats.nonVegetarian}
              </Text>
            </View>
            <View className="flex-1 bg-[var(--card)] rounded-lg p-4 ml-2 border border-[var(--border)]">
              <Text className="text-[var(--muted-foreground)] text-sm mb-1">Avg Rating</Text>
              <Text className="text-lg font-bold text-[var(--foreground)]">
                {todayStats.avgRating}⭐
              </Text>
              <Text className="text-xs text-[var(--muted-foreground)]">This Week</Text>
            </View>
          </View>
        </View>

        {/* Day Selection */}
        <View className="px-4 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dayOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedDay(option.id)}
                className={`px-4 py-2 rounded-lg mr-3 ${
                  selectedDay === option.id
                    ? 'bg-[var(--primary)] border border-[var(--primary)]'
                    : 'bg-[var(--card)] border border-[var(--border)]'
                }`}
              >
                <Text className={`font-medium ${
                  selectedDay === option.id
                    ? 'text-[var(--primary-foreground)]'
                    : 'text-[var(--foreground)]'
                }`}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu Display */}
        {selectedDay === 'week' ? (
          // Weekly Menu View
          <View className="px-4 mb-6">
            <Text className="text-xl font-bold text-[var(--foreground)] mb-4">Weekly Menu</Text>
            {weeklyMenu.map((dayMenu, index) => (
              <View key={index} className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-lg font-semibold text-[var(--foreground)]">
                    {dayMenu.day}
                  </Text>
                  <Text className="text-[var(--muted-foreground)] text-sm">
                    {new Date(dayMenu.date).toLocaleDateString()}
                  </Text>
                </View>
                
                <View className="space-y-2">
                  <View>
                    <Text className="text-[var(--foreground)] font-medium mb-1">🌅 Breakfast</Text>
                    <Text className="text-[var(--muted-foreground)] text-sm">
                      {dayMenu.breakfast.map(item => item.name).join(', ')}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-[var(--foreground)] font-medium mb-1">☀️ Lunch</Text>
                    <Text className="text-[var(--muted-foreground)] text-sm">
                      {dayMenu.lunch.map(item => item.name).join(', ')}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-[var(--foreground)] font-medium mb-1">🌙 Dinner</Text>
                    <Text className="text-[var(--muted-foreground)] text-sm">
                      {dayMenu.dinner.map(item => item.name).join(', ')}
                    </Text>
                  </View>
                </View>
                
                {dayMenu.specialNote && (
                  <View className="mt-3 pt-3 border-t border-[var(--border)]">
                    <Text className="text-orange-600 font-medium text-sm">
                      ⭐ {dayMenu.specialNote}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          // Daily Menu View
          currentMenu && (
            <View className="px-4 mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold text-[var(--foreground)]">
                  {currentMenu.day}'s Menu
                </Text>
                <Text className="text-[var(--muted-foreground)]">
                  {new Date(currentMenu.date).toLocaleDateString()}
                </Text>
              </View>

              {currentMenu.specialNote && (
                <View className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                  <Text className="text-orange-800 font-medium">
                    ⭐ {currentMenu.specialNote}
                  </Text>
                </View>
              )}

              {/* Breakfast */}
              <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
                <Text className="text-lg font-semibold text-[var(--foreground)] mb-3">
                  🌅 Breakfast
                </Text>
                {currentMenu.breakfast.map((item, index) => (
                  <View key={index} className="flex-row justify-between items-center py-2">
                    <Text className="text-[var(--foreground)]">{item.name}</Text>
                    <Text className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Lunch */}
              <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
                <Text className="text-lg font-semibold text-[var(--foreground)] mb-3">
                  ☀️ Lunch
                </Text>
                {currentMenu.lunch.map((item, index) => (
                  <View key={index} className="flex-row justify-between items-center py-2">
                    <Text className="text-[var(--foreground)]">{item.name}</Text>
                    <Text className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Dinner */}
              <View className="bg-[var(--card)] rounded-lg p-4 mb-4 border border-[var(--border)]">
                <Text className="text-lg font-semibold text-[var(--foreground)] mb-3">
                  🌙 Dinner
                </Text>
                {currentMenu.dinner.map((item, index) => (
                  <View key={index} className="flex-row justify-between items-center py-2">
                    <Text className="text-[var(--foreground)]">{item.name}</Text>
                    <Text className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )
        )}
      </ScrollView>

      <BottomNavigation activeTab="meals" onTabChange={onTabChange} />
    </View>
  );
}
