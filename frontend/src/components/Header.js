import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import headerLogo from '../images/logo-mesto.svg';

function Header(props) {
    return (
        <header className="header">
            <img className="logo" src={headerLogo} alt="Логотип" />
            <Routes>
                <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
                <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
                <Route path="/" element={
                    <div className="header__container">
                        <p className="header__email">{props.email}</p>
                        <Link to="/sign-in" onClick={props.onSignOut} className="header__link header__link_sign-out">Выйти</Link>
                    </div>
                } />
            </Routes>
        </header>
    );
}

export default Header;