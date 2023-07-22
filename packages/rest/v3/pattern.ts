export interface PatternResp {
  pattern_matrix: Pattern[]
}

export interface Pattern {
  stageId: string
  pattern: PatternClass
  times: number
  quantity: number
  start: number
  end: number | null
}

export interface PatternClass {
  drops: Drop[]
}

export interface Drop {
  itemId: string
  quantity: number
}
