// Common types for the PG Management App

export interface Tenant {
  id: string;
  name: string;
  room: string;
  bedNumber: string;
  phone: string;
  email: string;
  rentAmount: number;
  securityDeposit: number;
  status: 'active' | 'inactive' | 'notice-period';
  joinDate: string;
  emergencyContact: string;
  occupation: string;
  hometown: string;
  lastRentPaid: string;
}

export interface Bed {
  bedNumber: string;
  tenant?: string;
  status: 'occupied' | 'vacant';
  rentAmount: number;
}

export interface Room {
  id: string;
  number: string;
  floor: string;
  type: string;
  size: number; // in sq ft
  totalBeds: number;
  beds: Bed[];
  amenities: string[];
  lastUpdated: string;
  status: 'fully-occupied' | 'partially-occupied' | 'vacant' | 'maintenance';
}

export interface Payment {
  id: string;
  tenantName: string;
  room: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
}

export interface Complaint {
  id: string;
  tenantName: string;
  room: string;
  category: 'maintenance' | 'cleanliness' | 'noise' | 'wifi' | 'food' | 'other';
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  resolvedDate?: string;
  assignedTo?: string;
}

export interface Meal {
  id: string;
  day: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  served: number;
  total: number;
  status: 'scheduled' | 'served' | 'completed';
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  category: 'general' | 'maintenance' | 'payment' | 'event' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'draft';
  attachments?: string[];
}

export interface KPIData {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  trendColor?: string;
}

export interface DataPoint {
  month: string;
  value: number;
}

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// Navigation
export type TabType = 'home' | 'room' | 'tenant' | 'payment' | 'complaints' | 'meals' | 'notices' | 'more';

export interface NavigationProps {
  onTabChange?: (tab: TabType) => void;
}

export interface ScreenProps extends NavigationProps {}

