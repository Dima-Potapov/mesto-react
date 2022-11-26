import logo from "../../images/svg/logo_mesto.svg"
import {useLocation} from "react-router-dom";

function Header(props) {
    const {userData, onSignOut} = props;
    const location = useLocation();
    const path = location.pathname;

    let textAction = '';
    let linkAction = '';

    switch (path) {
        case '/sign-in':
            textAction = 'Регистрация';
            linkAction = '/sign-up';
            break;
        case '/sign-up':
            textAction = 'Войти';
            linkAction = '/sign-in';
            break;
        default:
            textAction = '';
            linkAction = '';
            break;
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место"></img>
            <nav className="header__menu">
                <p className="header__email">{userData.email}</p>
                <a className="header__button" href={linkAction} onClick={onSignOut}>{textAction}</a>
                <a className="header__button" onClick={onSignOut}>{location.pathname === '/' ? 'Выйти' : ''}</a>
            </nav>            
        </header>
    );
}

export default Header;
