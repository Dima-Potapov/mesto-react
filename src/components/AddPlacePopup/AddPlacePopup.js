import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useEffect, useRef, useState} from "react";

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const inputName = useRef();
    const inputLink = useRef();

    const handleInputName = () => {
        setName(inputName.current.value);
    }
    const handleInputLink = () => {
        setLink(inputLink.current.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        props.onAddCard({
            name,
            link,
        });
    }

    useEffect(() => {
        setLink('');
        setName('');
    }, [props.isOpen]);

    return (
        <PopupWithForm name='add-card-popup' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} buttonText='Создать' onSubmit={handleSubmit}>
            <div className="popup__form-group">
                <input className="popup__input" id="new-image-name" name="name" type="text" onChange={handleInputName} ref={inputName} value={name}
                       placeholder="Название" minLength="2" maxLength="30" required></input>
                <span id="new-image-name-error" className="popup__form-error"></span>
            </div>
            <div className="popup__form-group">
                <input className="popup__input" id="new-image-link" name="link" type="url" onChange={handleInputLink} ref={inputLink} value={link}
                       placeholder="Ссылка на картинку" required></input>
                <span id="new-image-link-error" className="popup__form-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup
