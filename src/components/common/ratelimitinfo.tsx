// src/components/RateLimitInfo.tsx
import { FC } from 'react';
import { useTranslation } from 'next-i18next';

interface RateLimitInfoProps {
  remaining: number;
  total: number;
  resetTime: number;
}

export const RateLimitInfo: FC<RateLimitInfoProps> = ({ 
  remaining, 
  total, 
  resetTime 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="text-sm text-gray-600 mt-2">
      {t('rateLimit.info', { 
        remaining, 
        total, 
        resetIn: Math.ceil((resetTime - Date.now()) / 1000 / 60) 
      })}
    </div>
  );
};