import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
                );
        };
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        })
    }

    return (
        <div className='signUpForm'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label> First Name
                    <input
                        type='text'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p>{errors.firstName}</p>}
                <label> Last Name
                    <input
                        type='text'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p>{errors.lastName}</p>}
                <label> Username
                    <input
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p>{errors.username}</p>}
                <label> Email
                    <input
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label> Password
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <label> Confirm Password
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmpassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button type='submit' style={{ fontFamily: "Nunito, cursive", fontWeight: "bold" }}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpFormModal;
