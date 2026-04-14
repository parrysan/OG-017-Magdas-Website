import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/o-nas': {
      pl: '/o-nas',
      en: '/about',
    },
    '/oferty': {
      pl: '/oferty',
      en: '/opportunities',
    },
    '/kontakt': {
      pl: '/kontakt',
      en: '/contact',
    },
  },
});
