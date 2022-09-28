import React, { useMemo, useState } from 'react'
import apiClient from '../services/api'
import moment from 'moment'

const TaskView = ({ userId, editState, setEditId, setShowModal }) => {
    const [tasks, setTasks] = useState([])

    const data = useMemo(() => {
        apiClient({
            method: 'get',
            url: `/api/v1/tasks/${userId}`
        }).then(response => {
            setTasks(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [editState])

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
                                    <button type='button' onClick={() => {
                                        setEditId(task.id)
                                        setShowModal(true)
                                    }}>
                                        EDIT
                                    </button>
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
