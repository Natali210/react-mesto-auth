import { useState, useEffect } from "react";
import "../index.css";
import Header from './Header';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";

function App() {
  //Создаем переменные, отвечающие за видимость попапов, чтобы изменять их значения при клике
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({}); 
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //Эффект, который вызывает Api по пользователю для обновления значений
  useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }, []);
  
  //Эффект, который вызывает Api для получения карточек
  useEffect(() => {
    api.getCards()
    .then((cards) => {
      setCards(cards);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }, []);

  //Обработчик для открытия попапа с изображением
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImageOpen(true);
  }

  //Обработчик для обновления лайков
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
      
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => 
      (c._id === card._id ? newCard : c)));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  //Обработчик, обновляющий стейт cards - создается копия массива без удаленой карточки
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  
  //Обработчик, обновляющий стейт по пользователю после завершения api-запроса
  function handleUpdateUser(data) {
    api.setProfileInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
  }

  //Обработчик, обновляющий стейт по аватару после завершения api-запроса
  function handleUpdateAvatar(currentUser) {
    api.addNewAvatar(currentUser)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });     
  }

  //Обработчик, обновляющий стейт карточек после завершения api-запроса
  function handleAddPlace(card) {
    api.addCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">

        <Header />

        <Main 
          //Обработчики кликов на кнопки
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonTitle="Да">
        </PopupWithForm>

        <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlace}/>

        <ImagePopup 
          name="imagePopup"
          card={selectedCard} 
          isImageOpen={isImageOpen} 
          onClose={closeAllPopups}
        />

        <Footer />
      </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;