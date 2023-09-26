import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpot } from '../../store/spots';
import './DeleteSpotFormModal.css'

function DeleteSpotFormModal({ spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const confirmDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteSpot(spotId))
            .then(closeModal)
    };

    const cancelDelete = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="deleteSpotForm">
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to remove this spot from the listings?</h3>
            <div className='deleteModalButtons'>
                <button className='deleteButton' onClick={confirmDelete}>
                    Yes (Delete Spot)
                </button>
                <button className='cancelButton' onClick={cancelDelete}>
                    No (Keep Spot)
                </button>
            </div>
        </div>
    )
}

export default DeleteSpotFormModal;
