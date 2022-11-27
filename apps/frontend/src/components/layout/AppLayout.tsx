import { AppBar, Toolbar } from '@mui/material'

import { Outlet } from 'react-router-dom'

import logo from '../../assets/logo.png?url'
import { LanguageSettings } from '../settings/LanguageSettings'
import { ServerSettings } from '../settings/ServerSettings'

export const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <AppBar className="flex gap-2 justify-center">
        <Toolbar>
          <img src={logo} className="w-8 h-8" alt="logo" />
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
