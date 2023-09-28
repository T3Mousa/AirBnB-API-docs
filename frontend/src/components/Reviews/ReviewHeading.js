import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateReviewFormModal from '../CreateReviewFormModal';

function ReviewHeading({ user, reviews, spot, spotReviewedByUser, spotOwnedByUser }) {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()
    console.log(user)
    console.log(spot)
    console.log(reviews)
    console.log(spotReviewedByUser)
    console.log(spotOwnedByUser)
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
                {!reviews && "New"}
                {spot.avgStarRating ? spot.avgStarRating : "New"} &middot; {spot.avgStarRating ? spot.numReviews : ""} {spot.numReviews && "reviews"}
            </h2>
            {user && !spotReviewedByUser && !spotOwnedByUser &&
                <OpenModalButton
                    buttonText='Post Your Review'
                    onButtonClick={closeMenu}
                    modalComponent={<CreateReviewFormModal spotId={spot.id} />}
                />
            }
        </div>
    )
    // if (!reviews) {
    //     return (
    //         <div className='reviewHeading'>
    //             <h2>
    //                 <i className="fa-solid fa-star"></i> New
    //             </h2>
    //             {user && !spotOwnedByUser && <button className="createReviewButton">Post Your Review</button>}
    //         </div>
    //     )
    // }
}

export default ReviewHeading;
