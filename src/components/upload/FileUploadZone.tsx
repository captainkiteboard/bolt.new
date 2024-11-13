import { FC } from 'react';

interface FileUploadZoneProps {
  id: string;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (file: File) => void;
  label: string;
}

export const FileUploadZone: FC<FileUploadZoneProps> = ({
  id,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  label,
}) => {
  return (
    <div
      className={`mb-4 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
        className="hidden"
        id={id}
      />
      <label htmlFor={id} className="cursor-pointer">
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-gray-600">{label}</span>
        </div>
      </label>
    </div>
  );
};