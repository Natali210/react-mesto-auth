import React from "react";
import logo from "../images/header-logo.svg";
import { Link, useLocation } from "react-router-dom";

const Header = props => { 
  const { logout, loggedIn, userEmail } = props;
  const location = useLocation();

  return (
    <header className="header root__header">
      <img className="header__logo" src={logo} alt="Лого" />

      {loggedIn && (
        <div className="header__current-user">
          <p className="header__email">{userEmail}</p>
          <Link to="/sign-in" className="header__button" onClick={logout}>Выйти</Link>
        </div>
      )}
 
      {location?.pathname === "/sign-in" ? (
        <Link to="/sign-up" className="header__button">Регистрация</Link>
      ) 
      : loggedIn ? logout : (
        <Link to="/sign-in" className="header__button">Войти</Link>
      )}
    </header>
  );
}

export default Header;