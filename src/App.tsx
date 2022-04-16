import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SWRConfig } from 'swr'

import { AppLayout } from './components/layouts/AppLayout/index'
import { routes } from './routes'
import { theme } from './theme'
import { fetcher } from './utils/fetcher'

import './App.css'

const AppRoot = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <Suspense fallback={<div>Loading app...</div>}>
            <SWRConfig
              value={{
                suspense: true,
                refreshInterval: 0,
                focusThrottleInterval: 1000 * 60 * 60, // at most refresh once per hour
                fetcher: (resource, init) => {
                  return fetcher(resource, init).then((r) => r.data)
                },
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {Object.entries(routes).map(([path, Component]) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <Suspense fallback={<div>Loading route {path}...</div>}>
                          <Component />
                        </Suspense>
                      }
                    />
                  ))}
                </Routes>
              </Suspense>
            </SWRConfig>
          </Suspense>
        </AppLayout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default AppRoot
