import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT"

const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

const addSpot = (spotInfo) => ({
    type: CREATE_SPOT,
    spotInfo
})

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const data = await response.json()
        const spots = data.Spots
        dispatch(allSpots(spots))
    }
}

export const addNewSpot = (data) => async (dispatch) => {
    data.lat = 90
    data.lng = 180
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(data),
    });
    const spotInfo = await response.json()
    // console.log("I'm here", spotInfo)
    dispatch(addSpot(spotInfo))
    return spotInfo
}


const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const newState = { ...state }
            action.spots.forEach((spot) => newState[spot.id] = spot);
            return newState;
        case CREATE_SPOT:
            return { ...state, [action.spotInfo.id]: action.spotInfo };
        default:
            return state;
    }
};

export default spotsReducer;
