import {useRef, useState} from "react";
import {withRouter} from "react-router-dom";

function Register(props) {
    const {onSubmit} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const inputEmail = useRef();
    const inputPassword = useRef();
    const inputConfirmPassword = useRef();

    const handleInputEmail = () => {
        setEmail(inputEmail.current.value);
    }
    const handleInputPassword = () => {
        setPassword(inputPassword.current.value);
    }
    const handleInputConfirmPassword = () => {
        setConfirmPassword(inputConfirmPassword.current.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            onSubmit(email, password)
                .catch(err => {
                        console.log(err.message || 'Что то пошло не так')
                    }
                )
        }
    }

    return (
        <main className="registration registration__content page__content">
            <div className="registration__container">
                <h2 className="registration__title">Регистрация</h2>
                <form className="registration__form" name="form" id="form-with-registration" onSubmit={handleSubmit}>
                    <input className="registration__input registration__input_type_email " type="email"
                           placeholder="Email" name="email" id="register-input-email" onChange={handleInputEmail}
                           ref={inputEmail} value={email}></input>
                    <span className="registration__error" id="registration-input-email-error"></span>
                    <input className="registration__input registration__input_type_password " type="password"
                           placeholder="Пароль" name="password" id="register-input-password"
                           onChange={handleInputPassword} ref={inputPassword} value={password}></input>
                    <span className="registration__error" id="registration-input-password-error"></span>
                    <input className="registration__input registration__input_type_confirm-password " type="password"
                           placeholder="Подтвердите пароль" name="confirmation" id="register-input-confirm-password"
                           onChange={handleInputConfirmPassword} ref={inputConfirmPassword}
                           value={confirmPassword}></input>
                    <span className="registration__error" id="registration-input-confirm-password-error"></span>
                    <button className="button registration__button-submit" type="submit">Зарегистрироваться</button>
                </form>
                <div className="registration__comein">
                    <p>Уже зарегистрированы?
                        <a className="registration__login-link" href="/sign-in"> Войти</a>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default withRouter(Register);
