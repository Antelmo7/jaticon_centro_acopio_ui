import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from '@/contexts/auth'
import { AuthRoute } from '@/contexts/auth/AuthRoute'
import { PublicRoute } from '@/contexts/auth/PublicRoute'

import { Layout } from '@/components/layout'

import { Error404 } from '@/components/error404'
import { Home } from './pages/home'
import { DonorHome } from './pages/donor_home'
import { BeneficiaryHome } from './pages/beneficiary_home'
import { BeneficiaryRoute } from './contexts/auth/BeneficiaryRoute'
import { DonorRoute } from './contexts/auth/DonorRoute'

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
                <PublicRoute>
                  <Home />
                </PublicRoute>
              )}
            />
            <Route
              path='/donor'
              element={(
                <AuthRoute>
                  <DonorRoute>
                    <DonorHome />
                  </DonorRoute>
                </AuthRoute>
              )}
            />
            <Route
              path='/beneficiary'
              element={(
                <AuthRoute>
                  <BeneficiaryRoute>
                    <BeneficiaryHome />
                  </BeneficiaryRoute>
                </AuthRoute>
              )}
            />
          </Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export { Router }