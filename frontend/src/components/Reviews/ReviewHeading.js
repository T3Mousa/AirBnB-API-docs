import React from 'react';
import { useDispatch } from 'react-redux';

function ReviewHeading({ user, reviews, spot, spotReviewedByUser, spotOwnedByUser }) {

    return (
        <div className='reviewHeading'>
            <h2><i className="fa-solid fa-star"></i>
                {!reviews && "New"}
                {spot.avgStarRating ? spot.avgStarRating : "New"} &middot; {spot.avgStarRating ? spot.numReviews : ""} {spot.numReviews && "reviews"}
            </h2>
            {reviews && user && !spotReviewedByUser && !spotOwnedByUser && <button className="createReviewButton">Post Your Review</button>}
        </div>
    )
    if (!reviews) {
        return (
            <div className='reviewHeading'>
                <h2>
                    <i className="fa-solid fa-star"></i> New
                </h2>
                {user && !spotOwnedByUser && <button className="createReviewButton">Post Your Review</button>}
            </div>
        )
    }
}

export default ReviewHeading;
