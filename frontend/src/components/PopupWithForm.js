import React, { useEffect } from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, children, onSubmit }) {

    useEffect(() => {
        const handleEscClick = (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscClick)
        }

        return () => {
            document.removeEventListener('keydown', handleEscClick)
        }
    }, [isOpen])


    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            onClose()
        }
    }
    // "popup__input-disabled" класс для неактивной кнопки 
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
            onClick={handleOverlayClick}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}>
                </button>
                <h2 className="popup__title">{title}</h2>
                <form
                    name={`${name}-form`}
                    className={`popup__form popup__form_${name}`}
                    onSubmit={onSubmit}
                    noValidate>
                    {children}
                    <button type="submit" name="submit" value="submit"
                        className="popup__input-save">{buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;