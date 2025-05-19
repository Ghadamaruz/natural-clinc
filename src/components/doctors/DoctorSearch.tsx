import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import DoctorCard from '@/components/doctors/DoctorCard';
import Image from 'next/image';

interface DoctorSearchProps {
  onSearch: (query: string, filters: any) => void;
  loading?: boolean;
  doctors?: Array<{
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    availability: string;
    avatar?: string;
  }>;
  onBookAppointment?: (doctorId: string) => void;
}

const DoctorSearch: React.FC<DoctorSearchProps> = ({
  onSearch,
  loading = false,
  doctors = [],
  onBookAppointment
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    specialty: '',
    availability: '',
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const specialties = [
    { value: '', label: t('doctors.allSpecialties') },
    { value: 'cardiology', label: t('specialties.cardiology') },
    { value: 'dermatology', label: t('specialties.dermatology') },
    { value: 'neurology', label: t('specialties.neurology') },
    { value: 'orthopedics', label: t('specialties.orthopedics') },
    { value: 'pediatrics', label: t('specialties.pediatrics') },
    { value: 'psychiatry', label: t('specialties.psychiatry') },
  ];

  const availabilityOptions = [
    { value: '', label: t('doctors.anyAvailability') },
    { value: 'today', label: t('availability.today') },
    { value: 'tomorrow', label: t('availability.tomorrow') },
    { value: 'this_week', label: t('availability.thisWeek') },
    { value: 'next_week', label: t('availability.nextWeek') },
  ];

  const ratingOptions = [
    { value: 0, label: t('doctors.anyRating') },
    { value: 5, label: '★★★★★' },
    { value: 4, label: '★★★★☆ & ' + t('doctors.above') },
    { value: 3, label: '★★★☆☆ & ' + t('doctors.above') },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero section with search */}
      <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-6 mb-8">
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-90"></div>
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>
        
        <div className="relative z-10 text-white text-center py-6">
          <h1 className="text-3xl font-bold mb-2">{t('doctors.title')}</h1>
          <p className="text-lg opacity-90 mb-6">{t('doctors.subtitle')}</p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-3 rtl:pl-0 rtl:pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  className="input pl-10 rtl:pl-4 rtl:pr-10 w-full bg-white text-gray-800"
                  placeholder={t('doctors.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-secondary"
                disabled={loading}
              >
                {loading ? t('common.searching') : t('doctors.search')}
              </button>
              
              <button 
                type="button" 
                className="btn bg-white text-primary-600 hover:bg-gray-100"
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 rtl:ml-1 rtl:mr-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {t('doctors.filter')}
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-xl text-left rtl:text-right shadow-md animate-slideInUp">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label htmlFor="specialty" className="form-label text-gray-700">
                      {t('doctors.specialty')}
                    </label>
                    <select
                      id="specialty"
                      name="specialty"
                      className="form-select"
                      value={filters.specialty}
                      onChange={handleFilterChange}
                    >
                      {specialties.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="availability" className="form-label text-gray-700">
                      {t('doctors.availability')}
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      className="form-select"
                      value={filters.availability}
                      onChange={handleFilterChange}
                    >
                      {availabilityOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="rating" className="form-label text-gray-700">
                      {t('doctors.rating')}
                    </label>
                    <select
                      id="rating"
                      name="rating"
                      className="form-select"
                      value={filters.rating}
                      onChange={handleFilterChange}
                    >
                      {ratingOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{t('common.loading')}</p>
          </div>
        ) : doctors.length > 0 ? (
          doctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onBookAppointment={onBookAppointment}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="inline-block rounded-full h-24 w-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('doctors.noResults')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('doctors.tryAdjusting')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;
