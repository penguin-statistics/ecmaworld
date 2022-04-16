import { lazy } from 'react'

export const routes = {
  '/': lazy(() => import('./pages/index') as any),
  '/live': lazy(() => import('./pages/live') as any),

  '/result/items': lazy(() => import('./pages/items/index') as any),
  '/result/items/:itemId': lazy(
    () => import('./pages/items/[itemId]/index') as any,
  ),
  '/result/stages': lazy(() => import('./pages/stages/index') as any),
  '/result/stages/:stageId': lazy(
    () => import('./pages/stages/[stageId]/index') as any,
  ),
}
