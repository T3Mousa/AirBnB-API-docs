import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Route } from 'react-router-dom';
import { getSpotDetails } from '../../store/spotDetails';
import { getAllReviews } from '../../store/reviews';
import Reviews from '../Reviews/Reviews';
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state?.spotDetails)
    const reviews = Object.values(useSelector(state => state?.reviews))
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(spot.SpotImages)
    console.log(reviews)

    useEffect(() => {
        dispatch(getSpotDetails(spotId)).then(() => dispatch(getAllReviews(spotId)))
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
                {spot.SpotImages.map((image, i) => <img key={i} src={image.url} alt={`spot ${spotId}`} style={{ height: '450px', width: 'auto' }} />)}
            </div>
            <div>
                <div>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div>
                    <span>${spot.price} </span>
                    <span><i className="fa-solid fa-star"></i>{spot.avgStarRating} &middot; {spot.numReviews} reviews</span>
                </div>
            </div>
            <div>
                <Reviews spot={spot} reviews={reviews} />
            </div>
        </>
    )
}

export default SpotDetails;
