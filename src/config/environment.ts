// src/config/environment.ts
export const environment = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    supportedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
    defaultLocale: 'en',
    supportedLocales: ['en', 'nl', 'de', 'fr', 'it', 'es', 'pt'],
  };