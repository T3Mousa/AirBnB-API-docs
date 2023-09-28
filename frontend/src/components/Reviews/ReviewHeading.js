import React from 'react';
import { useDispatch } from 'react-redux';

function ReviewHeading({ user, reviews, spot, spotReviewedByUser, spotOwnedByUser }) {

    if (reviews) {
        return (
            <div className='reviewHeading'>
                <h2>
                    {spot.avgStarRating && <i className="fa-solid fa-star"></i>} {spot.avgStarRating} &middot; {spot.numReviews} review{spot.numReviews === 1 ? "" : "s"}
                </h2>
                {user && !spotReviewedByUser && !spotOwnedByUser && <button className="createReviewButton">Post Your Review</button>}
            </div>
        )
    }
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
