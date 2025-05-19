import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import StatusBadge from '@/components/ui/StatusBadge';

interface AppointmentFormProps {
  doctorId?: string;
  doctorName?: string;
  onSubmit: (appointmentData: any) => void;
  loading?: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctorId,
  doctorName,
  onSubmit,
  loading = false
}) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: '',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
  });
  
  // Available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      const dateValue = date.toISOString().split('T')[0];
      
      dates.push({ value: dateValue, label: formattedDate });
    }
    
    return dates;
  };
  
  // Available time slots
  const timeSlots = [
    { value: '09:00', label: '09:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '16:00', label: '04:00 PM' },
    { value: '17:00', label: '05:00 PM' },
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      doctorId,
      status: 'pending'
    });
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  return (
    <div className="card p-6 animate-fadeIn">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {t('booking.title')}
        {doctorName && ` - ${doctorName}`}
      </h2>
      
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-full flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}>
            1
          </div>
          <div className={`h-1 flex-1 ${
            step > 1 ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}>
            2
          </div>
          <div className={`h-1 flex-1 ${
            step > 2 ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}>
            3
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Select Date and Time */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t('booking.selectDateTime')}
            </h3>
            
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                {t('booking.selectDate')}
              </label>
              <select
                id="date"
                name="date"
                className="form-select"
                value={formData.date}
                onChange={handleInputChange}
                required
              >
                <option value="">{t('booking.chooseDatePlaceholder')}</option>
                {getAvailableDates().map(date => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="time" className="form-label">
                {t('booking.selectTime')}
              </label>
              <select
                id="time"
                name="time"
                className="form-select"
                value={formData.time}
                onChange={handleInputChange}
                required
              >
                <option value="">{t('booking.chooseTimePlaceholder')}</option>
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
                disabled={!formData.date || !formData.time}
              >
                {t('button.next')}
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Reason for Visit */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t('booking.visitDetails')}
            </h3>
            
            <div className="form-group">
              <label htmlFor="reason" className="form-label">
                {t('booking.reason')} *
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                className="form-input"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder={t('booking.reasonPlaceholder')}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="notes" className="form-label">
                {t('booking.notes')}
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="form-input"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder={t('booking.notesPlaceholder')}
              ></textarea>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                className="btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={prevStep}
              >
                {t('button.back')}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
                disabled={!formData.reason}
              >
                {t('button.next')}
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Patient Information */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t('booking.patientInfo')}
            </h3>
            
            <div className="form-group">
              <label htmlFor="patientName" className="form-label">
                {t('booking.patientName')} *
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-input"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder={t('booking.patientNamePlaceholder')}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="patientPhone" className="form-label">
                {t('booking.patientPhone')} *
              </label>
              <input
                type="tel"
                id="patientPhone"
                name="patientPhone"
                className="form-input"
                value={formData.patientPhone}
                onChange={handleInputChange}
                placeholder={t('booking.patientPhonePlaceholder')}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="patientEmail" className="form-label">
                {t('booking.patientEmail')}
              </label>
              <input
                type="email"
                id="patientEmail"
                name="patientEmail"
                className="form-input"
                value={formData.patientEmail}
                onChange={handleInputChange}
                placeholder={t('booking.patientEmailPlaceholder')}
              />
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                className="btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={prevStep}
              >
                {t('button.back')}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !formData.patientName || !formData.patientPhone}
              >
                {loading ? t('common.processing') : t('booking.confirm')}
              </button>
            </div>
          </div>
        )}
      </form>
      
      {/* Appointment Summary (shown after submission) */}
      {step === 4 && (
        <div className="animate-fadeIn text-center py-6">
          <div className="w-16 h-16 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('booking.success')}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('booking.successMessage')}
          </p>
          
          <div className="card p-4 mb-6 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {formData.date} • {formData.time}
              </div>
              <StatusBadge status="pending" />
            </div>
            
            {doctorName && (
              <div className="text-base font-medium text-gray-900 dark:text-white mb-2">
                {doctorName}
              </div>
            )}
            
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span className="font-medium">{t('booking.reason')}:</span> {formData.reason}
            </div>
            
            {formData.notes && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">{t('booking.notes')}:</span> {formData.notes}
              </div>
            )}
          </div>
          
          <div className="flex justify-center gap-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => window.location.href = '/appointments'}
            >
              {t('booking.viewAppointments')}
            </button>
            <button
              type="button"
              className="btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => window.location.href = '/doctors'}
            >
              {t('booking.backToDoctors')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
