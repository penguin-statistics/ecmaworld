import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { i18nResources } from '_i18n'

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// eslint-disable-next-line import/no-named-as-default-member
i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: i18nResources,

    fallbackLng: 'en',
    debug: true,
    load: 'languageOnly',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
