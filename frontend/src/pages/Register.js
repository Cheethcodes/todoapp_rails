import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

const Register = () => {
    const { login } = useAuth()
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
        <div className='register-card w-3/5 mx-auto'>
            <div className='mb-5'>
                <h4 className='title text-center'>REGISTER</h4>
            </div>
            <hr className='mb-5' />
            <div>
                {/* Form */}
                <form onSubmit={saveUser} encType='multipart/form-data'>
                    <div className='grid grid-cols-4 gap-5'>
                        <div className='col-span-3'>
                            {/* Name */}
                            <div className='form-group mb-8'>
                                <label>Name</label>
                                <input
                                    type='text'
                                    id='name'
                                    onChange={handleOnChange}
                                    value={user.name}
                                    required={true} />
                            </div>
                            {/* Email Address */}
                            <div className='form-group mb-8'>
                                <label>User Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    onChange={handleOnChange}
                                    value={user.email}
                                    required={true} />
                            </div>
                            {/* Phone */}
                            <div className='form-group mb-8'>
                                <label>Contact No</label>
                                <input
                                    type='text'
                                    id='phone'
                                    onChange={handleOnChange}
                                    value={user.phone} />
                            </div>
                            {/* Username */}
                            <div className='form-group mb-8'>
                                <label>Username</label>
                                <input
                                    type='text'
                                    id='username'
                                    onChange={handleOnChange}
                                    value={user.username}
                                    required={true} />
                            </div>
                            {/* Password */}
                            <div className='form-group mb-8'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    onChange={handleOnChange}
                                    value={user.password}
                                    required={true} />
                            </div>
                            {/* Password */}
                            <div className='form-group mb-8'>
                                <label>Confirm Password</label>
                                <input
                                    type='password'
                                    id='confirm_password'
                                    onChange={handleOnChange}
                                    value={user.confirm_password}
                                    required={true} />
                            </div>
                            <div className='form-group text-right mt-4'>
                                <button
                                    type='submit'
                                    classes='bg-blue-500 hover:bg-blue-700'
                                    style={{ width: '200px', minWidth: '200px' }}>
                                    REGISTER
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
