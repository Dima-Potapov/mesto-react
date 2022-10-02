import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useState, useEffect, useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    const currentUser = useContext(CurrentUserContext);

    const handleInputDescription = (event) => {
        setDescription(event.target.value);
    },
        handleInputName = (event) => {
        setName(event.target.value);
    },
        handleSubmit = (event) => {
        event.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm name={'edit-profile-popup'} title={'Редактировать профиль'} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
            <div className="popup__form-group">
                <input className="popup__input" id="username" name="name" type="text" placeholder="Имя" value={name}
                       minLength="2" maxLength="40" required onChange={handleInputName}></input>
                <span id="username-error" className="popup__form-error"></span>
            </div>
            <div className="popup__form-group">
                <input className="popup__input" id="about" name="about" type="text" value={description}
                       placeholder="Профессия" minLength="2" maxLength="200" required onChange={handleInputDescription}></input>
                <span id="about-error" className="popup__form-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;