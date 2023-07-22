import { store } from '@exusiai/coredata/store'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { appRootElement } from './config'
import { Router } from './routes'
import { AppThemeProvider } from './theme'

import './index.css'

createRoot(appRootElement).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AppThemeProvider>
        <Provider store={store}>
          <CssBaseline />
          <Router />
        </Provider>
      </AppThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
