// Application constants

export const APP_INFO = {
  name: 'PG Admin',
  version: '1.0.0',
  lastUpdate: '2024-10-01',
  developer: 'PG Management Solutions',
};

export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PAID: 'paid',
  PENDING: 'pending',
  OVERDUE: 'overdue',
  OPEN: 'open',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const;

export const STATUS_COLORS = {
  paid: 'bg-green-100 border-green-300 text-green-800',
  pending: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  overdue: 'bg-red-100 border-red-300 text-red-800',
  active: 'bg-green-100 border-green-300 text-green-800',
  inactive: 'bg-red-100 border-red-300 text-red-800',
  'notice-period': 'bg-orange-100 border-orange-300 text-orange-800',
  open: 'bg-red-100 border-red-300 text-red-800',
  'in-progress': 'bg-yellow-100 border-yellow-300 text-yellow-800',
  resolved: 'bg-green-100 border-green-300 text-green-800',
  closed: 'bg-gray-100 border-gray-300 text-gray-800',
  'fully-occupied': 'bg-green-100 border-green-300 text-green-800',
  'partially-occupied': 'bg-yellow-100 border-yellow-300 text-yellow-800',
  vacant: 'bg-blue-100 border-blue-300 text-blue-800',
  maintenance: 'bg-orange-100 border-orange-300 text-orange-800',
} as const;

export const PRIORITY_COLORS = {
  urgent: 'bg-red-500 text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-blue-500 text-white',
  low: 'bg-gray-500 text-white',
} as const;

export const CATEGORY_ICONS = {
  maintenance: '🔧',
  cleanliness: '🧹',
  noise: '🔊',
  wifi: '📶',
  food: '🍽️',
  other: '📝',
} as const;

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Dashboard' },
  { id: 'room', label: 'Rooms' },
  { id: 'tenant', label: 'Tenants' },
  { id: 'complaints', label: 'Support' },
  { id: 'more', label: 'More' },
] as const;

