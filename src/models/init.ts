import { Item } from './items'
import { Stage } from './stages'
import { Zone } from './zones'

export interface InitResponse {
  zones: Zone[]
  items: Item[]
  stages: Stage[]
}
