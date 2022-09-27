export default function SessionReducer(state, action) {
    switch (action.type) {
        case 'login':
            sessionStorage.setItem('loggedIn', true)

            return [
                {
                    loggedIn: true,
                }
            ]
            
        default:
            return state.items
    }
}
