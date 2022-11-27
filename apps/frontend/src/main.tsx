import { store } from '@exusiai-dev/coredata/store'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { AppLayout } from './components/layout/AppLayout'
import { appRootElement } from './config'
import { theme } from './theme'

import './index.css'

ReactDOM.createRoot(appRootElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <AppLayout />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
