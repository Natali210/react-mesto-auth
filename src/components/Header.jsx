import React from "react";
import logo from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header root__header">
      <img src={logo} alt="Лого" className="header__logo" />
    </header>
  );
}

export default Header;