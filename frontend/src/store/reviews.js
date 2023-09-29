import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/GET_SPOT_REVIEWS"
const CREATE_SPOT_REVIEW = "reviews/CREATE_SPOT_REVIEW"
const DELETE_SPOT_REVIEW = "reviews/DELETE_SPOT_REVIEW"


const allSpotReviews = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_SPOT_REVIEW,
    review
})

const deleteReview = (reviewId) => ({
    type: DELETE_SPOT_REVIEW,
    reviewId,
});

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
    if (newReview.id) {
        console.log(newReview)
        dispatch(createReview(newReview))
        return newReview
    }
    else {
        return newReview
    }
}

export const deleteSpotReview = (reviewId) => async (dispatch) => {
    // console.log(reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    // const review = await response.json()
    console.log(response)
    dispatch(deleteReview(reviewId))
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
        case DELETE_SPOT_REVIEW:
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
