import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    availability: string;
    avatar?: string;
  };
  onBookAppointment?: (doctorId: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  const { t } = useLanguage();
  const { id, name, specialty, rating, reviewCount, availability, avatar } = doctor;

  // Generate stars for rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="doctor-rating-star w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="doctor-rating-star w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="half-star-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="doctor-card animate-fadeIn">
      <div className="flex-shrink-0">
        {avatar ? (
          <Image 
            src={avatar} 
            alt={name} 
            width={80} 
            height={80} 
            className="doctor-avatar"
          />
        ) : (
          <div className="doctor-avatar bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300">
            <span className="text-xl font-medium">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="doctor-info">
        <h3 className="doctor-name">{name}</h3>
        <p className="doctor-specialty">{specialty}</p>
        
        <div className="doctor-rating">
          <div className="flex mr-2">
            {renderStars()}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({reviewCount} {reviewCount === 1 ? t('doctor.review') : t('doctor.reviews')})
          </span>
        </div>
        
        <p className="doctor-availability">
          {availability}
        </p>
        
        <div className="doctor-actions">
          <Link 
            href={`/doctors/${id}`}
            className="btn btn-primary text-sm"
          >
            {t('doctors.viewProfile')}
          </Link>
          
          {onBookAppointment && (
            <button 
              onClick={() => onBookAppointment(id)}
              className="btn btn-secondary text-sm"
            >
              {t('doctors.bookAppointment')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
