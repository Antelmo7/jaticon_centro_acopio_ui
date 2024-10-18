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

  return children
}

export { AuthRoute }