import React from 'react';
import Sidebar from '@/components/shared/Sidebar';
import Header from '@/components/shared/Header';
import { useLanguage } from '@/lib/i18n';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { language, dir } = useLanguage();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div dir={dir} className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        mobileOpen={mobileOpen} 
      />
      
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'main-content-expanded' : 'main-content'
      }`}>
        <Header 
          sidebarCollapsed={sidebarCollapsed} 
          onSidebarToggle={toggleMobileSidebar} 
        />
        
        <main className="p-4 sm:p-6 animate-fadeIn">
          {children}
        </main>
        
        <footer className="mt-auto py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <p>© {new Date().getFullYear()} Doctory. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</p>
        </footer>
      </div>
      
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
