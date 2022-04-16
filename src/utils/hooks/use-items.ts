import { useMemo } from 'react'
import useSWR from 'swr'

import { InitResponse } from 'models/init'
import { Item } from 'models/items'

export const useItems = () => {
  const { data, ...rest } = useSWR<InitResponse>('/api/v3-alpha/init', {
    suspense: true,
  })
  return {
    data: data?.items,
    ...rest,
  }
}

export const useItem = (itemId?: string) => {
  const { data, ...rest } = useItems()
  const map = useMemo(() => {
    const map = new Map<string, Item>()
    data?.forEach((item) => {
      map.set(item.arkItemId, item)
    })
    return map
  }, [data])

  return {
    data: itemId ? map.get(itemId) : undefined,
    ...rest,
  }
}
