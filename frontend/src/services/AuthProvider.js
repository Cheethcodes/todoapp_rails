import Cookies from 'js-cookie'
import { createContext, useContext, useMemo, useState } from 'react'
import useCustomReducer from '../hooks/useCustomReducer'
import SessionReducer from './SessionReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useCustomReducer(SessionReducer, sessionStorage.getItem('loggedIn') === 'true' || false)
    const [user, setUser] = useState({
        id: Cookies.get('user_id') || null,
        username: Cookies.get('user_username') || null,
    })

    const login = async () => {
        const data = await setLoggedIn({
          type: "login",
        })
    }
  
    const value = useMemo(() => ({
        login,
        loggedIn,
        user,
        setUser
    }), [loggedIn])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
  
export const useAuth = () => {
    return useContext(AuthContext)
}
