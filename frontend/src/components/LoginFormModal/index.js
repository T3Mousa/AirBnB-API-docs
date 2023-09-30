import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const demoSignIn = (e) => {
        // e.preventDefault()
        setErrors({});
        setCredential('Demo-lition')
        setPassword('password')
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data.errors) setErrors(data.errors);
            }
            );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                console.log(data)
                if (data.errors) setErrors(data.errors);
            }
            );
    };

    return (
        <div className='loginForm'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label> Username or Email
                    <input
                        type='text'
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                    />
                </label>
                <label> Password
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                {errors && <p className='errors'>{errors.message}</p>}
                <button type='submit' style={{ fontFamily: "Nunito, cursive", fontWeight: "bold" }}>Log In</button>
                <button type='submit' style={{ fontFamily: "Nunito, cursive", fontWeight: "bold" }} onClick={(e) => demoSignIn(e)}>Demo User</button>
            </form>
        </div>
    )
};

export default LoginFormModal;
