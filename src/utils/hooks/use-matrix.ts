import useSWR from 'swr'

import { MatrixResp } from '../../models/matrix'

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
  const { data, ...rest } = useMatrix()
  return {
    data: data?.filter((item) => item.itemId === itemId),
    ...rest,
  }
}

export const useMatrixByStage = (stageId?: string) => {
  const { data, ...rest } = useMatrix()
  return {
    data: data?.filter((item) => item.stageId === stageId),
    ...rest,
  }
}
