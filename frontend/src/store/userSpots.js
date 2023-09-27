import { csrfFetch } from "./csrf";
import { getSpotDetails } from "./spotDetails";

const GET_USER_SPOTS = "userSpots/GET_USER_SPOTS"
const REMOVE_SPOT = "userSpots/REMOVE_SPOT"
const UPDATE_SPOT = "userSpots/UPDATE_SPOT"
const UPDATE_SPOT_IMAGE = "userSpots/UPDATE_SPOT_IMAGE"

const userSpots = (spots) => ({
    type: GET_USER_SPOTS,
    spots
})

const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId,
});

const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const updateSpotImages = (spot, images) => ({
    type: UPDATE_SPOT_IMAGE,
    spot,
    images
})

export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current-user')

    const userSpotData = await response.json()
    const userSpotDataArray = userSpotData.Spots
    console.log(userSpotDataArray)
    dispatch(userSpots(userSpotDataArray))
}

export const deleteSpot = (spotId) => async (dispatch) => {
    console.log(spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    // const spot = await response.json()
    dispatch(removeSpot(spotId))
}

export const editSpot = (spotData, imageData) => async (dispatch) => {
    spotData.lat = 90
    spotData.lng = 180
    const response = await csrfFetch(`/api/spots/${spotData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotData)
    });
    if (response.ok) {
        const updatedSpot = await response.json()
        dispatch(addUpdatedSpotImages(updatedSpot, imageData))
        console.log(updatedSpot)
        return updatedSpot
    }
}

export const addUpdatedSpotImages = (spot, images) => async (dispatch) => {
    // const [...{ url, preview }] = images
    spot.SpotImages = []
    if (images.length) {
        for (let i = 0; i < images.length; i++) {
            if (i === 0) {
                const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: images[i],
                        preview: true
                    })
                });
                const newImageInfo = await response.json()
                spot.SpotImages.push(newImageInfo)
            }
            if (i > 0 && images[i] !== '') {
                const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: images[i],
                        preview: false
                    })
                });
                const newImageInfo = await response.json()
                spot.SpotImages.push(newImageInfo)
            }
        }
        console.log(spot.SpotImages)
    }
    if (spot.id) {
        dispatch(updateSpot(spot))
        dispatch(getSpotDetails(spot.id))
        return spot.id
    }
}


const initialState = {}

const userSpotsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_SPOTS:
            action.spots.forEach((spot) => newState[spot.id] = spot)
            console.log(action.spots)
            return newState;
        case REMOVE_SPOT:
            delete newState[action.spotId];
            return newState;
        case UPDATE_SPOT:
            newState[action.spots.id] = { ...newState[action.spots.id], ...action.spots.id }
            return newState
        default:
            return newState;
    }
}

export default userSpotsReducer;
