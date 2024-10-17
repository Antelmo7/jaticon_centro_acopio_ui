import { UserKey } from '@/constants/local_storage'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [verifiedUser, setVerifiedUser] = useState(false)
  
  useEffect(() => {
    const userLocalStorage = localStorage.getItem(UserKey)

    if (userLocalStorage) {
      try {
        setUser(JSON.parse(userLocalStorage))
        setVerifiedUser(true)
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error)
        navigate('/')
      }
    } else {
      setUser(undefined)
      setVerifiedUser(true)
    }
  }, [navigate])

  const signIn = async (userValue) => {
    localStorage.setItem(UserKey, JSON.stringify(userValue))
    setUser(userValue)
    setVerifiedUser(true)
  }

  const logout = async () => {
    // await authUseCase.signOut()

    localStorage.removeItem(UserKey)
    setUser(undefined)
    setVerifiedUser(false)
    navigate('/')
  }

  const auth = {
    user,
    setUser,
    signIn,
    logout,
    verifiedUser
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }