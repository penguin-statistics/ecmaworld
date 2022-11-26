import { SiteLanguages, SiteServers } from "./variants";

export type Existence = Record<SiteServers, ExistenceElement>;

export interface ExistenceElement {
  exist: boolean;
  openTime?: number;
  closeTime?: number;
}

export type I18nString = Record<SiteLanguages, string>;
