import { FC } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { Navigation } from './Navigation';

export const Header: FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <nav className="flex space-x-6">
        <Navigation />
      </nav>
      <LanguageSelector />
    </header>
  );
};