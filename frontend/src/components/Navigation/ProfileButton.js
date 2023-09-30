import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css'


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => {
        setShowMenu(false)
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    return (
        <>
            <button id='profile-button' onClick={openMenu}>
                <i className="fa-solid fa-bars" />
                <i className="fas fa-user-circle" />
            </button>
            <div className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        {/* <li>{user.username}</li> */}
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <div>
                            <Link to='/spots/current-user' style={{ textDecoration: 'none', color: 'black' }}>
                                Manage Spots
                            </Link>
                        </div>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <OpenModalMenuItem
                                itemText='Log In'
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li>
                            <OpenModalMenuItem
                                itemText='Sign Up'
                                onItemClick={closeMenu}
                                modalComponent={<SignUpFormModal />}
                            />
                        </li>
                    </>
                )}
            </div>
        </>
    )
}

export default ProfileButton;
