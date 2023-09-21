import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails } from '../../store/spotDetails';
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spotDetails)
    console.log(spot)

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    const previewImageUrl = spot.SpotImages?.find(image => image.preview)?.url
    console.log(previewImageUrl)
    const nonPreviewImages = spot.SpotImages?.filter(image => !image.preview)
    console.log(nonPreviewImages)

    return (
        <>
            <div>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            </div>
            <div className='spotImages'>
                <div className='previewImage'>
                    <img src={previewImageUrl} alt={previewImageUrl} style={{ height: '455px', width: 'auto' }} />
                </div>
                <div className='nonPreviewImages'>
                    {nonPreviewImages.map((image, i) => <img src={image.url} alt={image.url} key={i} style={{ height: '220px', width: 'auto' }} />)}
                </div>
            </div>
            <div>
                <div>
                    <h1>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h1>
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
