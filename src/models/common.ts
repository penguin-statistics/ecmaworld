export interface Existence {
  CN: ServerExistence
  US: ServerExistence
  JP: ServerExistence
  KR: ServerExistence
}

export interface ServerExistence {
  exist: boolean
  openTime?: number
  closeTime?: number
}

export interface I18nString {
  zh: string
  en: string
  ja: string
  ko: string
}
