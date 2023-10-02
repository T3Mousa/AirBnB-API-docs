import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Route } from 'react-router-dom';
import { getSpotDetails } from '../../store/spotDetails';
import { getAllSpotReviews } from '../../store/reviews';
import Reviews from '../Reviews/Reviews';
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state?.spotDetails)
    const reviews = Object.values(useSelector(state => state?.reviews))
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log(spot.SpotImages)
    // console.log(reviews)

    useEffect(() => {
        dispatch(getSpotDetails(spotId)).then(() => dispatch(getAllSpotReviews(spotId)))
            .then(() => setIsLoaded(true))

    }, [dispatch, spotId, isLoaded])

    const handleReserve = () => {
        alert('Feature Coming Soon...')
    }

    // const previewImageUrl = spot?.SpotImages?.find(image => image.preview)?.url
    // console.log(previewImageUrl)
    // const nonPreviewImages = spot?.SpotImages?.filter(image => !image.preview)
    // console.log(nonPreviewImages)
    if (!isLoaded) {
        return <h1>Loading</h1>
    }
    return (
        <>
            <div className='spotDetailsHeading'>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            </div>
            <div className='spotImages'>
                {spot.SpotImages.map((image, i) => <img key={i} className={`image${i}`} src={image.url} alt={`spot ${spotId}`} />)}
            </div>
            <div className="spotInfo">
                <div className='spotInfoLeft'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='spotInfoRight'>
                    <div className='priceReviews'>
                        <span className='price'>${spot.price} night </span>
                        <span className='numReviews'><i className="fa-solid fa-star"></i>
                            {spot.avgStarRating ? spot.avgStarRating : "New"}
                            {spot.avgStarRating && " · "}
                            {spot.avgStarRating ? spot.numReviews : ""}
                            {spot.numReviews === 0 && ""}
                            {spot.numReviews == 1 && " review"}
                            {spot.numReviews >= 2 && " reviews"}
                        </span>
                    </div>
                    <button className='reserveButton' onClick={handleReserve}>Reserve</button>
                </div>
            </div>
            <hr className="spotDetailsSectionDivider" />
            <div className='reviewsSection'>
                <Reviews spot={spot} reviews={reviews} />
            </div>
        </>
    )
}

export default SpotDetails;
