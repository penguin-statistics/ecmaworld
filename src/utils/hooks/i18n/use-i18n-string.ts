import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { I18nString } from 'models/common'

export const useI18nString = () => {
  // useI18nString returns a transformer function that transforms the i18n string (an object, with key as locale ID and value as message string) into the current locale.
  // The transformer function is memoized, so it will only be called once per locale.
  // The transformer function is also memoized, so it will only be called once per string.

  const { i18n } = useTranslation()
  const transformer = useMemo(() => {
    return (i18nString: I18nString | undefined) => {
      for (const language of i18n.languages) {
        if (i18nString?.[language]) {
          return i18nString[language]
        }
      }
      return null
    }
  }, [i18n.resolvedLanguage])
  return transformer
}
