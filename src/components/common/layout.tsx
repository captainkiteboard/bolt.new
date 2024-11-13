import { FC } from 'react';
import {Header} from '../header/header';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} Match your Resume by <a href="https://flairr.pro" className="text-blue-400 hover:underline">Flairr.pro</a>
      </footer>
    </div>
  );
};

export default Layout;