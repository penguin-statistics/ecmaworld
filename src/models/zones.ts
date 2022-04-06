export interface Zone {
  zoneId: string
  zoneIndex: number
  type: Type
  subType: null | string
  zoneName: ZoneNameI18N
  existence: Existence
  background: null | string
  stages: string[]
}

export interface Existence {
  CN: CN
  JP: CN
  KR: CN
  US: CN
}

export interface CN {
  exist: boolean
  openTime?: number
  closeTime?: number
}

export enum Type {
  Activity = 'ACTIVITY',
  ActivityPermanent = 'ACTIVITY_PERMANENT',
  Gachabox = 'GACHABOX',
  Mainline = 'MAINLINE',
  Weekly = 'WEEKLY',
}

export interface ZoneNameI18N {
  en: string
  ja: string
  ko: string
  zh: string
}
