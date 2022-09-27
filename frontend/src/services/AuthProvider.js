import { createContext, useContext, useMemo } from 'react'
import useCustomReducer from '../hooks/useCustomReducer'
import SessionReducer from './SessionReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useCustomReducer(SessionReducer, sessionStorage.getItem('loggedIn') === 'true' || false)

    const login = async () => {
        const data = await setLoggedIn({
          type: "login",
        })
    }
  
    const value = useMemo(() => ({
        login,
        loggedIn,
    }), [loggedIn])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
  
export const useAuth = () => {
    return useContext(AuthContext)
}
