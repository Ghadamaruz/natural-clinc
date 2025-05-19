import React from 'react';
import { useTheme } from '@/lib/theme';
import { useLanguage } from '@/lib/i18n';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const themes = [
    { id: 'innovayt', label: t('theme.innovayt'), icon: '🌟' },
    { id: 'light', label: t('theme.light'), icon: '☀️' },
    { id: 'dark', label: t('theme.dark'), icon: '🌙' },
  ];

  return (
    <div className={`flex items-center space-x-2 rtl:space-x-reverse ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('theme.label')}:
      </span>
      <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              theme === themeOption.id
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            aria-label={`${themeOption.label} theme`}
          >
            <span className="flex items-center gap-1.5">
              <span>{themeOption.icon}</span>
              <span className="hidden sm:inline">{themeOption.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
