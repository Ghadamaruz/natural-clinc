import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import DashboardLayout from '@/components/shared/DashboardLayout';
import AppointmentList from '@/components/appointments/AppointmentList';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import Image from 'next/image';

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    date: '2025-05-20',
    time: '10:00',
    status: 'confirmed' as const,
    doctor: {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      avatar: '/images/doctor_focused.jpeg',
    },
    reason: 'Annual checkup',
  },
  {
    id: '2',
    date: '2025-05-15',
    time: '14:30',
    status: 'completed' as const,
    doctor: {
      id: '2',
      name: 'Dr. Ahmed Hassan',
      specialty: 'Pediatrics',
    },
    reason: 'Flu symptoms',
  },
  {
    id: '3',
    date: '2025-05-25',
    time: '09:15',
    status: 'pending' as const,
    doctor: {
      id: '3',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
    },
    reason: 'Skin consultation',
  },
];

export default function AppointmentsPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [appointments, setAppointments] = React.useState(mockAppointments);
  const [activeTab, setActiveTab] = React.useState('upcoming');
  const [showBookingForm, setShowBookingForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleReschedule = (id: string) => {
    // In a real app, this would open a reschedule modal or navigate to a reschedule page
    alert(t('appointments.rescheduleMessage'));
  };

  const handleCancel = (id: string) => {
    // In a real app, this would show a confirmation dialog before cancelling
    if (window.confirm(t('appointments.confirmCancel'))) {
      // Simulate API call to cancel appointment
      setLoading(true);
      setTimeout(() => {
        const updatedAppointments = appointments.map(appointment => 
          appointment.id === id 
            ? { ...appointment, status: 'cancelled' as const } 
            : appointment
        );
        setAppointments(updatedAppointments);
        setLoading(false);
      }, 1000);
    }
  };

  const handleBookAppointment = (appointmentData: any) => {
    // Simulate API call to book appointment
    setLoading(true);
    setTimeout(() => {
      const newAppointment = {
        id: `${appointments.length + 1}`,
        date: appointmentData.date,
        time: appointmentData.time,
        status: 'pending' as const,
        doctor: {
          id: appointmentData.doctorId || '1',
          name: 'Dr. Sarah Johnson', // In a real app, this would come from the doctor data
          specialty: 'Cardiology',
          avatar: '/images/doctor_focused.jpeg',
        },
        reason: appointmentData.reason,
      };
      
      setAppointments([...appointments, newAppointment]);
      setLoading(false);
      setShowBookingForm(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            {t('appointments.title')}
          </h1>
          
          <button 
            className="btn btn-primary"
            onClick={() => setShowBookingForm(!showBookingForm)}
          >
            {showBookingForm ? t('appointments.hideForm') : t('appointments.book')}
          </button>
        </div>
        
        {showBookingForm ? (
          <div className="mb-8 animate-fadeIn">
            <AppointmentForm 
              onSubmit={handleBookAppointment}
              loading={loading}
            />
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2 rtl:mr-0 rtl:ml-2">
                  <button
                    className={`inline-block py-2 px-4 text-sm font-medium ${
                      activeTab === 'upcoming'
                        ? 'text-primary-600 border-b-2 border-primary-500'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    {t('appointments.upcoming')}
                  </button>
                </li>
                <li className="mr-2 rtl:mr-0 rtl:ml-2">
                  <button
                    className={`inline-block py-2 px-4 text-sm font-medium ${
                      activeTab === 'past'
                        ? 'text-primary-600 border-b-2 border-primary-500'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('past')}
                  >
                    {t('appointments.past')}
                  </button>
                </li>
                <li>
                  <button
                    className={`inline-block py-2 px-4 text-sm font-medium ${
                      activeTab === 'cancelled'
                        ? 'text-primary-600 border-b-2 border-primary-500'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('cancelled')}
                  >
                    {t('appointments.cancelled')}
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Appointment list */}
            <AppointmentList 
              appointments={appointments}
              filter={activeTab as 'upcoming' | 'past' | 'cancelled'}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
