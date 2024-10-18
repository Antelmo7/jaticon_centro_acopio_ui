import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { DonorType } from '@/constants/user_type'

// eslint-disable-next-line react/prop-types
function DonorRoute({ children }) {
  const auth = useAuth()

  if (!auth.verifiedUser) {
    // Esperar hasta que el usuario haya sido verificado antes de tomar una decisión
    return null // o algún indicador de carga si es necesario
  }

  if (auth.user.userType != DonorType) {
    return <Navigate to='/beneficiary/' />
  }

  return children
}

export { DonorRoute }