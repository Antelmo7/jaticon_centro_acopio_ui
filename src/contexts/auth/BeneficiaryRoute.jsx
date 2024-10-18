import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { BeneficiaryType } from '@/constants/user_type'

// eslint-disable-next-line react/prop-types
function BeneficiaryRoute({ children }) {
  const auth = useAuth()

  if (!auth.verifiedUser) {
    // Esperar hasta que el usuario haya sido verificado antes de tomar una decisión
    return null // o algún indicador de carga si es necesario
  }

  if (auth.user.userType != BeneficiaryType) {
    return <Navigate to='/donor/' />
  }

  return children
}

export { BeneficiaryRoute }