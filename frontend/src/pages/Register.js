import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'
import Cookies from 'js-cookie'
import { FaEnvelope, FaIdCard, FaLock, FaPhoneAlt, FaUserAlt } from 'react-icons/fa'

const Register = () => {
    const { login, loggedInUser, setLoggedInUser } = useAuth()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirm_password: '',
    })

    const saveUser = (e) => {
        e.preventDefault()

        if (user.password !== user.confirm_password) {
            window.alert('Passwords did not match!')
            return
        }

        apiClient({
            method: 'post',
            url: '/api/v1/signup',
            data:
            {
                user: {
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    password_confirmation: user.confirm_password
                }
            }
        }).then((response) => {
            setLoggedInUser({
                ...loggedInUser,
                id: response.data.id,
                username: response.data.username
            })

            Cookies.set('user_id', response.data.id)
            Cookies.set('user_username', response.data.username)

            setUser({
                ...user,
                name: '',
                phone: '',
                email: '',
                username: '',
                password: '',
                confirm_password: '',
            })

            window.alert('Successfully registered!')
            login()
            navigate('/dashboard')
        }).catch((error) => {
            window.alert('There was an error processing your request!')
        })
    }

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className='auth-screen'>
            <div className='auth-card rounded w-full mx-auto px-10 py-10 bg-white' style={{ maxWidth: '500px' }}>
                <div className='flex justify-between mb-8'>
                    <h4 className='text-lg font-bold text-primary text-left'>To Do App | <span className='font-bold' style={{ fontSize: '14px' }}>Register</span></h4>
                    <a
                        href='/'
                        className='hover:border-primary text-slate-200 hover:text-primary border border-slate-200'
                        style={{ padding: '6px 15px' }}>
                        Login
                    </a>
                </div>
                <div>
                    {/* Form */}
                    <form onSubmit={saveUser} encType='multipart/form-data'>
                        {/* Name */}
                        <div className='flex mb-8'>
                            <div className='bg-primary text-white py-2 px-3 flex flex-col justify-center'>
                                <FaIdCard style={{ height: '12px' }} />
                            </div>
                            <input
                                type='text'
                                id='name'
                                placeholder='Name'
                                className='w-full py-2 px-5 outline-0 border-t border-b border-r border-l-0 border-slate-200'
                                onChange={handleOnChange}
                                value={user.name}
                                required={true}
                                autoComplete='off' />
                        </div>
                        {/* Email Address */}
                        <div className='flex mb-8'>
                            <div className='bg-primary text-white py-2 px-3 flex flex-col justify-center'>
                                <FaEnvelope style={{ height: '12px' }} />
                            </div>
                            <input
                                type='email'
                                id='email'
                                placeholder='Email'
                                className='w-full py-2 px-5 outline-0 border-t border-b border-r border-l-0 border-slate-200'
                                onChange={handleOnChange}
                                value={user.email}
                                required={true}
                                autoComplete='off' />
                        </div>
                        {/* Phone */}
                        <div className='flex mb-8'>
                            <div className='bg-primary text-white py-2 px-3 flex flex-col justify-center'>
                                <FaPhoneAlt style={{ height: '12px' }} />
                            </div>
                            <input
                                type='text'
                                id='phone'
                                placeholder='Contact Number'
                                className='w-full py-2 px-5 outline-0 border-t border-b border-r border-l-0 border-slate-200'
                                onChange={handleOnChange}
                                value={user.phone}
                                autoComplete='off' />
                        </div>
                        {/* Username */}
                        <div className='flex mb-8'>
                            <div className='bg-primary text-white py-2 px-3 flex flex-col justify-center'>
                                <FaUserAlt style={{ height: '12px' }} />
                            </div>
                            <input
                                type='text'
                                id='username'
                                placeholder='Username'
                                className='w-full py-2 px-5 outline-0 border-t border-b border-r border-l-0 border-slate-200'
                                onChange={handleOnChange}
                                value={user.username}
                                required={true}
                                autoComplete='off' />
                        </div>
                        {/* Password */}
                        <div className='flex mb-8'>
                            <div className='bg-primary text-white py-2 px-3 flex flex-col justify-center'>
                                <FaLock style={{ height: '12px' }} />
                            </div>
                            <input
                                type='password'
                                id='password'
                                placeholder='Password'
                                className='w-full py-2 px-5 outline-0 border-t border-b border-r border-l-0 border-slate-200'
                                onChange={handleOnChange}
                                value={user.password}
                                required={true}
                                autoComplete='off' />
                        </div>
                        {/* Password */}
                        <div className='flex mb-8'>
                            <div className='bg-primary text-white py-2 px-3 flex flex-col justify-center'>
                                <FaLock style={{ height: '12px' }} />
                            </div>
                            <input
                                type='password'
                                id='confirm_password'
                                placeholder='Confirm Password'
                                className='w-full py-2 px-5 outline-0 border-t border-b border-r border-l-0 border-slate-200'
                                onChange={handleOnChange}
                                value={user.confirm_password}
                                required={true}
                                autoComplete='off' />
                        </div>
                        <div className='form-group mt-4 text-center'>
                            <button
                                type='submit'
                                className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary'
                                style={{ width: '200px', minWidth: '200px', padding: '6px 15px' }}>
                                REGISTER
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
