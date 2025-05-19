import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import Image from 'next/image';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  maxFiles = 5,
  maxSize = 10, // 10MB default
  acceptedFormats = ['.pdf', '.jpg', '.jpeg', '.png'],
  className = '',
}) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFiles = (files: FileList | File[]): File[] => {
    const validFiles: File[] = [];
    const fileArray = Array.from(files);
    
    // Check max files
    if (fileArray.length > maxFiles) {
      setError(t('files.tooMany').replace('{maxFiles}', maxFiles.toString()));
      return validFiles;
    }
    
    // Validate each file
    for (const file of fileArray) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(t('files.tooLarge').replace('{maxSize}', maxSize.toString()));
        continue;
      }
      
      // Check file format
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedFormats.includes(fileExtension)) {
        setError(t('files.invalidFormat'));
        continue;
      }
      
      validFiles.push(file);
    }
    
    return validFiles;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(e.dataTransfer.files);
      if (validFiles.length > 0) {
        onUpload(validFiles);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        onUpload(validFiles);
      }
    }
  };

  return (
    <div className={`file-upload ${isDragging ? 'border-primary-500 dark:border-primary-400' : ''} ${className}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        className="file-upload-input"
        onChange={handleFileInputChange}
        accept={acceptedFormats.join(',')}
      />
      
      <div className="file-upload-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      
      <div className="file-upload-text">
        {t('files.dragDrop')}
      </div>
      
      <div className="file-upload-hint">
        {t('files.maxSize').replace('{size}', maxSize.toString())}
        <br />
        {t('files.supportedFormats')}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-danger-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
