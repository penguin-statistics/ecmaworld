export interface MatrixResp {
  matrix: Matrix[]
}

export interface Matrix {
  stageId: string
  itemId: string
  times: number
  quantity: number
  start: number
  end: number | null
}
