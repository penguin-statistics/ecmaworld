import { store } from '@exusiai-dev/coredata/store'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { appRootElement } from './config'
import { Router } from './routes'
import { AppThemeProvider } from './theme'

import './index.css'

ReactDOM.createRoot(appRootElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AppThemeProvider>
        <Provider store={store}>
          <CssBaseline />
          <Router />
        </Provider>
      </AppThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
