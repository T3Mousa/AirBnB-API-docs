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

    const submitDisabled = !(credential.length >= 4 && password.length >= 6)

    const demoSignIn = (e) => {
        // e.preventDefault()
        setErrors({});
        setCredential('Demo-lition')
        setPassword('password')
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
            );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
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
                }
            })
        // .then(closeModal)
        // .catch(async (res) => {
        //     console.log(res)
        //     const data = await res.json();
        //     console.log(data)
        //     if (data.errors) setErrors(data.errors);
        // }
        // );
    };

    return (
        <div className='loginForm'>
            <form className="loginFormModal" onSubmit={handleSubmit}>
                <h1>Log In</h1>
                {(errors.credential || errors.password || errors.message) && <p className='errors'> The provided credentials were invalid.</p>}
                <label className='credential'>
                    <input
                        type='text'
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        placeholder='Username or Email'
                    />
                </label>
                <label className='password'>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                </label>
                <div className='logInFormButtons'>
                    <button type='submit' disabled={submitDisabled} className="logInButton">Log In</button>
                    <button type='submit' className="demoUserButton" style={{ fontFamily: "Nunito, cursive", fontWeight: "bold", border: "none", backgroundColor: "white", textDecoration: "underline" }} onClick={(e) => demoSignIn(e)}>Demo User</button>
                </div>
            </form>
        </div>
    )
};

export default LoginFormModal;
