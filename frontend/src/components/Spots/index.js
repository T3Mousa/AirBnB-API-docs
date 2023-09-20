import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state?.spots))
    console.log(spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div>
            {spots?.map(({ id, previewImage }) => (
                <li key={id}><NavLink to={`/spots/${id}`} style={{ textDecoration: 'none', color: 'black' }}>{previewImage}</NavLink></li>
            ))
            }
        </div >
    );
}

export default Spots;
