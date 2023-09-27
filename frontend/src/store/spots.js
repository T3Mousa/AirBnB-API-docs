import { csrfFetch } from "./csrf";
import { getSpotDetails } from "./spotDetails";

// const GET_ONE_SPOT = "spots/GET_ONE_SPOT"
const GET_SPOTS = "spots/GET_SPOTS";
// const GET_USER_SPOTS = "spots/GET_USER_SPOTS"
// const GET_SPOT_DETAILS = "spots/GET_SPOT_DETAILS";
const CREATE_SPOT = "spots/CREATE_SPOT"
const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE"
// const REMOVE_SPOT = "spots/REMOVE_SPOT"
// const UPDATE_SPOT = "spots/UPDATE_SPOT"

// export const getSpot = (spot) => ({
//     type: GET_ONE_SPOT,
//     spot
// })

const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

// const userSpots = (spots) => ({
//     type: GET_USER_SPOTS,
//     spots
// })

// const spotDetails = (spot) => ({
//     type: GET_SPOT_DETAILS,
//     spot
// });

const addSpot = (spotInfo, imageInfo) => ({
    type: CREATE_SPOT,
    spotInfo,
    imageInfo
})

const addSpotImages = (spot, images) => ({
    type: ADD_SPOT_IMAGE,
    spot,
    images
})

// const removeSpot = (spotId) => ({
//     type: REMOVE_SPOT,
//     spotId,
// });

// const updateSpot = (spot) => ({
//     type: UPDATE_SPOT,
//     spot
// })

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const data = await response.json()
        const spots = data.Spots
        dispatch(allSpots(spots))
        return spots
    }
}

// export const getUserSpots = () => async (dispatch) => {
//     const response = await csrfFetch('/api/spots/current-user')

//     const userSpotData = await response.json()
//     const userSpotDataArray = userSpotData.Spots
//     console.log(userSpotDataArray)
//     dispatch(userSpots(userSpotDataArray))
// }

// export const getSpotDetails = (spotId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}`)
//     console.log(spotId)

//     const data = await response.json()
//     // console.log(data)
//     const spotDeets = data.Spots
//     // console.log(spotDeets)
//     dispatch(spotDetails(spotDeets))
//     return spotDeets

// }

export const addNewSpot = (spotData, imageData) => async (dispatch) => {
    spotData.lat = 90
    spotData.lng = 180
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(spotData),
    });
    const newSpot = await response.json()
    // console.log("I'm here", spotInfo)

    // dispatch(addSpot(spotInfo))
    // return spotInfo
    if (newSpot) {
        dispatch(addNewSpotImages(newSpot, imageData))
    }
    return newSpot
}

export const addNewSpotImages = (spot, images) => async (dispatch) => {
    // const [...{ url, preview }] = images
    if (images) {
        spot.SpotImages = []
        for (let i = 0; i < images.length; i++) {
            if (images[i].url) {
                const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: images[i].url,
                        preview: true
                    })
                });
                const newImageInfo = await response.json()
                spot.SpotImages.push(newImageInfo)
            }
        }
        console.log(spot.SpotImages)
    }
    dispatch(getSpotDetails(spot))
    return spot.id
}

// export const deleteSpot = (spotId) => async (dispatch) => {
//     console.log(spotId)
//     const response = await csrfFetch(`/api/spots/${spotId}`, {
//         method: 'DELETE'
//     });
//     // const spot = await response.json()
//     dispatch(removeSpot(spotId))
// }

// export const editSpot = (spotData) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotData.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(spotData)
//     });

//     const updatedSpot = await response.json()
//     dispatch(updateSpot(updatedSpot))
//     console.log(updatedSpot)
//     return updatedSpot
// }


const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOTS:
            action.spots.forEach((spot) => newState[spot.id] = spot);
            return newState;
        // case GET_USER_SPOTS:
        //     newState.userSpots = {}
        //     console.log(action.spots)
        //     action.spots.forEach((spot) => newState.userSpots[spot.id] = spot)
        // let userSpotsState = {}
        // action.spots.forEach((spot) => newState.userSpots[spot.id] = spot)
        // case GET_SPOT_DETAILS:
        //     // console.log(action.spot)
        //     newState = { ...action.spot }
        //     return newState;
        case CREATE_SPOT:
            return { ...state, [action.spotInfo.id]: action.spotInfo };
        // case REMOVE_SPOT:
        //     delete newState[action.spotId];
        //     return newState;
        // case UPDATE_SPOT:
        //     newState[action.spots] = { ...newState[action.spots], ...action.spots }
        //     return newState
        default:
            return state;
    }
};

export default spotsReducer;
