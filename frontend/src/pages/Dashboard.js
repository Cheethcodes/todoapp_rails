import React, { useEffect, useMemo, useState } from 'react'
import CreateTaskModal from '../components/CreateTaskModal'
import TaskModal from '../components/TaskModal'
import TaskView from '../components/TaskView'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

const Dashboard = () => {
    const { loggedIn, loggedInUser, logout } = useAuth()
    const [tasks, setTasks] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editId, setEditId] = useState(0)
    const [editState, setEditState] = useState(false)

    const data = useMemo(() => {
        apiClient({
            method: 'get',
            url: `/api/v1/users/${loggedInUser.id}`,
        }).then(response => {
            setTasks(response.data)
        }).catch(error => {
            window.alert('There was an error processing your request!')
        })

        setEditState(false)
    }, [editState])

    return (
        <div className='py-5 px-10'>
            <div className='flex justify-between items-center'>
                <h4>Welcome, {loggedInUser.username}</h4>
                <button
                    type='button'
                    className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary'
                    style={{ padding: '6px 15px' }}
                    onClick={logout}>
                    LOGOUT
                </button>
            </div>
            <hr className='my-2' />
            <button
                type='button'
                className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary'
                style={{ padding: '6px 15px' }}
                onClick={() => setShowCreateModal(true)}>
                Add Task
            </button>
            <hr className='my-2' />
            <TaskView tasks={tasks} editState={editState} setEditState={setEditState} setEditId={setEditId} setShowModal={setShowEditModal} />
            <CreateTaskModal showModal={showCreateModal} editState={editState} setEditState={setEditState} setShowModal={setShowCreateModal} />
            <TaskModal showModal={showEditModal} setShowModal={setShowEditModal} editId={editId} setEditState={setEditState} />
        </div>
    )
}

export default Dashboard
