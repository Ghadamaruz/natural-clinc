import React from 'react';
import { useLanguage } from '@/lib/i18n';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 ${className}`}
      aria-label={t('language.switch')}
    >
      <span className="flex items-center gap-1.5">
        {language === 'en' ? '🇺🇸' : '🇸🇦'}
        <span className="hidden sm:inline">
          {language === 'en' ? t('language.arabic') : t('language.english')}
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 8h10M7 12h10m-7 4h7" 
          />
        </svg>
      </span>
    </button>
  );
};

export default LanguageSwitcher;
