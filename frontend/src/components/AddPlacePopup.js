import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);


    function handlePlaceChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name, link });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            buttonText={isLoading ? 'Сохранение...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input
                id="card-title"
                type="text"
                name="name"
                className="popup__input popup__input_type_title"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                value={name || ""}
                onChange={handlePlaceChange}
            />
            <span id="error-card-title" className="popup__error-message"></span>
            <input
                id="card-link"
                type="url"
                name="link"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                required
                onChange={handleLinkChange}
                value={link || ""}
            />
            <span id="error-card-link" className="popup__error-message"></span>

        </PopupWithForm>
    );
}

export default AddPlacePopup;