import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { BeneficiaryType, DonorType } from '@/constants/user_type'

// eslint-disable-next-line react/prop-types
function PublicRoute({ children }) {
  const auth = useAuth()

  if (!auth.verifiedUser) {
    return null
  }

  if (auth.user) {
    if (auth.user.userType === DonorType) {
      return <Navigate to='/donor/' />
    }

    if (auth.user.userType === BeneficiaryType) {
      return <Navigate to='/beneficiary/' />
    }

    return <Navigate to='/' />
  }

  return children
}

export { PublicRoute }