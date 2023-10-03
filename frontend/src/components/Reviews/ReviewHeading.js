import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateReviewFormModal from '../CreateReviewFormModal';
import './Reviews.css'
import { getAllSpotReviews } from '../../store/reviews';

function ReviewHeading({ user, reviews, spot, spotReviewedByUser, spotOwnedByUser }) {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => {
        setShowMenu(false)

    }

    return (
        <div className='reviewHeading'>
            <h2><i className="fa-solid fa-star"></i>
                {spot.avgStarRating ? spot.avgStarRating : "New"}
                {spot.avgStarRating && " · "}
                {spot.avgStarRating ? spot.numReviews : ""}
                {spot.numReviews === 0 && ""}
                {spot.numReviews == 1 && " review"}
                {spot.numReviews >= 2 && " reviews"}

            </h2>
            {user && !spotReviewedByUser && !spotOwnedByUser &&
                <OpenModalButton
                    className="postReviewButton"
                    buttonText='Post Your Review'
                    onButtonClick={closeMenu}
                    modalComponent={<CreateReviewFormModal spotId={spot.id} />}
                />
            }
        </div>
    )
}

export default ReviewHeading;
