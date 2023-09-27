import { csrfFetch } from "./csrf";

const GET_USER_SPOTS = "spots/GET_USER_SPOTS"
const REMOVE_SPOT = "spots/REMOVE_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"

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

export const editSpot = (spotData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotData)
    });

    const updatedSpot = await response.json()
    dispatch(updateSpot(updatedSpot))
    console.log(updatedSpot)
    return updatedSpot
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
            newState[action.spots] = { ...newState[action.spots], ...action.spots }
            return newState
        default:
            return newState;
    }
}

export default userSpotsReducer;
