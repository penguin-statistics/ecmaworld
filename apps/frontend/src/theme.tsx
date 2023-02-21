import { palette } from '@exusiai-dev/design/index'
import {
  PaletteMode,
  ThemeProvider,
  createTheme,
  useTheme,
} from '@mui/material'
import { LinkProps } from '@mui/material/Link'

import { createContext, forwardRef, useContext, useMemo, useState } from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

import { appRootElement } from './config'
import { FCC } from './types'

import './index.css'

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})

LinkBehavior.displayName = 'LinkBehavior'

const createCustomizedTheme = (mode: PaletteMode) =>
  createTheme({
    components: {
      MuiPopover: {
        defaultProps: {
          container: appRootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: appRootElement,
        },
      },
      MuiModal: {
        defaultProps: {
          container: appRootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: appRootElement,
        },
      },
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
    palette: {
      ...palette,
      mode,
    },
  })

type PaletteModeContextType = { setPaletteMode: (mode: PaletteMode) => void }

export const PaletteModeContext = createContext<PaletteModeContextType>({
  setPaletteMode: () => {
    console.error('PaletteModeContext not initialized')
  },
})

const DARK_THEME = createCustomizedTheme('dark')
const LIGHT_THEME = createCustomizedTheme('light')

export const AppThemeProvider: FCC = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const paletteMode = useMemo(
    () =>
      ({
        setPaletteMode: (mode: PaletteMode) => {
          setMode(mode)
        },
      } as PaletteModeContextType),
    [],
  )

  return (
    <PaletteModeContext.Provider value={paletteMode}>
      <AppPaletteThemeProvider mode={mode}>{children}</AppPaletteThemeProvider>
    </PaletteModeContext.Provider>
  )
}

export const AppPaletteThemeProvider: FCC<{ mode: PaletteMode }> = ({
  children,
  mode,
}) => {
  const theme = useMemo(
    () => (mode === 'light' ? LIGHT_THEME : DARK_THEME),
    [mode],
  )
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export const useAppAppearance = () => {
  const theme = useTheme()
  const { setPaletteMode } = useContext(PaletteModeContext)
  return [theme.palette.mode, setPaletteMode] as const
}
