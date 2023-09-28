import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS"


const allReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}/reviews`)

    if (response.ok) {
        const data = await response.json()
        const reviews = data.Reviews
        dispatch(allReviews(reviews))
        console.log(reviews)
        // return reviews
    }
}


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_REVIEWS:
            action.reviews.forEach((review) => newState[review.id] = review);
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
