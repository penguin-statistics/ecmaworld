import { Atom, atom } from 'jotai'

import { Item } from 'models/items'

export const atomItems: Atom<Item[]> = atom([])
