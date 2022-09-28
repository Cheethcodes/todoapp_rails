import moment from 'moment'
import React, { useMemo, useState } from 'react'
import useDatetime from '../hooks/useDatetime'
import apiClient from '../services/api'

const TaskModal = ({ showModal, setShowModal, editId, setEditState }) => {
    const [task, setTask] = useState({
        name: '',
        description: '',
        schedule: '',
        checked: 0
    })
    const [timezone, setTimezone] = useState('')
    const getTimezone = useDatetime(setTimezone)

    const data = useMemo(() => {
        if (!editId || editId === '' || editId === null) {
            return
        }

        apiClient({
            method: 'get',
            url: `/api/v1/tasks/${editId}/edit`
        }).then(response => {
            setTask(response.data)
        }).catch(error => {
            console.log(error.response)
        })
    }, [editId])

    const handleOnChange = (e) => {
        if (e.target.id === 'schedule') {
            setTask({
                ...task,
                schedule: e.target.value.toString() + ':00.000' + timezone
            })

            return
        }

        if (e.target.id === 'is_finished') {
            setTask({
                ...task,
                is_finished: e.target.checked ? 1 : 0
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

        if (!window.confirm('Are you sure you want to save task?')) {
            return
        }

        apiClient({
            method: 'patch',
            url: `/api/v1/tasks/${editId}`,
            data: {
                task: task
            }
        }).then(response => {
            window.alert('Successfully edited tasks!')
            setEditState(true)
            setShowModal(false)
        }).catch(error => {
            console.log(error.response)
        })
    }

    return (
        <div style={{ display: `${showModal ? 'block' : 'none'}`, background: '#9797978a', width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', zIndex: '10', backdropFilter: 'blur(3px)' }}>
            {
                !editId || editId === '' || editId === null ?
                    <></>
                    :
                    <div style={{ background: 'white', width: '50vw', height: '50vh', maxWidth: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px 30px' }}>
                        <button type='button' onClick={() => setShowModal(false)}>X</button>
                        <hr/>
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
                            <div>
                                <label>Finished</label>
                                <input
                                    type='checkbox'
                                    id='is_finished'
                                    onChange={handleOnChange}
                                    checked={task.is_finished === 1 ? true : false} />
                            </div>
                            <input type='submit' value='Save' />
                        </form>
                    </div>
            }
        </div>
    )
}

export default TaskModal
