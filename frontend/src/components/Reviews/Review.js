import React, { useRef, useEffect, useState } from 'react';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewFormModal from '../DeleteReviewFormModal';

function Review({ spot, review, user }) {
    // const dispatch = useDispatch()
    const reviewDate = new Date(review.createdAt)
    const reviewMonth = reviewDate.toLocaleString('default', { month: 'long' })
    const reviewYear = reviewDate.getFullYear()

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
                <h4>{review?.User?.firstName}</h4>
                <h4>{reviewMonth} {reviewYear}</h4>
                <p>{review?.review}</p>
                {(user && user?.id === review?.User?.id) &&
                    <OpenModalButton
                        buttonText='Delete'
                        onButtonClick={closeMenu}
                        modalComponent={<DeleteReviewFormModal spot={spot} review={review} />}
                    />}
            </div>

        </div>
    )
}

export default Review;
