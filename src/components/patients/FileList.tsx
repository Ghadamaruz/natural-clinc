import React from 'react';
import { useLanguage } from '@/lib/i18n';
import Image from 'next/image';

interface FileItemProps {
  file: {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadDate: string;
    url: string;
  };
  onView?: (fileId: string) => void;
  onDelete?: (fileId: string) => void;
}

const FileList: React.FC<{ files: FileItemProps['file'][], onView?: (fileId: string) => void, onDelete?: (fileId: string) => void }> = ({ 
  files, 
  onView, 
  onDelete 
}) => {
  const { t, language } = useLanguage();
  
  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {t('files.noFiles')}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <FileItem 
          key={file.id} 
          file={file} 
          onView={onView} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

const FileItem: React.FC<FileItemProps> = ({ file, onView, onDelete }) => {
  const { t, language } = useLanguage();
  const { id, name, size, type, uploadDate, url } = file;
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + (language === 'en' ? sizes[i] : sizes[i]);
  };
  
  // Format date based on language
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', options);
  };
  
  // Get file icon based on type
  const getFileIcon = () => {
    if (type.includes('pdf')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else if (type.includes('image')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
  };
  
  return (
    <div className="file-item">
      <div className="file-icon">
        {getFileIcon()}
      </div>
      
      <div className="file-info">
        <div className="file-name">{name}</div>
        <div className="file-meta">
          {formatFileSize(size)} • {formatDate(uploadDate)}
        </div>
      </div>
      
      <div className="file-actions">
        {onView && (
          <button 
            onClick={() => onView(id)}
            className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
            aria-label={t('files.view')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        )}
        
        {onDelete && (
          <button 
            onClick={() => onDelete(id)}
            className="p-2 text-gray-500 hover:text-danger-500 dark:text-gray-400 dark:hover:text-danger-400"
            aria-label={t('files.delete')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default FileList;
