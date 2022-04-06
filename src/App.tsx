import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'
import { SWRConfig } from 'swr'

import { ErrorBoundary } from './components/foundational/ErrorBoundary'
import { routes } from './routes'
import { fetcher } from './utils/fetcher'

import './App.css'

function App() {
  const { i18n } = useTranslation()
  console.log(routes)
  return (
    <Suspense fallback={<div>Loading app...</div>}>
      <div className="App">
        <h4>Penguin Statistics</h4>
        <h2>SWR Demo</h2>

        <FormControl>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            size="small"
            label="Language"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="zh">中文</MenuItem>
            <MenuItem value="ja">日本語</MenuItem>
            <MenuItem value="ko">한국어</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />
        <SWRConfig
          value={{
            suspense: true,
            refreshInterval: 0,
            focusThrottleInterval: 1000 * 60 * 60, // at most refresh once per hour
            fetcher: (resource, init) => {
              const r = fetcher(resource, init).then((r) => r.data)
              console.log(r)
              return r
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
                      <ErrorBoundary>
                        <Component />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </SWRConfig>
      </div>
    </Suspense>
  )
}

export default App
