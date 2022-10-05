import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'
import Cookies from 'js-cookie'
import { FaEnvelope, FaLock } from 'react-icons/fa'

const Login = () => {
    const { login, loggedInUser, setLoggedInUser } = useAuth()
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
            url: `/auth/sign_in`,
            data: {
                email: credentials.email,
                password: credentials.password
            }
        }).then((response) => {
            setLoggedInUser({
                ...loggedInUser,
                id: response.data.data.id,
                username: response.data.data.username
            })

            Cookies.set('user_id', response.data.data.id)
            Cookies.set('user_username', response.data.data.username)
            Cookies.set('user_email', response.data.data.email)

            // Headers
            Cookies.set('token-type',  response.headers['token-type'])
            Cookies.set('access-token', response.headers['access-token'])
            Cookies.set('client',  response.headers.client)
            Cookies.set('uid',  response.headers.uid)
            Cookies.set('authorization', response.headers.authorization)
            
            login()
            navigate('/dashboard')
        }).catch(error => {
            window.alert('There was an error processing your request!')
        })
    }

    return (
        <div className='auth-screen'>
            <div className='auth-card rounded w-full mx-auto px-10 py-10 bg-white' style={{ maxWidth: '500px' }}>
                <div className='flex justify-between mb-8'>
                    <h4 className='text-lg font-bold text-primary text-left'>To Do App | <span className='font-bold' style={{ fontSize: '14px' }}>Login</span></h4>
                    <a
                        href='/register'
                        className='hover:border-primary text-slate-200 hover:text-primary border border-slate-200'
                        style={{ padding: '6px 15px' }}>
                        Register
                    </a>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className='flex mb-5'>
                            <div className='bg-primary text-white py-2 px-3 flex flex-col justify-center'>
                                <FaEnvelope style={{ height: '12px' }} />
                            </div>
                            <input
                                type='email'
                                id='email'
                                placeholder='Email'
                                className='w-full py-2 px-5 outline-0 border-t border-b border-r border-l-0 border-slate-200'
                                value={credentials.email}
                                onChange={handleOnChange}
                                require='true'
                                autoComplete='off'
                            />
                        </div>
                        {/* Password */}
                        <div className='flex mb-5'>
                            <div className='bg-primary text-white py-2 px-3 flex flex-col justify-center'>
                                <FaLock style={{ height: '12px' }} />
                            </div>
                            <input
                                type='password'
                                id='password'
                                placeholder='Password'
                                className='w-full py-2 px-5 outline-0 border-t border-b border-r border-l-0 border-slate-200'
                                value={credentials.password}
                                onChange={handleOnChange}
                                require='true'
                                autoComplete='off'
                            />
                        </div>
                        <div className='form-group mt-4 text-center'>
                            <button
                                type='submit'
                                className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary'
                                style={{ width: '200px', minWidth: '200px', padding: '6px 15px' }}>
                                LOG IN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
