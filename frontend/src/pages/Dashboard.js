import React, { useEffect, useState } from 'react'
import { useAuth } from '../services/AuthProvider'

const Dashboard = () => {
    const { loggedInUser } = useAuth()

    return (
        <div>
            Welcome, {loggedInUser.username + ' id: ' + loggedInUser.id}
        </div>
    )
}

export default Dashboard
