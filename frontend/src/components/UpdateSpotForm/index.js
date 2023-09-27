import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpot } from "../../store/userSpots";
import { getSpotDetails } from "../../store/spotDetails";

function UpdateSpotForm() {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spot = useSelector(state => state?.userSpots[spotId])
    console.log(spot)
    const [isLoaded, setIsLoaded] = useState(false)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(90)
    const [lng, setLng] = useState(180)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [previewImageUrl, setPreviewImageUrl] = useState(spot.previewImageUrl)
    const [image1Url, setImage1Url] = useState(spot.image1Url)
    const [image2Url, setImage2Url] = useState(spot.image2Url)
    const [image3Url, setImage3Url] = useState(spot.image3Url)
    const [image4Url, setImage4Url] = useState(spot.image4Url)

    const [errors, setErrors] = useState({})
    const history = useHistory()

    // useEffect(() => {
    //     dispatch(getSpotDetails(spotId)).then(() => setIsLoaded(true))
    // }, [dispatch, spotId, isLoaded])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const spotInfo = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            imagesArray: [
                { url: previewImageUrl, preview: true },
                { url: image1Url, preview: false },
                { url: image2Url, preview: false },
                { url: image3Url, preview: false },
                { url: image4Url, preview: false }
            ]
        };

        let errorsObj = {}
        if (!country) errorsObj.country = "Country is required"
        if (!address) errorsObj.address = "Address is required"
        if (!city) errorsObj.city = "City is required"
        if (!state) errorsObj.state = "State is required"
        if (!lat) errorsObj.lat = "Latitude is required"
        if (!lng) errorsObj.lng = "Longitude is required"
        if (description.length < 30) errorsObj.description = "Description needs a minimum of 30 characters"
        if (!name) errorsObj.name = "Name is required"
        if (!price) errorsObj.price = "Price is required"
        if (!previewImageUrl) errorsObj.previewImageUrl = "Preview image is required."
        if (previewImageUrl && (!previewImageUrl.endsWith('.png') || !previewImageUrl.endsWith('.jpg') || !previewImageUrl.endsWith('.jpeg'))) errorsObj.previewImageUrl = "Image URL must end in .png, .jpg, or .jpeg"
        if (image1Url && (!image1Url.endsWith('.png') || !image1Url.endsWith('.jpg') || !image1Url.endsWith('.jpeg'))) errorsObj.image1Url = "Image URL must end in .png, .jpg, or .jpeg"
        if (image2Url && (!image2Url.endsWith('.png') || !image2Url.endsWith('.jpg') || !image2Url.endsWith('.jpeg'))) errorsObj.image2Url = "Image URL must end in .png, .jpg, or .jpeg"
        if (image3Url && (!image3Url.endsWith('.png') || !image3Url.endsWith('.jpg') || !image3Url.endsWith('.jpeg'))) errorsObj.image3Url = "Image URL must end in .png, .jpg, or .jpeg"
        if (image4Url && (!image4Url.endsWith('.png') || !image4Url.endsWith('.jpg') || !image4Url.endsWith('.jpeg'))) errorsObj.image4Url = "Image URL must end in .png, .jpg, or .jpeg"

        let updatedSpot = await dispatch(editSpot(spotInfo));
        // console.log(updatedSpot?.country)
        // console.log(newSpot.id)
        if (updatedSpot?.id) {
            history.push(`/spots/${updatedSpot?.id}`);
        } else {
            setErrors(errorsObj)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update your Spot</h1>
            <h3>Where's your spot located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>Country <p className='errors'>
                {errors.country && `${errors.country}`}
            </p>
                <input
                    type="text"
                    value={spot.country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>

            <label>Street Address <p className='errors'>
                {errors.address && `${errors.address}`}
            </p>
                <input
                    type="text"
                    value={spot.address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>

            <div>
                <label>City <p className='errors'>
                    {errors.city && `${errors.city}`}
                </p>
                    <input
                        type="text"
                        value={spot.city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>

                <label>State <p className='errors'>
                    {errors.state && `${errors.state}`}
                </p>
                    <input
                        type="text"
                        value={spot.state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>

            </div>
            <div>
                <label>Latitude
                    <input
                        type="number"
                        defaultValue={90}
                        onChange={(e) => setLat(e.target.defaultValue)}
                    />
                </label>
                <label>Longitude
                    <input
                        type="number"
                        defaultValue={180}
                        onChange={(e) => setLng(e.target.defaultValue)}
                    />
                </label>
            </div>
            <label>
                <h3>Describe your place to guests</h3>
                <p>
                    Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                </p>
                <textarea
                    value={spot.description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <p className='errors'>
                {errors.description && "Description needs a minimum of 30 characters"}
            </p>
            <label>
                <h3>Create a title for your spot</h3>
                <p>
                    Catch guests' attention with a spot title that highlights what makes your place special.
                </p>
                <input
                    type="text"
                    value={spot.name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <p className='errors'>
                {errors.name && `${errors.name}`}
            </p>
            <label>
                <h3>Set a base price for your spot</h3>
                <p>
                    Competitive pricing can help your listing stand out and rank higher in search results.
                </p>
                <span>
                    $ <input
                        type="number"
                        value={spot.price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </span>
            </label>
            <p className='errors'>
                {errors.price && `${errors.price}`}
            </p>
            <label>
                <h3>Liven up your spot with photos</h3>
                <p>
                    Submit a link to at least one photo to publish your spot.
                </p>
                <input
                    type='url'
                    value={previewImageUrl}
                    onChange={(e) => setPreviewImageUrl(e.target.value)}
                    placeholder={previewImageUrl ? spot.previewImageUrl : "Preview Image URL"}
                />
                <input
                    type='url'
                    value={image1Url}
                    onChange={(e) => setImage1Url(e.target.value)}
                    placeholder={image1Url ? spot.image1Url : "Image Url"}
                />
                <input
                    type='url'
                    value={image2Url}
                    onChange={(e) => setImage2Url(e.target.value)}
                    placeholder={image2Url ? spot.image2Url : "Image Url"}
                />
                <input
                    type='url'
                    value={image3Url}
                    onChange={(e) => setImage3Url(e.target.value)}
                    placeholder={image3Url ? spot.image3Url : "Image Url"}
                />
                <input
                    type='url'
                    value={image4Url}
                    onChange={(e) => setImage4Url(e.target.value)}
                    placeholder={image4Url ? spot.image4Url : "Image Url"}
                />
            </label>

            <button type='submit'>Create Spot</button>
        </form >
    )
}

export default UpdateSpotForm;
