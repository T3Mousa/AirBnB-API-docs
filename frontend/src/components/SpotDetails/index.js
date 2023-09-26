import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails } from '../../store/spots';
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state?.spots)
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(spot)

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
            .then(() => setIsLoaded(true))

    }, [dispatch, spotId, isLoaded])

    // const previewImageUrl = spot?.SpotImages?.find(image => image.preview)?.url
    // console.log(previewImageUrl)
    // const nonPreviewImages = spot?.SpotImages?.filter(image => !image.preview)
    // console.log(nonPreviewImages)
    if (!isLoaded) {
        return <h1>Loading</h1>
    }
    return (
        <>
            <div>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            </div>
            <div className='spotImages'>
                {spot.SpotImages.map((image, i) => <img src={image.url} alt={image.url} key={i} style={{ height: '450px', width: 'auto' }} />)}
            </div>
            <div>
                <div>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div>
                    <span>${spot.price} </span>
                    <span><i className="fa-solid fa-star"></i> {spot.avgStarRating} {spot.numReviews} reviews</span>
                </div>
            </div>
        </>
    )
}

export default SpotDetails;
