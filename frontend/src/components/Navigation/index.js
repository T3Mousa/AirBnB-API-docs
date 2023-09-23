import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div id='nav-bar'>
            <div>
                <Link exact='true' to='/' id='home-button'>
                    <img id='logo' src='/images/flairbnbLOGO.png' alt='flairbnb logo' />
                    <span id='logo-text'>flairbnb</span>
                </Link>
            </div>
            <div>
                <Link to='/spots' style={{ textDecoration: 'none' }}>Create a New Spot</Link>
            </div>
            <div>
                {isLoaded && (
                    <ProfileButton user={sessionUser} />
                )}
            </div>
        </div>
    )
}

export default Navigation;
