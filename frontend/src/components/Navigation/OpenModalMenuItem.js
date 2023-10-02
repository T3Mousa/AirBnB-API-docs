import React from 'react';
import { useModal } from '../../context/Modal';
import './Navigation.css'

function OpenModalMenuItem({ modalComponent, itemText, onItemClick, onModalClose }) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    }
    return (
        <>
            <div onClick={onClick} style={{ fontFamily: "Nunito, cursive", fontWeight: "bold" }}>{itemText}</div>
        </>
    )
}

export default OpenModalMenuItem;
