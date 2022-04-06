import useSWR from 'swr'

import { Stage } from '../../models/stages'

export const useStages = () => {
  return useSWR<Stage[]>('/PenguinStats/api/v2/stages', {
    suspense: true,
  })
}

export const useStage = (stageId?: string) => {
  const { data, ...rest } = useStages()
  return {
    data: data?.find((item) => item.stageId === stageId),
    ...rest,
  }
}

export const useStageByZone = (zoneId?: string) => {
  const { data, ...rest } = useStages()
  return {
    data: data?.filter((item) => item.zoneId === zoneId),
    ...rest,
  }
}
