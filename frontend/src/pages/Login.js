import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'
import Cookies from 'js-cookie'

const Login = () => {
    const { login, setUser } = useAuth()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const handleOnChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        apiClient({
            method: 'post',
            url: `/api/v1/login`,
            data: {
                user:
                {
                    email: credentials.email,
                    password: credentials.password
                }
            }
        }).then((response) => {
            Cookies.set('user_id', response.data.id)
            Cookies.set('user_username', response.data.username)
            login()
            navigate('/dashboard')
        }).catch(error => {
            window.alert('There was an error pocessing your request!')
        })
    }

    return (
        <>
            <div className='login-card w-1/3 mx-auto'>
                <div className='mb-5'>
                    <h4 className='title text-center'>LOGIN</h4>
                </div>
                <hr className='mb-5' />
                <div>
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className='form-group mb-8'>
                            <label>User Email</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='Email'
                                value={credentials.email}
                                onChange={handleOnChange}
                                require='true'
                            />
                        </div>
                        {/* Password */}
                        <div className='form-group mb-8'>
                            <label>Password</label>
                            <input
                                type='password'
                                id='password'
                                placeholder='Password'
                                value={credentials.password}
                                onChange={handleOnChange}
                                require='true'
                            />
                        </div>
                        <div className='form-group mt-4 text-center'>
                            <button
                                type='submit'
                                classes='bg-blue-500 hover:bg-blue-700'
                                style={{ width: '200px', minWidth: '200px' }}>
                                LOG IN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
