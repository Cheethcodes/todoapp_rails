import React from 'react'
import TaskView from '../components/TaskView'
import { useAuth } from '../services/AuthProvider'

const Dashboard = () => {
    const { loggedInUser } = useAuth()

    return (
        <div>
            Welcome, {loggedInUser.username}
            <hr/>
            <TaskView userId={loggedInUser.id} />
        </div>
    )
}

export default Dashboard
