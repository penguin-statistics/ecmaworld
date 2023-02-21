import type { FC, ReactNode } from 'react'

type KV = Record<string, unknown>

export type WithChildren<T> = T & { children?: ReactNode }
export type FCC<T extends KV = KV> = FC<WithChildren<T>>
