function Card(props) {
    const {card} = props;
    const {link, name, likes} = card;

    const handleClick = () => {
        props.onCardClick(props.card);
    }

    return (
    <div className="card">
      <div className="card__button-delete"></div>
      <img className="card__image" src={link} alt={name} onClick={handleClick}></img>
        <div className="card__group">
          <h2 className="card__title">{name}</h2>
          <div>
            <button className="card__heart" name="card__heart" type="button" value="heart"></button>
            <p className="card__likes">{likes.length}</p>
          </div>
        </div>
    </div>
    )
}

export default Card;
