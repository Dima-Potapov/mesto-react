import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useContext, useEffect, useState, useRef} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
    const [avatar, setAvatar] = useState('');
    const inputAvatar = useRef();
    const currentUser = useContext(CurrentUserContext);

    const handleInputAvatar = () => {
        setAvatar(inputAvatar.current.value);
    },
        handleSubmit = (event) => {
        event.preventDefault();

        props.onUpdateAvatar(avatar);
    };

    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser]);

    return (
        <PopupWithForm name={'edit-profile-image'} title={'Обновить аватар'} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
            <div className="popup__form-group">
                <input className="popup__input" id="new-image-photo" name="link" type="url" ref={inputAvatar} onChange={handleInputAvatar}
                       placeholder="Ссылка на картинку" required></input>
                <span id="new-image-photo-error" className="popup__form-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
