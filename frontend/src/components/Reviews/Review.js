import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewFormModal from '../DeleteReviewFormModal';

function Review({ review, user }) {
    // const dispatch = useDispatch()
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
        <div>
            <div className='singleReview'>
                <h4>{review.User.firstname}</h4>
                {(user && user.id === review.User.id) &&
                    <OpenModalButton
                        buttonText='Delete'
                        onButtonClick={closeMenu}
                        modalComponent={<DeleteReviewFormModal review={review} />}
                    />}
            </div>
            <p>{review.review}</p>
        </div>
    )
}

export default Review;