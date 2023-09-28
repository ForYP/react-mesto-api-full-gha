import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import editAvatar from '../images/edit-avatar.svg';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
            <img className="profile__edit-avatar" src={editAvatar} alt="Редактировать профиль" />
          </div>
          <div className="profile__info">
            <div className="profile__united">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))
        }
      </section>
    </main>
  );
}

export default Main;




