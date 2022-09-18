import logo from "../../images/svg/logo_mesto.svg"

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место"></img>
        </header>
    );
}

export default Header;