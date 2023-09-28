import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewHeading from '../Reviews/ReviewHeading';
import Review from '../Reviews/Review';

function Reviews({ spot, reviews }) {
    const sessionUser = useSelector(state => state.session.user);
    if (!reviews) return;
    const spotReviewedByUser = sessionUser && reviews?.some((review) => review.User.id === sessionUser.id)
    const spotOwnedByUser = sessionUser && spot.ownerId === sessionUser.id
    return (
        <div>
            <ReviewHeading user={sessionUser} reviews={reviews} spot={spot} spotReviewedByUser={spotReviewedByUser} spotOwnedByUser={spotOwnedByUser} />
            <div className='reviews'>
                {reviews.map((review, i) => <Review key={i} review={review} user={sessionUser} />)}
            </div>
        </div>
    )
}


export default Reviews;
