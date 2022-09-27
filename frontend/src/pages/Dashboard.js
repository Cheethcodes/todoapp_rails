import React from 'react'
import { useAuth } from '../services/AuthProvider'

const Dashboard = () => {
    const { user } = useAuth()

    return (
        <div>Welcome, {user.username}</div>
    )
}

export default Dashboard
