import useSWR from 'swr'

import { MatrixResp } from 'models/matrix'

export const useMatrix = () => {
  const { data, ...rest } = useSWR<MatrixResp>(
    '/PenguinStats/api/v2/_private/result/matrix/CN/global',
    {
      suspense: true,
    },
  )
  return {
    data: data?.matrix,
    ...rest,
  }
}

export const useMatrixByItem = (itemId?: string) => {
  const { data, ...rest } = useSWR<MatrixResp>(
    '/api/v3-alpha/dataset/aggregated/global/CN/item/' + itemId,
    {
      suspense: true,
    },
  )
  return {
    data: data?.matrix,
    ...rest,
  }
}

export const useMatrixByStage = (stageId?: string) => {
  const { data, ...rest } = useSWR<MatrixResp>(
    '/api/v3-alpha/dataset/aggregated/global/CN/stage/' + stageId,
    {
      suspense: true,
    },
  )
  return {
    data: data?.matrix,
    ...rest,
  }
}
