import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Card(props) {
    const {card} = props;
    const {link, name, likes, owner} = card;
    const currentUser = useContext(CurrentUserContext);

    const isOwn = owner._id === currentUser._id;
    const isLiked = likes.some(like => like._id === currentUser._id);

    const cardLikeButtonClassName = `card__heart ${isLiked ? 'card__heart_active' : ''}`;
    const cardDeleteButtonClassName = isOwn ? 'card__button-delete' : '';

    const handleLikeClick = () => {
        props.onCardLike(card);
    };
    const handleDeleteClick = () => {
        props.onCardDelete(card);
    };
    const handleClick = () => {
        props.onCardClick(props.card);
    };

    return (
        <div className="card">
            <div className={cardDeleteButtonClassName} onClick={handleDeleteClick}></div>
            <img className="card__image" src={link} alt={name} onClick={handleClick}></img>
            <div className="card__group">
                <h2 className="card__title">{name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} name="card__heart" type="button" value="heart"
                            onClick={handleLikeClick}></button>
                    <p className="card__likes">{likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
