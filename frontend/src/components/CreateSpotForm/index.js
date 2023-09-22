import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { addNewSpot } from "../../store/spots";
// import SpotDetails from "../SpotDetails";

function CreateSpotForm() {
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image1Url, setImage1Url] = useState('')
    const [image2Url, setImage2Url] = useState('')
    const [image3Url, setImage3Url] = useState('')
    const [image4Url, setImage4Url] = useState('')
    const [errors, setError] = useState({})
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const spotInfo = {
            address,
            city,
            state,
            country,
            latitude,
            longitude,
            name,
            description,
            price,
            previewImage,
            image1Url,
            image2Url,
            image3Url,
            image4Url
        };

        let createdSpot = spotInfo;

        if (createdSpot) {
            let newSpot = await dispatch(addNewSpot(createdSpot));
            history.push('/')
            history.push('/spots/' + newSpot.id);
            return <Redirect to={`/spots/${newSpot.id}`} />;
        }
    };


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
                    required
                    placeholder="Country"
                />
            </label>
            <label>Street Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Address"
                />
            </label>
            <div>
                <label>City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="City"
                    />
                </label>
                <label>State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder="STATE"
                    />
                </label>
            </div>
            <div>
                <label>Latitude
                    <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Latitude"
                    />
                </label>
                <label>Longitude
                    <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
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
                    required
                    placeholder="Please write at least 30 characters"
                />
            </label>
            <label>
                <h3>Create a title for your spot</h3>
                <p>
                    Catch guests' attention with a spot title that highlights what makes your place special.
                </p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Name of your spot"
                />
            </label>
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
                        required
                        placeholder="Price per night (USD)"
                    />
                </span>
            </label>
            <label>
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
            </label>
            <button type='submit'>Create Spot</button>
        </form >
    )
}

export default CreateSpotForm;
