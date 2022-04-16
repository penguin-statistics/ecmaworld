import { SiteLanguages, SiteServers } from './i18n'

export type Existence = Record<SiteServers, ExistenceElement>

export interface ExistenceElement {
  exist: boolean
  openTime?: number
  closeTime?: number
}

export type I18nString = Record<SiteLanguages, string>
