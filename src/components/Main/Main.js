import React from "react";
import {api} from "../../utils/api";
import Card from "../Card/Card";

function Main(props) {
    const [userName, setUserName] = React.useState(''),
        [userDescription, setUserDescription] = React.useState(''),
        [userAvatar, setUserAvatar] = React.useState(''),
        [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserData()
            .then(userData => {
                setUserName(userData.name)
                setUserDescription(userData.about)
                setUserAvatar(userData.avatar)
            })
            .catch((err) => {
                console.log(err);
            });

        api.getInitCards()
            .then(cards => {
                setCards(cards)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className="content">
             <section className="profile">
                <div className="profile__photo">
                    <div className="profile__photo-edit" onClick={props.onEditAvatar}></div>
                    <img className="profile__photo-image" alt="фотография" src={userAvatar}></img>
                </div>
                <div className="profile__information">
                    <div className="profile__group">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit" name="profile__edit" type="button" value="edit" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button className="profile__button" name="profile__button" type="button" value="add" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {cards.map(card => (<Card card={card} onCardClick={props.onCardClick} key={card._id}></Card>))}
            </section>
      </main>
    );
}

export default Main;
