import Cookies from 'js-cookie'
import { createContext, useContext, useMemo, useState } from 'react'
import useCustomReducer from '../hooks/useCustomReducer'
import SessionReducer from './SessionReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useCustomReducer(SessionReducer, sessionStorage.getItem('loggedIn') === 'true' || false)
    const [loggedInUser, setLoggedInUser] = useState({
        id: Cookies.get('user_id') || null,
        username: Cookies.get('user_username') || null,
    })

    const login = () => {
        const data = setLoggedIn({
            type: "login",
        })
    }

    const value = useMemo(() => ({
        login,
        loggedIn,
        loggedInUser,
        setLoggedInUser
    }), [loggedIn])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
