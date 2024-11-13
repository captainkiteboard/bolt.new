const path = require('path');


module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'nl', 'de', 'fr', 'it', 'es', 'pt'],
    },
    localePath: path.resolve('./src/locales'),
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  };