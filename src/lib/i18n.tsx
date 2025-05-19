import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ar';

// Define direction based on language
export type Direction = 'ltr' | 'rtl';

// Translation dictionary type
type TranslationDictionary = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: Direction;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  dir: 'ltr',
  t: (key: string) => key,
});

// Translations dictionary
const translations: TranslationDictionary = {
  en: {
    // Common
    'app.name': 'Doctory',
    'app.tagline': 'Your Health, Our Priority',
    
    // Navigation
    'nav.home': 'Home',
    'nav.doctors': 'Doctors',
    'nav.appointments': 'Appointments',
    'nav.profile': 'Profile',
    
    // Header
    'header.toggleMenu': 'Toggle Menu',
    'header.search': 'Search',
    'header.searchPlaceholder': 'Search for doctors, specialties...',
    
    // Theme
    'theme.label': 'Theme',
    'theme.innovayt': 'Innovayt',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    
    // Language
    'language.switch': 'Switch to Arabic',
    'language.english': 'English',
    'language.arabic': 'Arabic',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.haveAccount': 'Already have an account?',
    
    // Doctors
    'doctors.title': 'Find Doctors',
    'doctors.search': 'Search Doctors',
    'doctors.filter': 'Filter',
    'doctors.specialty': 'Specialty',
    'doctors.availability': 'Availability',
    'doctors.rating': 'Rating',
    'doctors.viewProfile': 'View Profile',
    'doctors.bookAppointment': 'Book Appointment',
    'doctors.noResults': 'No doctors found matching your criteria',
    
    // Doctor Profile
    'doctor.about': 'About',
    'doctor.education': 'Education',
    'doctor.experience': 'Experience',
    'doctor.reviews': 'Reviews',
    'doctor.location': 'Location',
    'doctor.contactInfo': 'Contact Information',
    'doctor.languages': 'Languages',
    'doctor.fees': 'Consultation Fees',
    
    // Appointments
    'appointments.title': 'My Appointments',
    'appointments.upcoming': 'Upcoming',
    'appointments.past': 'Past',
    'appointments.cancelled': 'Cancelled',
    'appointments.book': 'Book Appointment',
    'appointments.reschedule': 'Reschedule',
    'appointments.cancel': 'Cancel',
    'appointments.noUpcoming': 'No upcoming appointments',
    'appointments.noPast': 'No past appointments',
    'appointments.confirmCancel': 'Are you sure you want to cancel this appointment?',
    
    // Appointment Booking
    'booking.title': 'Book an Appointment',
    'booking.selectDate': 'Select Date',
    'booking.selectTime': 'Select Time',
    'booking.reason': 'Reason for Visit',
    'booking.notes': 'Additional Notes',
    'booking.patientInfo': 'Patient Information',
    'booking.confirm': 'Confirm Booking',
    'booking.success': 'Appointment booked successfully!',
    'booking.error': 'Error booking appointment. Please try again.',
    'booking.noSlots': 'No available slots for the selected date',
    
    // Patient Profile
    'profile.title': 'My Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.medicalHistory': 'Medical History',
    'profile.documents': 'Medical Documents',
    'profile.preferences': 'Preferences',
    'profile.edit': 'Edit Profile',
    'profile.save': 'Save Changes',
    
    // File Upload
    'files.upload': 'Upload Files',
    'files.dragDrop': 'Drag and drop files here, or click to select',
    'files.maxSize': 'Maximum file size: 10MB',
    'files.supportedFormats': 'Supported formats: PDF, JPG, PNG',
    'files.uploading': 'Uploading...',
    'files.success': 'File uploaded successfully',
    'files.error': 'Error uploading file',
    
    // Status
    'status.confirmed': 'Confirmed',
    'status.pending': 'Pending',
    'status.cancelled': 'Cancelled',
    'status.completed': 'Completed',
    
    // Buttons
    'button.submit': 'Submit',
    'button.cancel': 'Cancel',
    'button.save': 'Save',
    'button.edit': 'Edit',
    'button.delete': 'Delete',
    'button.back': 'Back',
    'button.next': 'Next',
    'button.continue': 'Continue',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.markRead': 'Mark as Read',
    'notifications.markAllRead': 'Mark All as Read',
    'notifications.empty': 'No notifications',
    
    // Errors
    'error.general': 'Something went wrong. Please try again.',
    'error.notFound': 'Page not found',
    'error.unauthorized': 'You are not authorized to access this page',
    'error.network': 'Network error. Please check your connection.',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
  },
  ar: {
    // Common
    'app.name': 'دكتوري',
    'app.tagline': 'صحتك، أولويتنا',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.doctors': 'الأطباء',
    'nav.appointments': 'المواعيد',
    'nav.profile': 'الملف الشخصي',
    
    // Header
    'header.toggleMenu': 'فتح/إغلاق القائمة',
    'header.search': 'بحث',
    'header.searchPlaceholder': 'ابحث عن أطباء، تخصصات...',
    
    // Theme
    'theme.label': 'المظهر',
    'theme.innovayt': 'إنوفيت',
    'theme.light': 'فاتح',
    'theme.dark': 'داكن',
    
    // Language
    'language.switch': 'التبديل إلى الإنجليزية',
    'language.english': 'الإنجليزية',
    'language.arabic': 'العربية',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.logout': 'تسجيل الخروج',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.haveAccount': 'لديك حساب بالفعل؟',
    
    // Doctors
    'doctors.title': 'البحث عن أطباء',
    'doctors.search': 'البحث عن أطباء',
    'doctors.filter': 'تصفية',
    'doctors.specialty': 'التخصص',
    'doctors.availability': 'التوفر',
    'doctors.rating': 'التقييم',
    'doctors.viewProfile': 'عرض الملف',
    'doctors.bookAppointment': 'حجز موعد',
    'doctors.noResults': 'لم يتم العثور على أطباء مطابقين لمعاييرك',
    
    // Doctor Profile
    'doctor.about': 'نبذة',
    'doctor.education': 'التعليم',
    'doctor.experience': 'الخبرة',
    'doctor.reviews': 'التقييمات',
    'doctor.location': 'الموقع',
    'doctor.contactInfo': 'معلومات الاتصال',
    'doctor.languages': 'اللغات',
    'doctor.fees': 'رسوم الاستشارة',
    
    // Appointments
    'appointments.title': 'مواعيدي',
    'appointments.upcoming': 'القادمة',
    'appointments.past': 'السابقة',
    'appointments.cancelled': 'الملغاة',
    'appointments.book': 'حجز موعد',
    'appointments.reschedule': 'إعادة جدولة',
    'appointments.cancel': 'إلغاء',
    'appointments.noUpcoming': 'لا توجد مواعيد قادمة',
    'appointments.noPast': 'لا توجد مواعيد سابقة',
    'appointments.confirmCancel': 'هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟',
    
    // Appointment Booking
    'booking.title': 'حجز موعد',
    'booking.selectDate': 'اختر التاريخ',
    'booking.selectTime': 'اختر الوقت',
    'booking.reason': 'سبب الزيارة',
    'booking.notes': 'ملاحظات إضافية',
    'booking.patientInfo': 'معلومات المريض',
    'booking.confirm': 'تأكيد الحجز',
    'booking.success': 'تم حجز الموعد بنجاح!',
    'booking.error': 'حدث خطأ في حجز الموعد. يرجى المحاولة مرة أخرى.',
    'booking.noSlots': 'لا توجد مواعيد متاحة للتاريخ المحدد',
    
    // Patient Profile
    'profile.title': 'ملفي الشخصي',
    'profile.personalInfo': 'المعلومات الشخصية',
    'profile.medicalHistory': 'التاريخ الطبي',
    'profile.documents': 'المستندات الطبية',
    'profile.preferences': 'التفضيلات',
    'profile.edit': 'تعديل الملف',
    'profile.save': 'حفظ التغييرات',
    
    // File Upload
    'files.upload': 'رفع الملفات',
    'files.dragDrop': 'اسحب وأفلت الملفات هنا، أو انقر للاختيار',
    'files.maxSize': 'الحد الأقصى لحجم الملف: 10 ميجابايت',
    'files.supportedFormats': 'الصيغ المدعومة: PDF، JPG، PNG',
    'files.uploading': 'جاري الرفع...',
    'files.success': 'تم رفع الملف بنجاح',
    'files.error': 'خطأ في رفع الملف',
    
    // Status
    'status.confirmed': 'مؤكد',
    'status.pending': 'قيد الانتظار',
    'status.cancelled': 'ملغى',
    'status.completed': 'مكتمل',
    
    // Buttons
    'button.submit': 'إرسال',
    'button.cancel': 'إلغاء',
    'button.save': 'حفظ',
    'button.edit': 'تعديل',
    'button.delete': 'حذف',
    'button.back': 'رجوع',
    'button.next': 'التالي',
    'button.continue': 'متابعة',
    
    // Notifications
    'notifications.title': 'الإشعارات',
    'notifications.markRead': 'تحديد كمقروء',
    'notifications.markAllRead': 'تحديد الكل كمقروء',
    'notifications.empty': 'لا توجد إشعارات',
    
    // Errors
    'error.general': 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    'error.notFound': 'الصفحة غير موجودة',
    'error.unauthorized': 'غير مصرح لك بالوصول إلى هذه الصفحة',
    'error.network': 'خطأ في الشبكة. يرجى التحقق من اتصالك.',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.contact': 'اتصل بنا',
  },
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      return savedLanguage || 'en';
    }
    return 'en';
  });

  // Direction based on language
  const dir: Direction = language === 'ar' ? 'rtl' : 'ltr';

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Update document direction when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
      
      // Load appropriate font based on language
      if (language === 'ar') {
        document.documentElement.classList.add('font-arabic');
        document.documentElement.classList.remove('font-sans');
      } else {
        document.documentElement.classList.add('font-sans');
        document.documentElement.classList.remove('font-arabic');
      }
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
