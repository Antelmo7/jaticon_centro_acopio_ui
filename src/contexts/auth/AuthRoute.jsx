import { BeneficiaryType, DonorType } from '@/constants/user_type'

import { useAuth } from '@/contexts/auth/useAuth'

import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function AuthRoute({ children }) {
  const auth = useAuth()

  if (!auth.verifiedUser) {
    return null
  }

  if (!auth.user) {
    return <Navigate to='/' />
  }

  if (auth.user.userType === DonorType) {
    return <Navigate to='/donor/' />
  }

  if (auth.user.userType === BeneficiaryType) {
    return <Navigate to='/beneficiary/' />
  }

  return children
}

export { AuthRoute }