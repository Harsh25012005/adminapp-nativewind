# File Structure Documentation

This document outlines the updated and improved file structure for the PG Admin App (React Native with Expo and NativeWind).

## Directory Structure

```
adminapp-nativewind/
├── src/                          # Source code directory
│   ├── app/                      # Application layer
│   │   ├── index.tsx            # Main app entry point with navigation logic
│   │   └── screens/             # Full-screen components
│   │       ├── Home.tsx         # Dashboard/Home screen
│   │       ├── Tenant.tsx       # Tenant management screen
│   │       ├── Room.tsx         # Room management screen
│   │       ├── Payment.tsx      # Payment tracking screen
│   │       ├── ComplaintsManagement.tsx  # Complaints screen
│   │       ├── MealsManagement.tsx       # Meals & menu screen
│   │       ├── NoticesManagement.tsx     # Notices & announcements screen
│   │       └── More.tsx         # More options/settings screen
│   │
│   ├── components/              # Reusable UI components
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── BottomNavigation.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── cards/              # Card components
│   │   │   ├── KPICards.tsx
│   │   │   ├── KPIMetricCard.tsx
│   │   │   ├── PGInsightsCard.tsx
│   │   │   ├── RentDuesCard.tsx
│   │   │   ├── ComplaintsCard.tsx
│   │   │   ├── MealUpdatesCard.tsx
│   │   │   ├── HeroCard.tsx
│   │   │   ├── AISuggestionCard.tsx
│   │   │   ├── VehicleUtilizationCard.tsx
│   │   │   ├── KPIMetrics.tsx
│   │   │   ├── MiniAnalytics.tsx
│   │   │   ├── SimpleStats.tsx
│   │   │   ├── SimpleTransactions.tsx
│   │   │   └── TransactionsList.tsx
│   │   │
│   │   ├── charts/             # Chart components
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── ExpensesChart.tsx
│   │   │   ├── RealtimeChart.tsx
│   │   │   └── SimpleChart.tsx
│   │   │
│   │   ├── EditScreenInfo.tsx  # Helper component
│   │   └── ScreenContent.tsx   # Helper component
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts           # Central type definitions
│   │
│   ├── constants/              # Application constants
│   │   └── index.ts           # App constants, colors, navigation items
│   │
│   └── utils/                  # Utility functions
│       └── index.ts           # Helper functions (formatting, filtering, etc.)
│
├── assets/                     # Static assets
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
│
├── App.tsx                     # Root app component (re-exports from src/app)
├── App.js                      # Legacy file (can be removed)
├── App.homescreen.tsx          # Alternative entry (can be removed)
├── global.css                  # Global styles
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── babel.config.js             # Babel configuration
├── metro.config.js             # Metro bundler configuration
└── app.json                    # Expo configuration
```

## Key Improvements

### 1. **Separation of Concerns**
- **Screens** (`src/app/screens/`): Full-page components representing different app screens
- **Components** (`src/components/`): Reusable UI components organized by category
  - `layout/`: Navigation, headers, and layout components
  - `cards/`: Card-based UI components
  - `charts/`: Data visualization components
- **Types** (`src/types/`): Centralized TypeScript definitions
- **Constants** (`src/constants/`): Application-wide constants
- **Utils** (`src/utils/`): Helper and utility functions

### 2. **Path Aliases**
The project uses the `~/*` path alias (configured in `tsconfig.json`) to import from the `src/` directory:

```typescript
// Instead of:
import Header from '../../../components/layout/Header';

// Use:
import Header from '~/components/layout/Header';
```

### 3. **Type Safety**
All interfaces and types are centralized in `src/types/index.ts`, promoting reusability and consistency:
- `Tenant`, `Room`, `Bed`, `Payment`, `Complaint`, `Meal`, `Notice`
- `KPIData`, `DataPoint`, `MenuItem`
- `TabType`, `NavigationProps`, `ScreenProps`

### 4. **Reusable Constants**
Common constants are defined in `src/constants/index.ts`:
- `APP_INFO`: Application metadata
- `FILTER_OPTIONS`: Filter constants
- `STATUS_COLORS`: Status color mappings
- `PRIORITY_COLORS`: Priority color mappings
- `CATEGORY_ICONS`: Category icons
- `NAVIGATION_ITEMS`: Navigation configuration

### 5. **Utility Functions**
Helper functions in `src/utils/index.ts`:
- `formatCurrency()`: Format amounts to Indian Rupee
- `formatDate()`: Date formatting
- `calculateOccupancyRate()`: Calculate percentages
- `getStatusColor()`: Get status-specific colors
- `getPriorityColor()`: Get priority-specific colors
- `getCategoryIcon()`: Get category icons
- `filterItems()`: Generic filtering function
- `truncateText()`: Text truncation
- `daysBetween()`: Date calculations
- `isOverdue()`: Date validation

## Import Patterns

### Screens
```typescript
import Header from '~/components/layout/Header';
import BottomNavigation from '~/components/layout/BottomNavigation';
import type { ScreenProps } from '~/types';
```

### Components
```typescript
import type { KPIData } from '~/types';
import { formatCurrency } from '~/utils';
import { STATUS_COLORS } from '~/constants';
```

## Benefits

1. **Scalability**: Easy to add new screens, components, or features
2. **Maintainability**: Clear organization makes code easier to find and modify
3. **Reusability**: Shared components, types, and utilities reduce duplication
4. **Type Safety**: Centralized types ensure consistency across the app
5. **Developer Experience**: Path aliases and clear structure improve DX
6. **Best Practices**: Follows React Native and TypeScript conventions

## Migration Notes

Files have been moved from the root `components/` directory to appropriate subdirectories:
- Screen components → `src/app/screens/`
- Layout components → `src/components/layout/`
- Card components → `src/components/cards/`
- Chart components → `src/components/charts/`

All imports have been updated to use the new `~/*` path alias pointing to the `src/` directory.

