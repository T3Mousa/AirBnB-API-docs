import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";

const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const data = await response.json()
        const spots = data.Spots
        dispatch(allSpots(spots))
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SPOTS:
            const newState = { ...state }
            action.spots.forEach((spot) => newState[spot.id] = spot);
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
