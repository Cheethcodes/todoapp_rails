import React, { useEffect } from 'react'
import TaskView from '../components/TaskView'
import { useAuth } from '../services/AuthProvider'

const Dashboard = () => {
    const { loggedIn, loggedInUser, logout } = useAuth()
    
    useEffect(() => {
        console.log(loggedIn)
    }, [])

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h4>Welcome, {loggedInUser.username}</h4>
                <button type='button' onClick={logout}>Logout</button>
            </div>
            <hr />
            <TaskView userId={loggedInUser.id} />
        </div>
    )
}

export default Dashboard
