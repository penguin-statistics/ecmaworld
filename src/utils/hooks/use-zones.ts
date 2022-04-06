import useSWR from 'swr'

import { Zone } from '../../models/zones'

export const useZones = () => {
  return useSWR<Zone[]>('/PenguinStats/api/v2/zones', {
    suspense: true,
  })
}

export const useZone = (zoneId?: string) => {
  const { data, ...rest } = useZones()
  return {
    data: data?.find((item) => item.zoneId === zoneId),
    ...rest,
  }
}
