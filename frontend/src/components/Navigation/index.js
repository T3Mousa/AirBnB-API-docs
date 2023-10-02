import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='navBar'>
            <div className='homeButton'>
                <Link exact='true' to='/' className="homeButtonLink">
                    <img className='logo' src='/images/flairbnbLOGO.png' alt='flairbnb logo' />
                    <span className='logoText'>flairbnb</span>
                </Link>
            </div>
            {sessionUser &&
                <div className='createSpotDiv'>
                    <Link to='/spots' className="createSpotLink">Create a New Spot</Link>
                </div>
            }
            <div className='profileMenu'>
                {isLoaded && (
                    <ProfileButton user={sessionUser} />
                )}
            </div>
        </div>
    )
}

export default Navigation;
