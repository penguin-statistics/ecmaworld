import type { Existence, I18nString } from './common'

export interface Item {
  pgItemId: number
  arkItemId: string
  name: I18nString
  existence: Existence
  sortId: number
  rarity: number
  group: ItemGroup
  sprite: string
  alias: ItemAlias
  pron: ItemAlias
}

export type ItemAlias = I18nString

export enum ItemGroup {
  Activity = 'ACTIVITY_ITEM',
  ArkPlanner = 'ARKPLANNER',
  CardExp = 'CARD_EXP',
  Chip = 'CHIP',
  Furniture = 'FURN',
  LggShd = 'LGG_SHD',
  Material = 'MATERIAL',
  Temporary = 'TEMP',
}
