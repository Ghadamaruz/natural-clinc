import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import DashboardLayout from '@/components/shared/DashboardLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  // Featured doctors
  const featuredDoctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.8,
      avatar: '/images/doctor_focused.jpeg',
    },
    {
      id: '2',
      name: 'Dr. Ahmed Hassan',
      specialty: 'Pediatrics',
      rating: 4.9,
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.7,
    },
  ];

  // Upcoming appointments
  const upcomingAppointments = [
    {
      id: '1',
      date: '2025-05-20',
      time: '10:00',
      doctor: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-6 mb-8 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-90"></div>
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white text-center md:text-left rtl:md:text-right mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg opacity-90 mb-6">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start rtl:md:justify-end">
                <Link href="/doctors" className="btn btn-secondary">
                  {t('home.hero.findDoctor')}
                </Link>
                <Link href="/appointments" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  {t('home.hero.bookAppointment')}
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center md:justify-end rtl:md:justify-start">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/images/doctor_patient_illustration.png"
                  alt={t('home.hero.imageAlt')}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-5 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('home.quickActions.findDoctor.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('home.quickActions.findDoctor.description')}
            </p>
            <Link href="/doctors" className="btn btn-primary mt-auto">
              {t('home.quickActions.findDoctor.button')}
            </Link>
          </div>
          
          <div className="card p-5 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center text-secondary-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('home.quickActions.bookAppointment.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('home.quickActions.bookAppointment.description')}
            </p>
            <Link href="/appointments" className="btn btn-secondary mt-auto">
              {t('home.quickActions.bookAppointment.button')}
            </Link>
          </div>
          
          <div className="card p-5 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-success-100 dark:bg-success-900 flex items-center justify-center text-success-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('home.quickActions.medicalRecords.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('home.quickActions.medicalRecords.description')}
            </p>
            <Link href="/profile?tab=documents" className="btn btn-success mt-auto">
              {t('home.quickActions.medicalRecords.button')}
            </Link>
          </div>
        </div>
        
        {/* Featured Doctors */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('home.featuredDoctors.title')}
            </h2>
            <Link href="/doctors" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              {t('home.featuredDoctors.viewAll')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredDoctors.map((doctor) => (
              <div key={doctor.id} className="card p-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 mb-3">
                  {doctor.avatar ? (
                    <Image 
                      src={doctor.avatar} 
                      alt={doctor.name} 
                      width={80} 
                      height={80} 
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300">
                      <span className="text-xl font-medium">{doctor.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {doctor.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {doctor.specialty}
                </p>
                
                <div className="flex items-center mb-3">
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {doctor.rating}
                  </span>
                </div>
                
                <Link 
                  href={`/doctors/${doctor.id}`}
                  className="btn btn-primary text-sm mt-auto"
                >
                  {t('home.featuredDoctors.viewProfile')}
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('home.upcomingAppointments.title')}
            </h2>
            <Link href="/appointments" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              {t('home.upcomingAppointments.viewAll')}
            </Link>
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <div className="card p-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-3 md:mb-0">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {new Date(appointment.date).toLocaleDateString(
                        language === 'en' ? 'en-US' : 'ar-SA',
                        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                      {appointment.time}
                    </div>
                  </div>
                  
                  <div className="mb-3 md:mb-0">
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {appointment.doctor.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {appointment.doctor.specialty}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/appointments`}
                    className="btn btn-primary text-sm"
                  >
                    {t('home.upcomingAppointments.details')}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-6 text-center">
              <div className="inline-block rounded-full h-16 w-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('home.upcomingAppointments.noAppointments')}
              </p>
              <Link 
                href="/appointments/book"
                className="btn btn-primary"
              >
                {t('home.upcomingAppointments.bookNow')}
              </Link>
            </div>
          )}
        </div>
        
        {/* Health Tips */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('home.healthTips.title')}
            </h2>
          </div>
          
          <div className="card p-6 bg-gradient-to-r from-info-50 to-info-100 dark:from-info-900 dark:to-info-800">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-info-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="md:w-3/4 text-center md:text-left rtl:md:text-right">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('home.healthTips.tip.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('home.healthTips.tip.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
