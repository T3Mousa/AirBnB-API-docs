import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignUpForm.css'

function SignUpFormModal() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmpassword] = useState('')
    const [errors, setErrors] = useState({})
    const history = useHistory()
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(sessionActions.signup({
                firstName,
                lastName,
                username,
                email,
                password
            })
            )
                .then((res) => {
                    if (res) {
                        console.log(res)
                        if (res.errors) {
                            console.log(res.errors)
                            setErrors(res.errors)
                        } else {
                            closeModal()
                        }
                    } else {
                        closeModal()
                        history.push('/')
                    }
                })
        };
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        })
    }

    return (
        <div className='signUpForm'>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {errors.firstName && <p className='errors'>{errors.firstName}</p>}
                {errors.lastName && <p className='errors'>{errors.lastName}</p>}
                {errors.username && <p className='errors'>{errors.username}</p>}
                {errors.email && <p className='errors'>{errors.email}</p>}
                {errors.password && <p className='errors'>{errors.password}</p>}
                {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
                <label> First Name
                    <input
                        type='text'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </label>
                <label> Last Name
                    <input
                        type='text'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <label> Username
                    <input
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label> Email
                    <input
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label> Password
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label> Confirm Password
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmpassword(e.target.value)}
                    />
                </label>
                <button type='submit' style={{ fontFamily: "Nunito, cursive", fontWeight: "bold" }}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpFormModal;
