import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";
const GET_SPOT_DETAILS = "spotDetails/GET_SPOT_DETAILS";
const CREATE_SPOT = "spots/CREATE_SPOT"
const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE"
const REMOVE_SPOT = "spots/REMOVE_SPOT"


const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

const spotDetails = (spotId) => ({
    type: GET_SPOT_DETAILS,
    spotId
});

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

const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId,
});

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const data = await response.json()
        const spots = data.Spots
        dispatch(allSpots(spots))
    }
}

export const getSpotDetails = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`)
    console.log(spot)
    if (response.ok) {
        const data = await response.json()
        // console.log(data)
        const spotDeets = data.Spots
        // console.log(spotDeets)
        dispatch(spotDetails(spotDeets))
    }
}

export const addNewSpot = (spotData, imageData) => async (dispatch) => {
    // spotData.lat = 90
    // spotData.lng = 180
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

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    const spot = await response.json()
    dispatch(removeSpot(spotId))
}


const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const newState = { ...state }
            action.spots.forEach((spot) => newState[spot.id] = spot);
            return newState;
        case GET_SPOT_DETAILS:

            return action.spotId;
        case CREATE_SPOT:
            return { ...state, [action.spotInfo.id]: action.spotInfo };
        // case ADD_SPOT_IMAGE:
        //     const { spotId, spotImages } = action
        //     const spotToAddImages = state.spotId
        //     if (spotToAddImages) {
        //         const spotImagesAddedTo = { ...spotToAddImages, SpotImages: [...spotToAddImages.spotImages, ...spotImages] }
        //         return { ...state, [spotId]: spotImagesAddedTo }
        //     }
        default:
            return state;
    }
};

export default spotsReducer;
