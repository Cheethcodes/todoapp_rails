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
                url: '/api/v1/logout'
            }).then(response => {
                sessionStorage.setItem('loggedIn', 'false')
                Cookies.remove('user_id')
                Cookies.remove('user_username')
            }).catch(error => {
                console.log(error)
            })

            return false

        default:
            return state.items
    }
}
