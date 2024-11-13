import { FC } from 'react';
import { FileUploadZone } from './FileUploadZone';

interface UploadSectionProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (file: File) => void;
  uploadId: string;
  dragDropLabel: string;
  placeholder: string;
  orLabel: string;
}

export const UploadSection: FC<UploadSectionProps> = ({
  title,
  value,
  onChange,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  uploadId,
  dragDropLabel,
  placeholder,
  orLabel,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      <FileUploadZone
        id={uploadId}
        isDragging={isDragging}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onFileSelect={onFileSelect}
        label={dragDropLabel}
      />

      <div className="mb-2 text-sm text-gray-600 text-center">
        {orLabel}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};