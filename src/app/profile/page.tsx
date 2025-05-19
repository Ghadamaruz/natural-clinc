import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import DashboardLayout from '@/components/shared/DashboardLayout';
import FileUpload from '@/components/patients/FileUpload';
import FileList from '@/components/patients/FileList';
import Image from 'next/image';

// Mock data for user profile
const mockUserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1985-06-15',
  gender: 'male',
  address: '123 Main St, Anytown, CA 12345',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  chronicConditions: ['Hypertension'],
};

// Mock data for medical files
const mockMedicalFiles = [
  {
    id: '1',
    name: 'Blood Test Results.pdf',
    size: 1250000,
    type: 'application/pdf',
    uploadDate: '2025-04-10T14:30:00Z',
    url: '#',
  },
  {
    id: '2',
    name: 'X-Ray Scan.jpg',
    size: 3500000,
    type: 'image/jpeg',
    uploadDate: '2025-03-22T09:15:00Z',
    url: '#',
  },
  {
    id: '3',
    name: 'Medical History.pdf',
    size: 2100000,
    type: 'application/pdf',
    uploadDate: '2025-02-05T11:45:00Z',
    url: '#',
  },
];

export default function ProfilePage() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [profile, setProfile] = React.useState(mockUserProfile);
  const [medicalFiles, setMedicalFiles] = React.useState(mockMedicalFiles);
  const [activeTab, setActiveTab] = React.useState('personal');
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleFileUpload = (files: File[]) => {
    // Simulate file upload
    setLoading(true);
    setTimeout(() => {
      const newFiles = files.map((file, index) => ({
        id: `new-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        url: '#',
      }));
      
      setMedicalFiles([...newFiles, ...medicalFiles]);
      setLoading(false);
    }, 1500);
  };

  const handleViewFile = (fileId: string) => {
    // In a real app, this would open the file in a new tab or viewer
    alert(t('files.viewMessage'));
  };

  const handleDeleteFile = (fileId: string) => {
    // In a real app, this would show a confirmation dialog before deleting
    if (window.confirm(t('files.confirmDelete'))) {
      setMedicalFiles(medicalFiles.filter(file => file.id !== fileId));
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update profile
    setLoading(true);
    setTimeout(() => {
      setIsEditing(false);
      setLoading(false);
      // In a real app, this would update the profile with form data
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            {t('profile.title')}
          </h1>
        </div>
        
        {/* Profile header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 text-3xl font-bold mb-4 md:mb-0 md:mr-6 rtl:md:mr-0 rtl:md:ml-6">
              {profile.name.charAt(0)}
            </div>
            
            <div className="text-center md:text-left rtl:md:text-right">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {profile.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {profile.phone}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-auto rtl:md:ml-0 rtl:md:mr-auto">
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? t('button.cancel') : t('profile.edit')}
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2 rtl:mr-0 rtl:ml-2">
              <button
                className={`inline-block py-2 px-4 text-sm font-medium ${
                  activeTab === 'personal'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('personal')}
              >
                {t('profile.personalInfo')}
              </button>
            </li>
            <li className="mr-2 rtl:mr-0 rtl:ml-2">
              <button
                className={`inline-block py-2 px-4 text-sm font-medium ${
                  activeTab === 'medical'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('medical')}
              >
                {t('profile.medicalHistory')}
              </button>
            </li>
            <li>
              <button
                className={`inline-block py-2 px-4 text-sm font-medium ${
                  activeTab === 'documents'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('documents')}
              >
                {t('profile.documents')}
              </button>
            </li>
          </ul>
        </div>
        
        {/* Tab content */}
        <div className="animate-fadeIn">
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div className="card p-6">
              {isEditing ? (
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        {t('profile.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-input"
                        defaultValue={profile.name}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        {t('profile.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        defaultValue={profile.email}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        {t('profile.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="form-input"
                        defaultValue={profile.phone}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="dateOfBirth" className="form-label">
                        {t('profile.dateOfBirth')}
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        className="form-input"
                        defaultValue={profile.dateOfBirth}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="gender" className="form-label">
                        {t('profile.gender')}
                      </label>
                      <select
                        id="gender"
                        className="form-select"
                        defaultValue={profile.gender}
                        required
                      >
                        <option value="male">{t('gender.male')}</option>
                        <option value="female">{t('gender.female')}</option>
                        <option value="other">{t('gender.other')}</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="bloodType" className="form-label">
                        {t('profile.bloodType')}
                      </label>
                      <select
                        id="bloodType"
                        className="form-select"
                        defaultValue={profile.bloodType}
                      >
                        <option value="">-- {t('profile.select')} --</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    
                    <div className="form-group md:col-span-2">
                      <label htmlFor="address" className="form-label">
                        {t('profile.address')}
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="form-input"
                        defaultValue={profile.address}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? t('common.saving') : t('profile.save')}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {t('profile.contactInfo')}
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {t('profile.email')}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {profile.email}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {t('profile.phone')}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {profile.phone}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {t('profile.address')}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {profile.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {t('profile.personalDetails')}
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {t('profile.dateOfBirth')}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(profile.dateOfBirth).toLocaleDateString(
                            language === 'en' ? 'en-US' : 'ar-SA',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {t('profile.gender')}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {t(`gender.${profile.gender}`)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {t('profile.bloodType')}
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {profile.bloodType}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Medical History */}
          {activeTab === 'medical' && (
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('profile.medicalHistory')}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                    {t('profile.allergies')}
                  </h4>
                  
                  {profile.allergies.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      {profile.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      {t('profile.noAllergies')}
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                    {t('profile.chronicConditions')}
                  </h4>
                  
                  {profile.chronicConditions.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      {profile.chronicConditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      {t('profile.noChronicConditions')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Medical Documents */}
          {activeTab === 'documents' && (
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('profile.documents')}
              </h3>
              
              <div className="mb-6">
                <FileUpload 
                  onUpload={handleFileUpload}
                  maxFiles={5}
                  maxSize={10}
                  acceptedFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                />
              </div>
              
              <div>
                <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {t('files.yourFiles')}
                </h4>
                
                <FileList 
                  files={medicalFiles}
                  onView={handleViewFile}
                  onDelete={handleDeleteFile}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
