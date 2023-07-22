import { Trend } from './trends'

export interface StageAggregatedDatasetResp {
  matrix: Matrix[]
  trends: Record<string, Trend>
  patterns: Pattern[]
}

export interface ItemAggregatedDatasetResp {
  matrix: Matrix[]
  trends: Record<string, Trend>
}

export interface Matrix {
  stageId: string
  itemId: string
  times: number
  quantity: number
  start: number
  end: number | null
}

export interface Pattern {
  stageId: string
  pattern: PatternPattern
  times: number
  quantity: number
  start: number
  end: number | null
}

export interface PatternPattern {
  patternId: number
  drops: Drop[]
}

export interface Drop {
  itemId: string
  quantity: number
}
