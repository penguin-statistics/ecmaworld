import { useMemo } from 'react'
import useSWR from 'swr'

import { InitResponse } from 'models/init'
import { Zone } from 'models/zones'

export const useZones = () => {
  const { data, ...rest } = useSWR<InitResponse>('/api/v3-alpha/init', {
    suspense: true,
  })
  return {
    data: data?.zones,
    ...rest,
  }
}

export const useZone = (zoneId?: string) => {
  const { data, ...rest } = useZones()
  const map = useMemo(() => {
    const map = new Map<string, Zone>()
    data?.forEach((zone) => {
      map.set(zone.arkZoneId, zone)
    })
    return map
  }, [data])

  return {
    data: zoneId ? map.get(zoneId) : undefined,
    ...rest,
  }
}
