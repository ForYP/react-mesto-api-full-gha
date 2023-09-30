import React, { useEffect, useState } from 'react'; // импорт библиотеки
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup'
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import * as auth from '../utils/auth.js';


function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);
  const [isDeleteCardLoading, setIsDeleteCardLoading] = useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    handleCheckToken();
  }, []);

  function handleCheckToken() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.checkToken(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email); // setEmail(res.data.email);
            navigate('/', { replace: true });
          }

        })
        .catch(console.error)
    }
  }

  function handleRegister({ password, email }) {
    auth.register(password, email)
      .then((data) => {
        if (data) {
          setIsSuccess(true);
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }

  function handleLogin({ password, email }) {
    auth.authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          api.setToken(res.token);
          setLoggedIn(true);
          setEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
      })
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(console.error)
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((c) => c === currentUser._id);
    return api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error)
  }

  function handleCardDelete(card) {
    setIsDeleteCardLoading(true)
    return api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => setIsDeleteCardLoading(false))
  }

  function handleUpdateUser(value) {
    setIsEditProfileLoading(true)
    return api.updateUserInfo(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsEditProfileLoading(false))
  }

  function handleUpdateAvatar(value) {
    setIsEditAvatarLoading(true)
    return api.updateAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsEditAvatarLoading(false))
  }

  function handleAddPlaceSubmit(value) {
    setIsAddPlaceLoading(true)
    return api.updateCards(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsAddPlaceLoading(false))
  }

  function handleOpenCardDeletePopup(card) {
    setIsDeleteCardPopupOpen(true);
    setCardDelete(card);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__conteiner">

        <Header onSignOut={handleSignOut} email={email} />
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={
            <ProtectedRoute
              path="/"
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleOpenCardDeletePopup}
              onClose={closeAllPopups}
            />
          } />
          <Route
            path="*"
            element={
              !loggedIn ? <Navigate to="/sign-up" /> : <Navigate to="/" />
            }
          />
        </Routes>

        {loggedIn && <Footer />}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isEditAvatarLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isEditProfileLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isAddPlaceLoading}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={cardDelete}
          isLoading={isDeleteCardLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;