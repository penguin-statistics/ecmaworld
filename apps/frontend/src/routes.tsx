import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/Home'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
