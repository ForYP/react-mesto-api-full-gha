import React, { useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = currentUser.avatar;
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(
            avatarRef.current.value,
        );
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input
                id="avatar-link"
                type="url"
                name="link"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                required
                ref={avatarRef}
            />

            <span id="error-avatar-link" className="popup__error-message"></span>

        </PopupWithForm>
    );
}

export default EditAvatarPopup;