import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpot } from '../../store/userSpots';
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
            <div className='deleteSpotModalButtons'>
                <button className='deleteSpotButton' onClick={confirmDelete} style={{ fontFamily: "Nunito, cursive", fontWeight: "bold" }}>
                    Yes (Delete Spot)
                </button>
                <button className='cancelDeleteSpotButton' onClick={cancelDelete} style={{ fontFamily: "Nunito, cursive", fontWeight: "bold" }}>
                    No (Keep Spot)
                </button>
            </div>
        </div>
    )
}

export default DeleteSpotFormModal;
