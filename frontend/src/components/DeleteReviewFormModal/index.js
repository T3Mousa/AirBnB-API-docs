import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteReviewFormModal.css'
import { deleteSpotReview } from '../../store/reviews';

function DeleteReviewFormModal({ spot, review }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const confirmDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteSpotReview(review.id, spot.id))
            .then(closeModal)
    };

    const cancelDelete = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="deleteReviewForm">
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this review?</h3>
            <div className='deleteReviewModalButtons'>
                <button className='deleteReviewButton' onClick={confirmDelete}>
                    Yes (Delete Review)
                </button>
                <button className='cancelDeleteReviewButton' onClick={cancelDelete}>
                    No (Keep Review)
                </button>
            </div>
        </div>
    )
}

export default DeleteReviewFormModal;
