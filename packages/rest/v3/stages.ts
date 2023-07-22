import type { Existence, I18nString } from './common'

export interface Stage {
  pgStageId: number
  arkStageId: string
  zoneId: number
  stageType: StageType
  code: I18nString
  sanity: number
  existence: Existence
  minClearTime: number | null
  dropInfos?: DropInfo[]
  recognitionOnly?: string[]
}

export interface DropInfo {
  itemId?: string
  dropType: DropType
  bounds: Bounds
}

export interface Bounds {
  lower: number
  upper: number
  exceptions?: number[]
}

export enum DropType {
  ExtraDrop = 'EXTRA_DROP',
  Furniture = 'FURNITURE',
  NormalDrop = 'NORMAL_DROP',
  SpecialDrop = 'SPECIAL_DROP',
}

export enum StageType {
  Activity = 'ACTIVITY',
  Daily = 'DAILY',
  Main = 'MAIN',
  Sub = 'SUB',
}
