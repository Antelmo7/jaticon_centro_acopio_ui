import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from '@/contexts/auth'
// import { AuthRoute } from '@/contexts/auth/AuthRoute'
// import { PublicRoute } from '@/contexts/auth/PublicRoute'

import { Layout } from '@/components/layout'

import { Error404 } from '@/components/error404'
import { Home } from './pages/home'
import { DonorForm } from './pages/donor_form'
import { BeneficiaryForm } from './pages/beneficiary_form'
import { DonorHome } from './pages/donor_home'
import { BeneficiaryHome } from './pages/beneficiary_home'

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
            <Route
              path='/donor-form'
              element={(
                <DonorForm />
              )}
            />
            <Route
              path='/beneficiary-form'
              element={(
                <BeneficiaryForm />
              )}
            />
            <Route
              path='/donor-home'
              element={(
                <DonorHome />
              )}
            />
            <Route
              path='/beneficiary-home'
              element={(
                <BeneficiaryHome />
              )}
            />
          </Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export { Router }