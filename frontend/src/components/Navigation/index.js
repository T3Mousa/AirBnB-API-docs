import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div id='nav-bar'>
            <div>
                <Link exact to='/' id='home-button'>
                    <i className="fa-solid fa-fire"></i>
                    <span>flairbnb</span>
                </Link>
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
