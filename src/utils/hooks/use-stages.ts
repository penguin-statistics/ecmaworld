import { useMemo } from 'react'
import useSWR from 'swr'

import { InitResponse } from 'models/init'
import { Stage } from 'models/stages'

import { useZone } from './use-zones'

export const useStages = () => {
  const { data, ...rest } = useSWR<InitResponse>('/api/v3-alpha/init', {
    suspense: true,
  })
  return {
    data: data?.stages,
    ...rest,
  }
}

export const useStage = (stageId?: string) => {
  const { data, ...rest } = useStages()
  const map = useMemo(() => {
    const map = new Map<string, Stage>()
    data?.forEach((stage) => {
      map.set(stage.arkStageId, stage)
    })
    return map
  }, [data])

  return {
    data: stageId ? map.get(stageId) : undefined,
    ...rest,
  }
}

export const useStageByZone = (zoneId?: string) => {
  const zone = useZone(zoneId)
  const { data, ...rest } = useStages()
  return {
    data: data?.filter((item) => item.zoneId === zone?.data?.pgZoneId),
    ...rest,
  }
}
