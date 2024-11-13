// src/utils/fileValidation.ts
import { environment } from '../config/environment';

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const extension = file.name.toLowerCase().split('.').pop();
  
  if (!extension || !environment.supportedFileTypes.includes(`.${extension}`)) {
    return {
      valid: false,
      error: `Unsupported file type. Supported types: ${environment.supportedFileTypes.join(', ')}`
    };
  }

  if (file.size > environment.maxFileSize) {
    return {
      valid: false,
      error: `File size exceeds ${environment.maxFileSize / (1024 * 1024)}MB limit`
    };
  }

  return { valid: true };
};