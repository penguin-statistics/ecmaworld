import { AppBar, Toolbar } from '@mui/material'

import { Outlet } from 'react-router-dom'
import { AppNavigation } from 'src/components/layout/AppNavigation'
import AppearanceSettings from 'src/components/settings/AppearanceSettings'

import logo from '../../assets/logo.png?url'
import { LanguageSettings } from '../settings/LanguageSettings'
import { ServerSettings } from '../settings/ServerSettings'

export const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <AppBar position="sticky" className="flex gap-2 justify-center">
        <Toolbar className="flex gap-2 items-center relative h-[56px] min-h-0">
          <img src={logo} className="w-8 h-8" alt="logo" />
          <AppNavigation />
          <div className="flex-1" />
          <AppearanceSettings />
          <ServerSettings />
          <LanguageSettings />
        </Toolbar>
      </AppBar>

      <div className="card">
        <Outlet />
      </div>
    </div>
  )
}
