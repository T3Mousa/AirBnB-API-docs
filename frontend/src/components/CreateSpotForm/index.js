import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewSpot } from "../../store/spots";

function CreateSpotForm() {
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()
    // const [previewImage, setPreviewImage] = useState('')
    // const [image1Url, setImage1Url] = useState('')
    // const [image2Url, setImage2Url] = useState('')
    // const [image3Url, setImage3Url] = useState('')
    // const [image4Url, setImage4Url] = useState('')
    const [errors, setErrors] = useState({})
    const history = useHistory()
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
            // previewImage,
            // image1Url,
            // image2Url,
            // image3Url,
            // image4Url
        };
        console.log(spotInfo)

        let newSpot = await dispatch(addNewSpot(spotInfo));
        console.log(newSpot)
        // console.log(newSpot.id)
        if (newSpot?.id) {
            history.push(`/spots/${newSpot?.id}`);
        } else {
            setErrors(newSpot?.errors)
        }

        // console.log(errors)
        // console.log(errors.errors)
        // console.log(Response.errors)
        // setErrors(errors.errors)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create a New Spot</h1>
            <h3>Where's your spot located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                />
            </label>
            <p className='errors'>
                {errors.country && `${errors.country}`}
            </p>
            <label>Street Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
            </label>
            <p className='errors'>
                {errors.address && `${errors.address}`}
            </p>
            <div>
                <label>City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                    />
                </label>
                <p className='errors'>
                    {errors.city && `${errors.city}`}
                </p>
                <label>State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="STATE"
                    />
                </label>
                <p className='errors'>
                    {errors.state && `${errors.state}`}
                </p>
            </div>
            <div>
                <label>Latitude
                    <input
                        type="number"
                        defaultValue={90}
                        onChange={(e) => setLat(e.target.defaultValue)}
                        placeholder="Latitude"
                    />
                </label>
                <label>Longitude
                    <input
                        type="number"
                        defaultValue={180}
                        onChange={(e) => setLng(e.target.defaultValue)}
                        placeholder="Longitude"
                    />
                </label>
            </div>
            <label>
                <h3>Describe your place to guests</h3>
                <p>
                    Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                </p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please write at least 30 characters"
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name of your spot"
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
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"
                    />
                </span>
            </label>
            <p className='errors'>
                {errors.price && `${errors.price}`}
            </p>
            {/* <label>
                <h3>Liven up your spot with photos</h3>
                <p>
                    Submit a link to at least one photo to publish your spot.
                </p>
                <input
                    type="url"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    required
                    placeholder="Preview Image URL"
                />
                <input
                    type="url"
                    value={image1Url}
                    onChange={(e) => setImage1Url(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="url"
                    value={image2Url}
                    onChange={(e) => setImage2Url(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="url"
                    value={image3Url}
                    onChange={(e) => setImage3Url(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="url"
                    value={image4Url}
                    onChange={(e) => setImage4Url(e.target.value)}
                    placeholder="Image URL"
                />
            </label> */}
            <button type='submit'>Create Spot</button>
        </form >
    )
}

export default CreateSpotForm;
