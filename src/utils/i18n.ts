import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('../locales/en/common.json') },
      de: { translation: require('../locales/de/common.json') },
      nl: { translation: require('../locales/nl/common.json') },
      es: { translation: require('../locales/es/common.json') },
      fr: { translation: require('../locales/fr/common.json') },
      it: { translation: require('../locales/it/common.json') }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;