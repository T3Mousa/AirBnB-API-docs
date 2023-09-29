import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews';

function CreateReviewFormModal({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const submitDisabled = !(review.length >= 10 && stars)



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const reviewInfo = {
            review,
            stars
        }

        await dispatch(postReview(spotId, reviewInfo))
            .then((res) => {
                if (res.message) {
                    setErrors({ message: res.message })
                } else {
                    closeModal()
                    history.push(`/spots/${spotId}`)
                }
            })

    }

    return (
        <div className='signUpForm'>
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit}>
                <p className='errors'>
                    {errors.message ? `${errors.message}` : ""}
                </p>
                <label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Leave your review here..."
                        style={{ height: "200px" }}
                    />
                </label>
                <label>
                    <select
                        name='rating'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option value=''>Stars</option>

                    </select>
                </label>
                {/* <label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            // onClick={handleRatingClick(star)}
                            onClick={(star) => setStars(star)}
                            className={star <= stars ? 'selected' : ''}
                        >
                        </button>
                    ))}
                </label> */}
                <button type='submit' disabled={submitDisabled}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default CreateReviewFormModal;
