import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '/flags/en.png' },
  { code: 'nl', name: 'Nederlands', flag: '/flags/nl.png' },
  { code: 'de', name: 'Deutsch', flag: '/flags/de.png' },
  { code: 'fr', name: 'Français', flag: '/flags/fr.png' },
  { code: 'it', name: 'Italiano', flag: '/flags/it.png' },
  { code: 'es', name: 'Español', flag: '/flags/es.png' },
  { code: 'pt', name: 'Português', flag: '/flags/pt.png' },
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
    <div className="fixed top-4 right-4 z-50">
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white shadow-md hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <Image
          src={currentLang.flag}
          alt={`${currentLang.name} flag`}
          width={24}
          height={16}
          className="rounded-sm"
        />
        <span className="hidden md:inline text-sm font-medium">{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50
                ${language.code === currentLang.code ? 'bg-gray-50' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <Image
                src={language.flag}
                alt={`${language.name} flag`}
                width={24}
                height={16}
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