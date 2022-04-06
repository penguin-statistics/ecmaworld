import useSWR from 'swr'

import { Item } from '../../models/items'

export const useItems = () => {
  return useSWR<Item[]>('/PenguinStats/api/v2/items', {
    suspense: true,
  })
}

export const useItem = (itemId?: string) => {
  const { data, ...rest } = useItems()
  return {
    data: data?.find((item) => item.itemId === itemId),
    ...rest,
  }
}
