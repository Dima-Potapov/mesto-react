import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import {useCallback, useEffect, useState} from "react";
import {api} from "../../utils/api";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {CardContext} from "../../contexts/CardContext";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import {Route, Switch, useHistory, withRouter} from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../Auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

// Функционал реализовал, но не получилось побороть несколько моментов, ниже их описал. Могли бы вы помочь с ними?
// Когда изменил состояние isAuthChecking не отобразился контент компоненты Main, а сработал защита урла, хотя урл поменялся.
// Я смотрел меняется ли значение isAuthChecking после выполнения setIsAuthChecking(true), и это состояние не меняется даже спустя секунду. Можете подсказать в чём проблема?

function App() {
    const initUserData = {email: ''};
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isOpenAuthMessage, setIsOpenAuthMessage] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userData, setUserData] = useState(initUserData);
    const [isAuthChecking, setIsAuthChecking] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const history = useHistory();

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
        setIsOpenAuthMessage(false);
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

    const handleRegister = (email, password) => {
        return auth.register(email, password)
            .then(res => {
                if (!res || res.statusCode === 400) {
                    throw new Error(`Ошибка: ${res.message}`)
                }

                setIsOpenAuthMessage(true);
                setIsSuccess(true);

                return res;
            })
            .catch(err => {
                setIsOpenAuthMessage(true);
                setIsSuccess(false);
                return err;
            })
    }

    const tokenCheck = useCallback(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            auth.getUserData(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true);
                        setUserData({
                            email: res.data.email
                        })
                        setIsAuthChecking(true);
                        history.push('/');
                    }
                })
                .catch(() =>
                    setIsAuthChecking(false)
                )
        } else {
            setIsAuthChecking(false)
        }
    }, [history])

    const handleLogin = (email, password) => {
        return auth.authorize(email, password)
            .then(res => {
                if (!res || res.statusCode === 400 || res.statusCode === 401) throw new Error(`Ошибка: ${res.message}`);
                if (res.token) {
                    setIsOpenAuthMessage(true);
                    setIsSuccess(true);
                    setIsLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                }
            })
            .then(tokenCheck)
            .catch(err => {
                setIsOpenAuthMessage(true);
                setIsSuccess(false);
                return err;
            })
    }

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        setUserData(initUserData);
        setIsLoggedIn(false);
        history.push('/sign-in');
    }

    useEffect(() => {
        tokenCheck();
    }, [tokenCheck])

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

    return (
        <div className="page">
            <CardContext.Provider value={cards}>
                <CurrentUserContext.Provider value={currentUser}>
                    <Header userData={userData} onSignOut={handleSignOut}/>
                    <Switch>
                        <Route path="/sign-up" exact>
                            <Register onSubmit={handleRegister}/>
                        </Route>

                        <Route path="/sign-in" exact>
                            <Login onSubmit={handleLogin}/>
                        </Route>

                        <ProtectedRoute path="/" isLoggedIn={isLoggedIn} isChecking={isAuthChecking}>
                            <Main setCards={setCards} cards={cards} onCardLike={handleCardLike}
                                  onCardDelete={handleCardDelete} onEditAvatar={handleEditAvatarClick}
                                  onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick}
                                  onCardClick={handleCardClick}/>
                        </ProtectedRoute>
                    </Switch>

                    <Footer/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddCard={handleAddPlaceSubmit}/>

                    <PopupWithForm name={'question-delete-card-popup'} title={'Вы уверены?'} buttonText={'Да'}
                                   additionalClass={'popup__forms_question'}>
                    </PopupWithForm>

                    <InfoTooltip isOpen={isOpenAuthMessage} onClose={closeAllPopups} isSuccess={isSuccess}/>

                    <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>
                </CurrentUserContext.Provider>
            </CardContext.Provider>
        </div>
    );
}

export default withRouter(App);
