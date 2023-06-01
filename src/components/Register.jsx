import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = ({ onRegister }) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister(formValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <input name="email" type="email" placeholder="Email"
                onChange={handleChange}
                value={formValue.email} required />
            <input name="password" type="password" placeholder="Password"
            onChange={handleChange}
                value={formValue.password} required />
            <button type="submit">Зарегистрироваться</button>
            <p>Уже зарегистрированы?
                <Link to="/sign-in">Войти</Link>
            </p>
        </form>
    )
}