import { Existence, I18nString } from './common'

export interface Zone {
  pgZoneId: number
  arkZoneId: string
  index: number
  category: StageCategory
  type: string | null
  name: I18nString
  existence: Existence
  background: string | null
}

export enum StageCategory {
  Activity = 'ACTIVITY',
  ActivityPermanent = 'ACTIVITY_PERMANENT',
  Gachabox = 'GACHABOX',
  Mainline = 'MAINLINE',
  Weekly = 'WEEKLY',
}
