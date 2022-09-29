import React from 'react'
import apiClient from '../services/api'
import moment from 'moment'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'

const TaskView = ({ tasks, setEditState, setEditId, setShowModal }) => {
    const handleDeleteTask = (id) => {
        if (!window.confirm('Are you sure you want to delete the task?')) {
            return
        }

        apiClient({
            method: 'delete',
            url: `/api/v1/tasks/${id}`
        }).then(response => {
            window.alert('Successfully deleted task!')
            setEditState(true)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className='grid grid-cols-5 gap-2'>
            {
                tasks &&
                tasks.map((task, index) => {
                    var schedule = task.schedule.replace(/.000/g, '')
                    schedule = schedule.substring(0, schedule.lastIndexOf(':00'))

                    return (
                        <React.Fragment key={index}>
                            <div className={`task-card flex flex-col p-5 rounded ${task.is_finished ? 'bg-green-100' : 'bg-red-100'}`}>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <h4 className='font-medium'>{task.name}</h4>
                                        <small className='font-light' style={{fontSize: '10px'}}>
                                            {moment(schedule).format('LL')} | {('0' + moment(schedule).format('LT')).slice(-8)}
                                        </small>
                                    </div>
                                    <div className='flex gap-1'>
                                        <button
                                            type='button'
                                            className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary'
                                            style={{ padding: '5px' }}
                                            onClick={() => {
                                                setEditId(task.id)
                                                setShowModal(true)
                                            }}>
                                            <FaPenAlt />
                                        </button>
                                        <button
                                            type='button'
                                            className='bg-red-600 hover:bg-transparent text-white hover:text-red-600 border border-red-600'
                                            style={{ padding: '5px' }}
                                            onClick={() => handleDeleteTask(task.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                                <hr className='my-2' />
                                <div className='mb-2'>
                                    {task.description}
                                </div>
                            </div>
                            <br />
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default TaskView
