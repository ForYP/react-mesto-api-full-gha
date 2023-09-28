import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input
                onChange={handleNameChange}
                value={name || ''}
                type="text"
                id="profile-name"
                name="name"
                minLength="2"
                maxLength="40"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                required />

            <span id="error-profile-name" className="popup__error-message" />

            <input
                onChange={handleDescriptionChange}
                value={description || ''}
                type="text"
                id="profile-status"
                name="status"
                minLength="2"
                maxLength="200"
                className="popup__input popup__input_type_status"
                placeholder="О себе"
                required />

            <span id="error-profile-status" className="popup__error-message" />

        </PopupWithForm>
    )
}

export default EditProfilePopup;