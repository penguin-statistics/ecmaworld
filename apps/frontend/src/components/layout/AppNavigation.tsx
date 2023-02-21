import mdiMenu from '@iconify/icons-mdi/menu'
import {
  Button,
  ButtonProps,
  IconButton,
  SwipeableDrawer,
  styled,
} from '@mui/material'

import { useState } from 'react'
import { useMatch } from 'react-router-dom'
import { IconifyIcon } from 'src/components/foundational/IconifyIcon'

interface NavigationRouteType {
  name: string
  path: string
}

const NAVIGATION_ROUTES: NavigationRouteType[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Report',
    path: '/about',
  },
]

interface NavigationBarRouteItemButtonProps extends ButtonProps {
  active?: boolean
}

const NavigationBarRouteItemButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<NavigationBarRouteItemButtonProps>(({ theme, active }) => ({
  color: theme.palette.common.white,
  height: '100%',
  display: 'block',
  borderRadius: 0,
  background: active ? theme.palette.action.active : 'transparent',
  '&:hover': {
    background: theme.palette.action.hover,
  },
  '&:focus': {
    background: theme.palette.action.focus,
  },

  padding: theme.spacing(0, 2),
}))

const NavigationBarRouteItem = ({ name, path }: NavigationRouteType) => {
  const match = useMatch(path)
  return (
    <NavigationBarRouteItemButton href={path} active={match !== null}>
      <div className="h-full w-full flex items-center justify-center">
        {name}
      </div>
    </NavigationBarRouteItemButton>
  )
}

const AppNavigationAppBar = () => {
  return (
    <div className="hidden md:flex h-full">
      {NAVIGATION_ROUTES.map((route) => (
        <NavigationBarRouteItem key={route.path} {...route} />
      ))}
    </div>
  )
}

export const AppNavigation = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="flex md:hidden">
        <SwipeableDrawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          classes={{
            paper: 'max-w-[95%] min-w-[20%] w-[16rem]',
          }}
        >
          <div className="flex flex-col gap-2 p-2">
            <div className="flex-1">adsf</div>
          </div>
        </SwipeableDrawer>
        <IconButton onClick={() => setOpen(true)}>
          <IconifyIcon icon={mdiMenu} />
        </IconButton>
      </div>
      <AppNavigationAppBar />
    </>
  )
}
