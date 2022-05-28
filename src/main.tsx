import React from 'react'
import ReactDOM from 'react-dom/client'

import AppRoot from './App'
import './utils/i18n'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
)
