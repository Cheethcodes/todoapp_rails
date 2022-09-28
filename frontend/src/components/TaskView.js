import React from 'react'
import apiClient from '../services/api'
import moment from 'moment'

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
        <div>
            {
                tasks &&
                tasks.map((task, index) => {
                    var schedule = task.schedule.replace(/.000/g, '')
                    schedule = schedule.substring(0, schedule.lastIndexOf(':00'))

                    return (
                        <React.Fragment key={index}>
                            <div>
                                <div>
                                    <div>
                                        Title: {task.name}
                                    </div>
                                    <div>
                                        <button type='button' onClick={() => {
                                            setEditId(task.id)
                                            setShowModal(true)
                                        }}>
                                            EDIT
                                        </button>
                                        <button type='button' onClick={() => handleDeleteTask(task.id)}>
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                                <br />
                                Description: {task.description}
                                <br />
                                Date: {moment(schedule).format('LL')}
                                <br />
                                Time: {('0' + moment(schedule).format('LT')).slice(-8)}
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
