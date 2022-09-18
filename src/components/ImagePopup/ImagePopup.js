function ImagePopup(props) {
    return(
      <div className={`popup ${props.card ? 'popup_opened': ''}`} id="show-image-popup" data-type="picture">
        <figure className="popup__picture">
          <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}></img>
            <figcaption className="popup__picture-title">{props.card ? props.card.name : ''}</figcaption>
            <button className="popup__button-close" id="close-show-image" type="button" onClick={props.onClose}></button>
        </figure>
      </div>
    );
}

export default ImagePopup;
