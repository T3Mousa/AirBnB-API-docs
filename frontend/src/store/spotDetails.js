import { csrfFetch } from "./csrf";

const GET_SPOT_DETAILS = "spots/GET_SPOT_DETAILS";

const spotDetails = (spotId) => ({
    type: GET_SPOT_DETAILS,
    spotId
});

export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const data = await response.json()
        const spotDets = data.Spots
        console.log(spotDets)
        dispatch(spotDetails(spotDets))
    }
}

const initialState = null

const spotDetailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SPOT_DETAILS:

            return action.spotId
        default:
            return state;
    }
};

export default spotDetailsReducer;
