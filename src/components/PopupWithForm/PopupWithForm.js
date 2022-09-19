function PopupWithForm(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened': ''}`}>
            <form className="popup__container" name={props.name} noValidate>
                <h3 className="popup__title">{props.title}</h3>
                <fieldset className={`popup__forms ${props.additionalClass ?? ''}`}>
                    {props.children}
                    <button className="popup__button-save" type="submit">{props.buttonText}</button>
                </fieldset>
                <button className="popup__button-close" type="button" onClick={props.onClose}></button>
            </form>
        </div>
    );
}

export default PopupWithForm;
