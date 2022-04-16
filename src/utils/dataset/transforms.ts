import { Matrix } from 'models/matrix'

export function transformMatrixData(matrix: Matrix[]): TransformedMatrix[] {
  return matrix.map((row) => {
    return {
      ...row,
      id: row.stageId + row.itemId,
      percentage: row.quantity / row.times,
    }
  })
}

export interface TransformedMatrix extends Matrix {
  id: string
  percentage: number
}

export interface ItemTransformedMatrix extends TransformedMatrix {
  // stage: Stage
  // zone: Zone
}

export interface StageTransformedMatrix extends TransformedMatrix {
  // item: Item
}
