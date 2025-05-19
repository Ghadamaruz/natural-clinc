export interface User {
  id: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  created_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface Doctor {
  id: string;
  user_id: string;
  name: string;
  specialty: string;
  experience: number;
  bio: string;
  photo_url?: string;
  created_at: string;
}

export interface Availability {
  id: string;
  doctor_id: string;
  day_of_week: number; // 0-6 for Sunday-Saturday
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
  is_recurring: boolean;
  specific_date?: string; // YYYY-MM-DD format for non-recurring
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface MedicalFile {
  id: string;
  patient_id: string;
  appointment_id?: string;
  file_name: string;
  file_url: string;
  file_type: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'appointment' | 'system' | 'feedback';
  is_read: boolean;
  created_at: string;
}

export type Language = 'en' | 'ar';
export type Theme = 'innovayt' | 'dark' | 'light';

export interface UserPreferences {
  language: Language;
  theme: Theme;
  notifications_enabled: boolean;
}
