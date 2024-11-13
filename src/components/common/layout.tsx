import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '/flags/en.svg' },
  { code: 'nl', name: 'Dutch', flag: '/flags/nl.svg' },
  { code: 'de', name: 'German', flag: '/flags/de.svg' },
  { code: 'fr', name: 'French', flag: '/flags/fr.svg' },
  { code: 'it', name: 'Italian', flag: '/flags/it.svg' },
  { code: 'es', name: 'Spanish', flag: '/flags/es.svg' },
  { code: 'pt', name: 'Portuguese', flag: '/flags/pt.svg' },
];

export const LanguageSelector: FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = languages.find(lang => lang.code === router.locale) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: languageCode });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <Image
          src={currentLang.flag}
          alt={`${currentLang.name} flag`}
          width={20}
          height={15}
          className="rounded-sm"
        />
        <span className="hidden md:inline">{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100
                ${language.code === currentLang.code ? 'bg-gray-50' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <Image
                src={language.flag}
                alt={`${language.name} flag`}
                width={20}
                height={15}
                className="rounded-sm mr-3"
              />
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <LanguageSelector />
      <main>{children}</main>
    </div>
  );
};

export default Layout;