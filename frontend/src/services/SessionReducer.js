import apiClient from "./api"
import Cookies from 'js-cookie'

export default function SessionReducer(state, action) {
    switch (action.type) {
        case 'login':
            sessionStorage.setItem('loggedIn', 'true')
            return true

        case 'logout':
            apiClient({
                method: 'delete',
                url: '/auth/sign_out'
            }).then(response => {
                sessionStorage.setItem('loggedIn', 'false')
                Cookies.remove('user_id')
                Cookies.remove('user_username')
                Cookies.remove('user_email')
                Cookies.set('token-type')
                Cookies.set('access-token')
                Cookies.set('client')
                Cookies.set('uid')
                Cookies.set('authorization')
            }).catch(error => {
                window.alert('There was an error processing your request!')
            })

            return false

        default:
            return state.items
    }
}
