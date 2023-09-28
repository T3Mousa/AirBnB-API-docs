import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"


const allReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const data = await response.json()
        const reviews = data.Reviews
        dispatch(allReviews(reviews))
        console.log(reviews)
        return reviews
    }
}

export const postReview = (spotId, reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewData)
    })

    const newReview = await response.json()
    dispatch(createReview(newReview))
    return newReview
}


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_REVIEWS:
            action.reviews.forEach((review) => newState[review.id] = review);
            return newState;
        case CREATE_REVIEW:
            return { ...state, [action.review.id]: action.review };
        default:
            return state;
    }
}

export default reviewsReducer;
