import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface HeaderProps {
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onSidebarToggle }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onSidebarToggle}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
          aria-label={t('header.toggleMenu')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo (mobile only) */}
        <div className="lg:hidden flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8">
              <Image 
                src="/images/doctor_patient_illustration.png" 
                alt="Doctory Logo" 
                width={32} 
                height={32}
                className="object-contain"
              />
            </div>
            <span className="ml-2 text-lg font-bold text-primary-500">
              Doctory
            </span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-3 rtl:pl-0 rtl:pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="search"
              className="input pl-10 rtl:pl-4 rtl:pr-10 w-full"
              placeholder={t('header.searchPlaceholder')}
              aria-label={t('header.search')}
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Theme toggle (desktop only) */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Notifications */}
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-danger-500 rounded-full">
              3
            </span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button className="flex items-center space-x-2 rtl:space-x-reverse focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300">
                <span className="text-sm font-medium">JD</span>
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                John Doe
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
