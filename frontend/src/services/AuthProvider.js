import Cookies from 'js-cookie'
import { createContext, useContext, useMemo, useState } from 'react'
import useCustomReducer from '../hooks/useCustomReducer'
import SessionReducer from './SessionReducer'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useCustomReducer(SessionReducer, sessionStorage.getItem('loggedIn') === 'true' || false)
    const [loggedInUser, setLoggedInUser] = useState({
        id: Cookies.get('user_id') ? Cookies.get('user_id') : '',
        username: Cookies.get('user_username') ? Cookies.get('user_username') : '',
        email: Cookies.get('user_email') ? Cookies.get('user_email') : '',
    })

    const login = async () => {
        const data = await setLoggedIn({
            type: "login",
        })
    }

    const logout = () => {
        const data = setLoggedIn({
            type: 'logout'
        })

        setLoggedInUser({
            id: null,
            username: null,
        })

        navigate('/')
    }

    const value = useMemo(() => ({
        login,
        loggedIn,
        loggedInUser,
        setLoggedInUser,
        logout,
    }), [loggedIn, loggedInUser])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
