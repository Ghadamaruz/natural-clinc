import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import DashboardLayout from '@/components/shared/DashboardLayout';
import DoctorSearch from '@/components/doctors/DoctorSearch';
import Image from 'next/image';

// Mock data for doctors
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.8,
    reviewCount: 124,
    availability: 'Available today',
    avatar: '/images/doctor_focused.jpeg',
  },
  {
    id: '2',
    name: 'Dr. Ahmed Hassan',
    specialty: 'Pediatrics',
    rating: 4.9,
    reviewCount: 98,
    availability: 'Available tomorrow',
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    rating: 4.7,
    reviewCount: 87,
    availability: 'Available today',
  },
];

export default function DoctorsPage() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [doctors, setDoctors] = React.useState(mockDoctors);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = (query: string, filters: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Filter doctors based on query and filters
      let filteredDoctors = [...mockDoctors];
      
      if (query) {
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.name.toLowerCase().includes(query.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (filters.specialty) {
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.specialty.toLowerCase() === filters.specialty.toLowerCase()
        );
      }
      
      if (filters.rating > 0) {
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.rating >= filters.rating
        );
      }
      
      setDoctors(filteredDoctors);
      setLoading(false);
    }, 1000);
  };

  const handleBookAppointment = (doctorId: string) => {
    // Navigate to appointment booking page
    window.location.href = `/appointments/book?doctorId=${doctorId}`;
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <DoctorSearch 
          onSearch={handleSearch}
          loading={loading}
          doctors={doctors}
          onBookAppointment={handleBookAppointment}
        />
      </div>
    </DashboardLayout>
  );
}
