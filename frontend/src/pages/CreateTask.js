import React, { useState } from 'react'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'
import useDatetime from '../hooks/useDatetime'
import moment from 'moment'

const CreateTask = () => {
    const { loggedInUser } = useAuth()
    const [timezone, setTimezone] = useState('')
    const [task, setTask] = useState({
        name: '',
        description: '',
        schedule: ''
    })
    const getTimezone = useDatetime(setTimezone)

    const handleOnChange = (e) => {
        if (e.target.id === 'schedule') {
            setTask({
                ...task,
                schedule: e.target.value.toString() + ':00.000' + timezone
            })
            return
        }

        setTask({
            ...task,
            [e.target.id]: e.target.value.toString()
        })
    }

    const saveTask = (e) => {
        e.preventDefault()

        if (window.confirm('Are you sure you want to save this task?')) {
            apiClient({
                method: 'post',
                url: '/api/v1/tasks',
                data: {
                    task: {
                        name: task.name,
                        description: task.description,
                        schedule: task.schedule + ':00.000',
                        user_id: loggedInUser.id
                    }
                }
            }).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        }
    }

    return (
        <div className='grid grid-cols-2'>
            <form onSubmit={saveTask}>
                <div>
                    <label>Title</label>
                    <input
                        type='text'
                        id='name'
                        onChange={handleOnChange}
                        value={task.name} />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type='text'
                        id='description'
                        onChange={handleOnChange}
                        value={task.description} />
                </div>
                <div>
                    <label>Schedule</label>
                    <input
                        type='datetime-local'
                        id='schedule'
                        onChange={handleOnChange}
                        value={
                            moment(
                                task.schedule.replace(/.000/g, '').substring(0, (task.schedule.replace(/.000/g, '')).lastIndexOf(':00')))
                                .format('YYYY-MM-DDTHH:mm')
                            
                        } />
                </div>
                <input type='submit' value='Save' />
            </form>
        </div>
    )
}

export default CreateTask
