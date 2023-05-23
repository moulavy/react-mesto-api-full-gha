
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login'
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api'
import { register, authorize, checkToken } from '../utils/auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import positiveImg from '../images/Union-plus.svg';
import negativeImg from '../images/Union.svg';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ data: { name: "Имя", about: "Описание", avatar: "https://www.nchti.ru/wp-content/images/profile-anonymous2.png" } });
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [tooltip, setTooltip] = React.useState({ image: positiveImg, text: 'Вы успешно зарегистрировались!' });

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isTooltipPopupOpen;

  const loginCallback = (email, password) => {
    authorize(email, password)
      .then((data) => {
        if (data.message === "Успешно вошли.") {
          localStorage.setItem('isAuth', true);
          setLoggedIn(true);
          setEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setTooltip({ image: negativeImg, text: "Что-то пошло не так! Попробуйте еще раз." });
        setIsTooltipPopupOpen(true);
        handleTooltip();
        console.log(err);
      })
  }

  const registerCallback = (email, password) => {
    register(email, password)
      .then(() => {
        setTooltip({ image: positiveImg, text: "Вы успешно зарегистрировались!" });
        handleTooltip();
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        setTooltip({ image: negativeImg, text: "Что-то пошло не так! Попробуйте еще раз." });
        handleTooltip();
        console.log(err);
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
      })
  }

  const tokenCheckCallback = () => {
    const isAuth = localStorage.getItem('isAuth');
    if (isAuth) {
      checkToken()
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const logoutCallback = () => {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('isAuth');
    navigate("/signin", { replace: true });
  }

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
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleTooltip() {
    setIsTooltipPopupOpen(true);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => card._id !== item._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item === currentUser.data._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item))
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item))
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  React.useEffect(() => {
    tokenCheckCallback();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([resUser, resCards]) => {
          setCurrentUser(resUser);
          setCards(resCards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onLogout={logoutCallback} />
        <Routes>
          <Route path="/" element={<ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            email={email}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />}
          />
          <Route path="/signin" element={<Login onLogin={loginCallback} />} />
          <Route path="/signup" element={<Register onRegister={registerCallback} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        </Routes>
        <InfoTooltip tooltip={tooltip} isOpen={isTooltipPopupOpen} onClose={closeAllPopups}></InfoTooltip>
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          textButton='Да'
          button='confirm'
        />
        <EditAvatarPopup isLoading={isLoading} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isLoading={isLoading} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
