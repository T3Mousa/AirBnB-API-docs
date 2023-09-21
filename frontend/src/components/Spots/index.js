import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import './Spots.css'

function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state?.spots))
    // console.log(spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div className='spots-container'>
            {spots?.map((spot) => (
                <div className='spot-preview'>
                    <div key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={spot.previewImage ? spot.previewImage : "/images/placeholder.jpeg"} alt={`spot ${spot.id} preview`} style={{ height: '200px', width: 'auto' }} />
                        </NavLink>
                        <div className="location-rating">
                            <span>{spot.city}, {spot.state} </span>
                            <span><i className="fa-solid fa-star"></i> {spot.avgRating}</span>
                        </div>
                        <div>${spot.price} night</div>
                    </div>
                </div >
            ))
            }
        </div >

    )
}

export default Spots;
