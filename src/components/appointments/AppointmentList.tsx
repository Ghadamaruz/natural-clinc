import React from 'react';
import { useLanguage } from '@/lib/i18n';
import AppointmentCard from '@/components/appointments/AppointmentCard';

interface AppointmentListProps {
  appointments: Array<{
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
  }>;
  filter?: 'upcoming' | 'past' | 'cancelled' | 'all';
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  filter = 'all',
  onReschedule,
  onCancel
}) => {
  const { t } = useLanguage();
  
  // Filter appointments based on the filter prop
  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return ['confirmed', 'pending'].includes(appointment.status);
    if (filter === 'past') return appointment.status === 'completed';
    if (filter === 'cancelled') return appointment.status === 'cancelled';
    return true;
  });
  
  // Sort appointments by date (most recent first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Empty state messages based on filter
  const getEmptyStateMessage = () => {
    switch (filter) {
      case 'upcoming':
        return t('appointments.noUpcoming');
      case 'past':
        return t('appointments.noPast');
      case 'cancelled':
        return t('appointments.noCancelled');
      default:
        return t('appointments.noAppointments');
    }
  };
  
  return (
    <div className="space-y-4 animate-fadeIn">
      {sortedAppointments.length > 0 ? (
        sortedAppointments.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onReschedule={
              ['confirmed', 'pending'].includes(appointment.status) ? onReschedule : undefined
            }
            onCancel={
              ['confirmed', 'pending'].includes(appointment.status) ? onCancel : undefined
            }
          />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="inline-block rounded-full h-16 w-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p>{getEmptyStateMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
