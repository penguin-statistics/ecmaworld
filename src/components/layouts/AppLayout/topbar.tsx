import { AccountCircle } from '@mui/icons-material'
import {
  AppBar,
  Button,
  ButtonProps,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material'

// import { styled } from '@mui/system'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { animated, config, useSpring } from 'react-spring'

import logo from 'assets/logo.png'
import { Spacer } from 'components/foundational/Spacer'

import { SwitchLanguage } from './SwitchLanguage'

import styles from './topbar.module.css'

const navigationLinks = [
  {
    label: 'home',
    to: '/',
  },
  {
    label: 'report',
    to: '/report',
  },
  {
    label: 'result.stages',
    to: '/result/stages',
  },
  {
    label: 'result.items',
    to: '/result/items',
  },
]

interface LinkButtonProps extends Omit<ButtonProps, 'sx'> {
  active?: boolean
}

// const BarLinkButtonInner = styled(Button, {
//   shouldForwardProp: (prop) => prop !== 'active',
// })<LinkButtonProps>(({ active, theme }) => ({
//   textTransform: 'none',
//   color: theme.palette.primary.contrastText,
//   padding: '0.5rem 1rem',
//   whiteSpace: 'nowrap',
//   marginLeft: '.5rem',
//   transition: 'background 70ms ease-out, box-shadow 70ms ease-out',
//   background: `${theme.palette.grey[500]}11`,
//   '&:hover': {
//     background: `${theme.palette.grey[500]}44`,
//     boxShadow: (theme.shadows as string[])[24],
//   },
//   '&:active': {
//     background: `${theme.palette.grey[800]}44`,
//     boxShadow: (theme.shadows as string[])[1],
//   },
//   ...(active && {
//     // the overrides added when the new prop is used
//     background: `${theme.palette.primary.main} !important`,
//     color: theme.palette.primary.contrastText,
//     pointer: 'default',
//     '&:hover': {
//       background: theme.palette.primary.dark,
//     },
//   }),
// }))

const BarLinkButton = ({ active, ...props }: LinkButtonProps) => {
  const [hovered, setHovered] = useState(false)
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: hovered ? 1.1 : 1,
    config: config.stiff,
  }))
  const AnimatedBarLinkButtonInner = animated(Button)
  return (
    <AnimatedBarLinkButtonInner
      // active={active}
      {...props}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const ratio = 0.05
        const x = (e.clientX - rect.left - rect.width / 2) * ratio
        const y = (e.clientY - rect.top - rect.height / 2) * ratio
        api.start({ x, y })
        setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
        api.start({ x: 0, y: 0 })
      }}
    />
  )
}

export default function AppLayoutTopBar() {
  const { t } = useTranslation(['pages'])
  const [auth] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const location = useLocation()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" className={styles.topbar}>
      <Toolbar sx={{ overflowX: 'auto' }}>
        <img src={logo} alt="logo" style={{ width: '1.5rem' }} />
        <div className={styles.navigations}>
          {navigationLinks.map((link) => {
            const name = t(`pages:${link.label}.title`)
            return (
              <BarLinkButton
                variant="text"
                key={link.label}
                href={link.to}
                title={name}
                classes={{
                  root: clsx(styles.navigation),
                }}
                active={link.to === location.pathname}
              >
                {name}
              </BarLinkButton>
            )
          })}
        </div>
        <Spacer />
        <SwitchLanguage />
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}
