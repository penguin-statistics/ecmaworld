export interface TrendResp {
  trends: Record<string, Trend>
}

export interface Trend {
  results: Record<string, TrendResult>
  startTime: number
}

export interface TrendResult {
  quantity: number[]
  items: number[]
}
