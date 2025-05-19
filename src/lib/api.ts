import { supabase } from './supabase';
import { Doctor, Patient, Appointment, Availability, MedicalFile } from '@/types';

// Doctor related functions
export async function getDoctors() {
  const { data, error } = await supabase
    .from('doctors')
    .select('*');
  
  return { data, error };
}

export async function getDoctorById(id: string) {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
}

export async function searchDoctors(searchTerm: string, specialty?: string) {
  let query = supabase
    .from('doctors')
    .select('*');
  
  if (searchTerm) {
    query = query.ilike('name', `%${searchTerm}%`);
  }
  
  if (specialty) {
    query = query.eq('specialty', specialty);
  }
  
  const { data, error } = await query;
  return { data, error };
}

// Patient related functions
export async function getPatientById(id: string) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
}

export async function createPatient(patient: Omit<Patient, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('patients')
    .insert([patient])
    .select();
  
  return { data, error };
}

// Appointment related functions
export async function getAppointmentsByPatientId(patientId: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      doctors (*)
    `)
    .eq('patient_id', patientId);
  
  return { data, error };
}

export async function getAppointmentsByDoctorId(doctorId: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      patients (*)
    `)
    .eq('doctor_id', doctorId);
  
  return { data, error };
}

export async function createAppointment(appointment: Omit<Appointment, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointment])
    .select();
  
  return { data, error };
}

export async function updateAppointmentStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .select();
  
  return { data, error };
}

// Availability related functions
export async function getDoctorAvailability(doctorId: string) {
  const { data, error } = await supabase
    .from('availability')
    .select('*')
    .eq('doctor_id', doctorId);
  
  return { data, error };
}

export async function createAvailability(availability: Omit<Availability, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('availability')
    .insert([availability])
    .select();
  
  return { data, error };
}

// Medical files related functions
export async function uploadMedicalFile(
  patientId: string, 
  appointmentId: string | undefined, 
  file: File
) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${patientId}/${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('medical-files')
    .upload(fileName, file);
  
  if (error) {
    return { data: null, error };
  }
  
  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from('medical-files')
    .getPublicUrl(fileName);
  
  // Create a record in the medical_files table
  const { data: fileData, error: fileError } = await supabase
    .from('medical_files')
    .insert([
      {
        patient_id: patientId,
        appointment_id: appointmentId,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type
      }
    ])
    .select();
  
  return { data: fileData, error: fileError };
}

export async function getMedicalFilesByPatientId(patientId: string) {
  const { data, error } = await supabase
    .from('medical_files')
    .select('*')
    .eq('patient_id', patientId);
  
  return { data, error };
}
