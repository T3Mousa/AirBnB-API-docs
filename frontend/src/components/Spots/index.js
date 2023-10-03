import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import Tooltip from './Tooltip';
import './Spots.css'

function Spots() {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state?.spots))
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log(spots)

    useEffect(() => {
        dispatch(getAllSpots()).then(() => setIsLoaded(true))

    }, [dispatch, isLoaded])

    // if (!isLoaded) {
    //     return (
    //         <h1>is Loading</h1>
    //     )
    // }
    return (
        <>
            {isLoaded &&
                <div className='spotsContainer'>
                    {spots?.map((spot, i) => (
                        // <div className='spotPreview' >
                        <Tooltip text={spot.name}>
                            <NavLink to={`/spots/${spot?.id}`} key={i} className="spotPrevLink">
                                <img src={spot.previewImage ? spot.previewImage : "/images/placeholder.jpeg"} alt={`spot ${spot.id} preview`} />
                                <div className="locationRating">
                                    <span>{spot.city}, {spot.state} </span>
                                    <span><i className="fa-solid fa-star"></i>
                                        {spot.avgRating && ` ${spot.avgRating}`}
                                        {!spot.avgRating && " New"}
                                    </span>
                                </div>
                                <div className="price">${spot.price} night</div>
                            </NavLink>
                        </Tooltip>
                        // </div>
                    ))
                    }
                </div >
            }
        </>

    )
}

export default Spots;
