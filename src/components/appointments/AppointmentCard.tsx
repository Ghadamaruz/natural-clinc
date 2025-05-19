import React from 'react';
import { useLanguage } from '@/lib/i18n';
import StatusBadge from '@/components/ui/StatusBadge';
import Image from 'next/image';

interface AppointmentCardProps {
  appointment: {
    id: string;
    date: string;
    time: string;
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
    doctor: {
      id: string;
      name: string;
      specialty: string;
      avatar?: string;
    };
    reason?: string;
  };
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onReschedule,
  onCancel
}) => {
  const { t, language } = useLanguage();
  const { id, date, time, status, doctor, reason } = appointment;
  
  // Format date based on language
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', options);
  };
  
  return (
    <div className="appointment-card">
      <div className="appointment-status">
        <div className="appointment-date">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {formatDate(date)}
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
            {time}
          </div>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="appointment-doctor">
        <div className="appointment-doctor-avatar">
          {doctor.avatar ? (
            <Image 
              src={doctor.avatar} 
              alt={doctor.name} 
              width={48} 
              height={48} 
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300">
              <span className="text-lg font-medium">{doctor.name.charAt(0)}</span>
            </div>
          )}
        </div>
        
        <div className="appointment-doctor-info">
          <div className="text-base font-medium text-gray-900 dark:text-white">
            {doctor.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {doctor.specialty}
          </div>
          {reason && (
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              <span className="font-medium">{t('appointments.reason')}:</span> {reason}
            </div>
          )}
        </div>
      </div>
      
      <div className="appointment-actions">
        {status === 'confirmed' || status === 'pending' ? (
          <>
            {onReschedule && (
              <button 
                onClick={() => onReschedule(id)}
                className="btn btn-outline btn-sm"
                aria-label={t('appointments.reschedule')}
              >
                {t('appointments.reschedule')}
              </button>
            )}
            
            {onCancel && (
              <button 
                onClick={() => onCancel(id)}
                className="btn btn-danger btn-sm"
                aria-label={t('appointments.cancel')}
              >
                {t('appointments.cancel')}
              </button>
            )}
          </>
        ) : status === 'completed' ? (
          <button 
            className="btn btn-primary btn-sm"
            aria-label={t('appointments.bookAgain')}
          >
            {t('appointments.bookAgain')}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default AppointmentCard;
