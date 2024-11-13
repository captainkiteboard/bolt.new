import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { LanguageSelector } from './languageselector';

export const Header: FC = () => {
  const { t } = useTranslation('common');

  return (
    <header className="flex items-center p-2 bg-blue-100 shadow-md">
      <div className="flex items-center space-x-4 pl-4">
        <Image src="/Flairr.png" alt="Flairr Logo" width={40} height={40} />
        <h1 className="text-xl font-semibold text-blue-800">{t('header.subtitle')}</h1>
      </div>
      <div className="ml-auto">
        <LanguageSelector />
      </div>
    </header>
  );
};