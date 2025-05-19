import React from 'react';
import { useLanguage } from '@/lib/i18n';

interface StatusBadgeProps {
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const { t } = useLanguage();
  
  const getStatusClasses = () => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300';
      case 'pending':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300';
      case 'cancelled':
        return 'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-300';
      case 'completed':
        return 'bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'md':
        return 'text-sm px-2.5 py-0.5';
      case 'lg':
        return 'text-base px-3 py-1';
      default:
        return 'text-sm px-2.5 py-0.5';
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'confirmed':
        return t('status.confirmed');
      case 'pending':
        return t('status.pending');
      case 'cancelled':
        return t('status.cancelled');
      case 'completed':
        return t('status.completed');
      default:
        return status;
    }
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${getStatusClasses()} ${getSizeClasses()} ${className}`}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;
