import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import {useEffect, useState} from "react";
import {api} from "../../utils/api";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {CardContext} from "../../contexts/CardContext";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        api.getUserData()
            .then(userData => setCurrentUser(userData))
            .then(() => {
                api.getInitCards()
                    .then(cards => {
                        setCards(cards)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

  const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
      };
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
      };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
      };
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
      };
    const handleCardClick = (card) => {
        setSelectedCard(card)
      };
    const handleUpdateUser = (userData) => {
          api.editUserData(userData)
              .then(newUserData => {
                  setCurrentUser(newUserData);

                  closeAllPopups();
              })
              .catch((err) => {
                  console.log(err);
              });
      };
    const handleUpdateAvatar = (avatar) => {
          api.editUserAvatar(avatar)
              .then(newUserData => {
                  setCurrentUser(newUserData);

                  closeAllPopups();
              })
              .catch((err) => {
                  console.log(err);
              });
      };
    const handleAddPlaceSubmit = (newCard) => {
          api.addCard(newCard)
              .then(newUserData => {
                  setCards([newUserData, ...cards]);

                  closeAllPopups();
              })
              .catch((err) => {
                  console.log(err);
              });
      };
    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then((res) => {
                setCards(cards => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

  return (
    <div className="page">
        <CardContext.Provider value={cards}>
            <CurrentUserContext.Provider value={currentUser}>
              <Header />
              <Main setCards={setCards} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick} />
              <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />

                <PopupWithForm name={'question-delete-card-popup'} title={'Вы уверены?'} buttonText={'Да'} additionalClass={'popup__forms_question'}>
                </PopupWithForm>


                <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>
            </CurrentUserContext.Provider>
        </CardContext.Provider>
    </div>
  );
}

export default App;
