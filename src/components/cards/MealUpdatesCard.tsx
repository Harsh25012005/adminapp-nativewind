import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface MealItem {
  id: string;
  name: string;
  emoji: string;
  time: string;
  optedIn: number;
  total: number;
}

export default function MealUpdatesCard() {
  const [userOptIns, setUserOptIns] = useState<{[key: string]: boolean}>({
    '1': true,
    '2': false,
    '3': true,
    '4': true
  });

  const todaysMeals: MealItem[] = [
    {
      id: '1',
      name: 'Breakfast',
      emoji: '🍞',
      time: '7:00 - 9:00 AM',
      optedIn: 32,
      total: 45
    },
    {
      id: '2',
      name: 'Lunch',
      emoji: '🍛',
      time: '12:00 - 2:00 PM',
      optedIn: 38,
      total: 45
    },
    {
      id: '3',
      name: 'Snacks',
      emoji: '🥗',
      time: '4:00 - 6:00 PM',
      optedIn: 25,
      total: 45
    },
    {
      id: '4',
      name: 'Dinner',
      emoji: '🍽️',
      time: '7:00 - 9:00 PM',
      optedIn: 42,
      total: 45
    }
  ];

  const toggleOptIn = (mealId: string) => {
    setUserOptIns(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
  };

  const getOptInPercentage = (optedIn: number, total: number) => {
    return Math.round((optedIn / total) * 100);
  };

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3 px-4">
        <Text className="text-xl font-semibold text-[var(--foreground)]">
          Today's Meals
        </Text>
        <TouchableOpacity>
          <Text className="text-sm text-[var(--primary)] font-medium">Menu</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
      >
        {todaysMeals.map((meal) => {
          const isOptedIn = userOptIns[meal.id];
          const percentage = getOptInPercentage(meal.optedIn, meal.total);
          
          return (
            <View
              key={meal.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 mr-4 min-w-[160px] shadow-sm"
            >
              {/* Header */}
              <View className="items-center mb-3">
                <Text className="text-3xl mb-2">{meal.emoji}</Text>
                <Text className="font-semibold text-[var(--foreground)] text-center">
                  {meal.name}
                </Text>
                <Text className="text-xs text-[var(--muted-foreground)] text-center">
                  {meal.time}
                </Text>
              </View>

              {/* Stats */}
              <View className="mb-3">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-[var(--muted-foreground)]">
                    Opted In
                  </Text>
                  <Text className="text-sm font-semibold text-[var(--foreground)]">
                    {meal.optedIn}/{meal.total}
                  </Text>
                </View>
                
                {/* Progress Bar */}
                <View className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-[var(--primary)] rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </View>
                <Text className="text-xs text-[var(--muted-foreground)] text-center mt-1">
                  {percentage}% participation
                </Text>
              </View>

              {/* Opt In/Out Button */}
              <TouchableOpacity
                onPress={() => toggleOptIn(meal.id)}
                className={`rounded-lg py-2 px-3 ${
                  isOptedIn 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-[var(--secondary)]'
                }`}
              >
                <Text className={`text-center text-sm font-medium ${
                  isOptedIn 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-[var(--secondary-foreground)]'
                }`}>
                  {isOptedIn ? '✓ Opted In' : 'Opt In'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
