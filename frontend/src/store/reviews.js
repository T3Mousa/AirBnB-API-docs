import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/GET_REVIEWS"
const CREATE_SPOT_REVIEW = "reviews/CREATE_REVIEW"


const allSpotReviews = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_SPOT_REVIEW,
    review
})

export const getAllSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const data = await response.json()
        const spotReviews = data.Reviews
        dispatch(allSpotReviews(spotReviews))
        console.log(spotReviews)
        return spotReviews
    }
}

export const postReview = (spotId, reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewData)
    })

    const newReview = await response.json()
    console.log(newReview)
    dispatch(createReview(newReview))
    return newReview
}


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            let spotReviewState = {}
            action.reviews.forEach((review) => spotReviewState[review.id] = review);
            return spotReviewState;
        case CREATE_SPOT_REVIEW:
            return { ...state, [action.review.id]: action.review };
        default:
            return state;
    }
}

export default reviewsReducer;
