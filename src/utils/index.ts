// Utility functions for the PG Management App

/**
 * Format currency value to Indian Rupee format
 */
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Format date to localized string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Calculate occupancy rate
 */
export const calculateOccupancyRate = (occupied: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((occupied / total) * 100);
};

/**
 * Get status color class based on status type
 */
export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
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
  };
  return statusMap[status] || 'bg-gray-100 border-gray-300 text-gray-800';
};

/**
 * Get priority color class based on priority level
 */
export const getPriorityColor = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    urgent: 'bg-red-500 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-blue-500 text-white',
    low: 'bg-gray-500 text-white',
  };
  return priorityMap[priority] || 'bg-gray-500 text-white';
};

/**
 * Get category icon based on category type
 */
export const getCategoryIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    maintenance: '🔧',
    cleanliness: '🧹',
    noise: '🔊',
    wifi: '📶',
    food: '🍽️',
    other: '📝',
  };
  return iconMap[category] || '📝';
};

/**
 * Filter items based on search term and filter option
 */
export const filterItems = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[],
  filterField?: keyof T,
  filterValue?: string
): T[] => {
  return items.filter((item) => {
    // Search filter
    const matchesSearch =
      searchTerm === '' ||
      searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Category/Status filter
    const matchesFilter =
      !filterField || !filterValue || filterValue === 'all' || item[filterField] === filterValue;

    return matchesSearch && matchesFilter;
  });
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Calculate days between two dates
 */
export const daysBetween = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Check if date is overdue
 */
export const isOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};

