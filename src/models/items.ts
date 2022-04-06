import type { Existence, I18nString } from './common'

export interface Item {
  itemId: string
  name: I18nString
  existence: Existence
  itemType: ItemType
  sortId: number
  rarity: number
  groupID: null | string
  spriteCoord?: number[]
  alias: Alias
  pron: Alias
}

export interface Alias {
  ja?: string[]
  zh: string[]
}

export enum ItemType {
  ActivityItem = 'ACTIVITY_ITEM',
  Arkplanner = 'ARKPLANNER',
  CardExp = 'CARD_EXP',
  Chip = 'CHIP',
  Furn = 'FURN',
  LggShd = 'LGG_SHD',
  Material = 'MATERIAL',
  Temp = 'TEMP',
}
