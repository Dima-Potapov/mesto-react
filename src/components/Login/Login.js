import {useRef, useState} from "react";
import {withRouter} from "react-router-dom";

function Login(props) {
    const {onSubmit} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputEmail = useRef();
    const inputPassword = useRef();

    const handleInputEmail = () => {
        setEmail(inputEmail.current.value);
    }
    const handleInputPassword = () => {
        setPassword(inputPassword.current.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password && email) {
            onSubmit(email, password)
                .catch(err => {
                        console.log(err.message || 'Что то пошло не так')
                    }
                )
        }
    }

    return (
        <main className="login content page__content">
            <div className="login__container">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" name="form" id="form-with-login" onSubmit={handleSubmit}>
                    <input className="login__input login__input_type_email" placeholder="Email" type="email"
                           name="email" id="login-input-email" onChange={handleInputEmail} ref={inputEmail}
                           value={email}></input>
                    <span className="login__error" id="login-input-email-error"></span>
                    <input className="login__input login__input_type_password" placeholder="Пароль" type="password"
                           name="password" id="login-input-password" onChange={handleInputPassword} ref={inputPassword}
                           value={password}></input>
                    <span className="login__error" id="login-input-password-error"></span>
                    <button className="button login__button-submit" type="submit">Войти
                    </button>
                </form>
            </div>
        </main>
    );
}

export default withRouter(Login);
