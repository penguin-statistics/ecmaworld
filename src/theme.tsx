import '@fontsource/roboto'
import { indigo, teal } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

import { forwardRef } from 'react'
import { Link, LinkProps } from 'react-router-dom'

const LinkBehavior = forwardRef<
  any,
  Omit<LinkProps, 'to'> & { href: LinkProps['to'] }
>(function LinkBehavior(props, ref) {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <Link ref={ref} to={href} {...other} />
})

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: teal['A400'],
    },
  },
  typography: {
    fontFamily: [
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, .08)',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        // @ts-ignore
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
})
