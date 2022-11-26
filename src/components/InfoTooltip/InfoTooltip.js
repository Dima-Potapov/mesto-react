import React from 'react';
import fail from '../../images/svg/fail.svg';
import success from '../../images/svg/success.svg';
import {useLocation} from 'react-router-dom';

const InfoTooltip = (props) => {
    const pathname = useLocation().pathname;
    const {isOpen, onClose, isSuccess} = props;

    const getTextMessage = () => {
        if (pathname === '/sign-in' || pathname === '/sign-up') {
            return isSuccess
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз.";
        }

        return '';
    }

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container-tooltip">
                <img className="popup__image-tooltip" src={isSuccess ? success : fail} alt="Статус картинка"></img>
                <p className="popup__tooltip">{getTextMessage()}</p>
                <button className="popup__button-close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;
