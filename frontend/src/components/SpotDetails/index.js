import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails } from '../../store/spotDetails';
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spotDetails = useSelector(state => state.details)
    console.log(spotDetails)

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    const previewImageUrl = spotDetails.SpotImages?.find(image => image.preview === true)?.url
    console.log(previewImageUrl)
    const nonPreviewImages = spotDetails.SpotImages?.filter(image => image.preview === false)
    console.log(nonPreviewImages)

    return (
        <>
            <div>
                <h1>{spotDetails.name}</h1>
                <h3>{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h3>
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
                    <h1>Hosted by {spotDetails.Owner?.firstName} {spotDetails.Owner?.lastName}</h1>
                    <p>{spotDetails.description}</p>
                </div>
                <div>
                    <span>${spotDetails.price} </span>
                    <span><i className="fa-solid fa-star"></i> {spotDetails.avgStarRating} {spotDetails.numReviews} reviews</span>
                </div>
            </div>
        </>
    )
}

export default SpotDetails;
