import { csrfFetch } from "./csrf";

const GET_SPOT_DETAILS = "spotDetails/GET_SPOT_DETAILS";


const spotDetails = (spot) => ({
    type: GET_SPOT_DETAILS,
    spot
});



export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    console.log(response)
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        const spotDeets = data.Spots
        console.log(spotDeets.SpotImages)
        dispatch(spotDetails(spotDeets))
        return spotDeets
    }
}

const initialState = {}

const spotDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT_DETAILS:
            let newState = { ...action.spot }
            return newState;
        default:
            return state;
    }
};

export default spotDetailsReducer;
