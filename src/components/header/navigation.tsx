import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface NavItem {
  href: string;
  label: string;
  key: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'nav.jobMatch', key: 'jobMatch' },
  { href: '/upgrade', label: 'nav.upgrade', key: 'upgrade' },
  { href: '/faq', label: 'nav.faq', key: 'faq' },
];

export const Navigation: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map(({ href, label, key }) => (
        <Link
          key={key}
          href={href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${
              router.pathname === href
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          aria-current={router.pathname === href ? 'page' : undefined}
        >
          {t(label)}
        </Link>
      ))}
    </nav>
  );
};

// Optional: Mobile Navigation component for responsive design
export const MobileNavigation: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
        aria-expanded={isOpen}
      >
        <span className="sr-only">
          {isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        </span>
        <svg
          className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
          {navItems.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                router.pathname === href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {t(label)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};