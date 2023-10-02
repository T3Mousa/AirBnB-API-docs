import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal';
import { FaStar } from 'react-icons/fa'
import { postReview } from '../../store/reviews';
import './CreateReviewFormModal.css'

function CreateReviewFormModal({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(null)
    const [hover, setHover] = useState(null)
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const submitDisabled = !(review.length >= 10 && stars > 0)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const reviewInfo = {
            review,
            stars
        }

        await dispatch(postReview(spotId, reviewInfo))
            .then((res) => {
                console.log(res)
                if (res.message) {
                    setErrors({ message: res.message })
                } else {
                    closeModal()
                    history.push(`/spots/${spotId}`)
                }
            })

    }

    return (
        <div className='createReviewForm'>
            <form className="createReviewFormModal" onSubmit={handleSubmit}>
                <h1>How was your stay?</h1>
                <p className='errors'>
                    {errors.message ? `${errors.message}` : ""}
                </p>
                <div className='reviewText'>
                    <label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Leave your review here..."
                            style={{ height: "200px" }}
                        />
                    </label>
                </div>
                <div className='starRating'>
                    {[1, 2, 3, 4, 5].map((star, i) => {
                        const starValue = i + 1
                        return (
                            <label>
                                <input
                                    type='radio'
                                    key={i}
                                    name='star'
                                    value={starValue}
                                    onClick={() => setStars(starValue)}
                                // className={`${starValue <= (hover || rating) ? 'gold' : 'gray'}`}

                                />
                                <FaStar
                                    className='star'
                                    color={starValue <= (hover || stars) ? "gold" : "gray"}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseOut={() => setHover(null)}
                                />
                            </label>
                        )
                    })
                    }
                    Stars</div>
                <div className='submitReviewButton'>
                    <button
                        type='submit'
                        disabled={submitDisabled}
                    >
                        Submit Your Review
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateReviewFormModal;
