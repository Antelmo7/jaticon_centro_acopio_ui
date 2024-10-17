import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from '@/contexts/auth'
// import { AuthRoute } from '@/contexts/auth/AuthRoute'
// import { PublicRoute } from '@/contexts/auth/PublicRoute'

import { Layout } from '@/components/layout'

import { Error404 } from '@/components/error404'
import { Home } from './pages/home'

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route element={<Layout />}>
            <Route
              path='/*'
              element={(
                <Error404 />
              )}
            />
            <Route
              path='/'
              element={(
                <Home />
              )}
            />
          </Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export { Router }