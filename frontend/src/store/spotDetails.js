import { csrfFetch } from "./csrf";

const GET_SPOT_DETAILS = "spotsDetails/GET_SPOT_DETAILS";

const spotDetails = (spotId) => ({
    type: GET_SPOT_DETAILS,
    spotId
});

export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    console.log(response)
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        const spotDeets = data.Spots
        console.log(spotDeets)
        dispatch(spotDetails(spotDeets))
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
