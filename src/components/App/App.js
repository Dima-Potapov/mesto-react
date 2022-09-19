import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from "../ImagePopup/ImagePopup";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);


  const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
      },
      handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
      },
      handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
      },
      closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
      },
      handleCardClick = (card) => {
        setSelectedCard(card)
      };

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick} />
      <Footer />

        <PopupWithForm name={'edit-profile-popup'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText={'Сохранить'}>
            <div className="popup__form-group">
                <input className="popup__input" id="username" name="name" type="text" value="" placeholder="Имя"
                       minLength="2" maxLength="40" required></input>
                <span id="username-error" className="popup__form-error"></span>
            </div>
            <div className="popup__form-group">
                <input className="popup__input" id="about" name="about" type="text" value=""
                       placeholder="Профессия" minLength="2" maxLength="200" required></input>
                <span id="about-error" className="popup__form-error"></span>
            </div>
        </PopupWithForm>

        <PopupWithForm name={'add-card-popup'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText={'Создать'}>
            <div className="popup__form-group">
                <input className="popup__input" id="new-image-name" name="name" type="text" value=""
                       placeholder="Название" minLength="2" maxLength="30" required></input>
                <span id="new-image-name-error" className="popup__form-error"></span>
            </div>
            <div className="popup__form-group">
                <input className="popup__input" id="new-image-link" name="link" type="url" value=""
                       placeholder="Ссылка на картинку" required></input>
                <span id="new-image-link-error" className="popup__form-error"></span>
            </div>
        </PopupWithForm>

        <PopupWithForm name={'edit-profile-image'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText={'Сохранить'}>
            <div className="popup__form-group">
                <input className="popup__input" id="new-image-photo" name="link" type="url" value=""
                       placeholder="Ссылка на картинку" required></input>
                <span id="new-image-photo-error" className="popup__form-error"></span>
            </div>
        </PopupWithForm>

        <PopupWithForm name={'question-delete-card-popup'} title={'Вы уверены?'} buttonText={'Да'} additionalClass={'popup__forms_question'}>
        </PopupWithForm>


        <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>

    </div>
  );
}

export default App;
