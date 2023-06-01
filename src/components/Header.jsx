import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import logo from '../images/logo.svg'

export const Header = ({ onLogout }) => {

    const currentUser = useContext(CurrentUserContext);

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
            <Routes>
                <Route path="/" element={
                    <>
                        <p>{currentUser?.email}</p>
                        <button onClick={onLogout}>Выйти</button>
                    </>
                } />
                <Route path="/sign-in" element={<Link to="sign-up">Регистрация</Link>} />
                <Route path="/sign-up" element={<Link to="sign-in">Войти</Link>} />
            </Routes>
        </header>
    )
}