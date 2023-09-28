import React, { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card);
    };

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);

    return (

        <article className="element">
            {isOwn && <button
                className="element__del"
                type="button"
                onClick={handleDeleteClick}
            />}
            <img
                src={card.link}
                alt={card.name}
                className="element__photo"
                onClick={handleClick}
            />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}>
                    </button>
                    <p className="element__reaction-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>

    )
}

export default Card;