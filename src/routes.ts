import { lazy } from 'react'

export const routes = {
  '/': lazy(() => import('./pages/index') as any),
  '/live': lazy(() => import('./pages/live') as any),

  '/items': lazy(() => import('./pages/items/index') as any),
  '/items/:itemId': lazy(() => import('./pages/items/[itemId]/index') as any),
  '/stages': lazy(() => import('./pages/stages/index') as any),
  '/stages/:stageId': lazy(
    () => import('./pages/stages/[stageId]/index') as any,
  ),
}
