import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton'
import DeleteSpotFormModal from "../DeleteSpotFormModal";
import { getUserSpots } from "../../store/userSpots";
import './ManageSpots.css'

function ManageSpots() {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    const dispatch = useDispatch();
    // const userSpots = useSelector(state => Object.values(state?.spots).filter((spot) => spot.ownerId === sessionUser))
    const userSpots = Object.values(useSelector(state => state.userSpots))
    console.log(userSpots)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
    const [isLoaded, setIsLoaded] = useState(false)
    const useSpotsArray = []
    // console.log(userSpots)

    useEffect(() => {
        dispatch(getUserSpots(sessionUser)).then(() => setIsLoaded(true))
    }, [dispatch, sessionUser, isLoaded])

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

    // return (
    //     <h1>testing</h1>
    // )

    return (
        <>
            <h1>Manage Your Spots</h1>
            <button>
                <Link to='/spots' style={{ textDecoration: 'none', color: 'black' }}>Create a New Spot</Link>
            </button>
            <div className='spots-container'>
                {userSpots?.map((spot) => (
                    <div className='spot-preview' >
                        <NavLink to={`/spots/${spot.id}`} key={spot.id} style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={spot.previewImage ? spot.previewImage : "/images/placeholder.jpeg"} alt={`spot ${spot.id} preview`} style={{ height: '200px', width: 'auto' }} />
                        </NavLink>
                        <div className="location-rating">
                            <span>{spot.city}, {spot.state} </span>
                            <span><i className="fa-solid fa-star"></i> {spot.avgRating}</span>
                        </div>
                        <div>${spot.price} night</div>
                        <div className="update-delete">
                            <button>
                                <Link to={`/spots/${spot.id}/edit`} key={spot.id} style={{ textDecoration: 'none', color: 'black' }}>Update</Link>
                            </button>
                            <OpenModalButton
                                buttonText='Delete'
                                onButtonClick={closeMenu}
                                modalComponent={<DeleteSpotFormModal spotId={spot.id} />}
                            />
                        </div>
                    </div>
                ))
                }
            </div >
        </>
    )
}

export default ManageSpots;
