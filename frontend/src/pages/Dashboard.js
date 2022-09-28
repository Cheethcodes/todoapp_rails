import React, { useEffect, useState } from 'react'
import TaskModal from '../components/TaskModal'
import TaskView from '../components/TaskView'
import { useAuth } from '../services/AuthProvider'

const Dashboard = () => {
    const { loggedIn, loggedInUser, logout } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [editId, setEditId] = useState(0)
    const [editState, setEditState] = useState(false)
    
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
            <TaskView userId={loggedInUser.id} editState={editState} setEditId={setEditId} setShowModal={setShowModal} />
            <TaskModal showModal={showModal} setShowModal={setShowModal} editId={editId} setEditState={setEditState} />
        </div>
    )
}

export default Dashboard
