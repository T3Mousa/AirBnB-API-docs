import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state?.spots))
    // console.log(spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div>
            {spots?.map((spot) => (
                <>
                    <div key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={spot.previewImage ? spot.previewImage : "/images/placeholder.jpeg"} alt={`spot ${spot.id} preview`} style={{ height: '300px', width: 'auto' }} />
                        </NavLink>
                    </div>
                    <div>
                        <span>{spot.city}, {spot.state} </span>
                        <span> <i className="fa-solid fa-star"></i> {spot.avgRating}</span>
                    </div >
                    <div>${spot.price} / night</div>
                </>
            ))
            }
        </div >
    );
}

export default Spots;
