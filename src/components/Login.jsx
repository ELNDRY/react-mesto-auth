import React, { useState } from 'react';

export const Login = ({ onLogin }) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(formValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Войти</h2>
            <input name="email" type="email" placeholder="Email"
                onChange={handleChange}
                value={formValue.email} required />
            <input name="password" type="password" placeholder="Password"
                onChange={handleChange}
                value={formValue.password} required />
            <button type="submit">Войти</button>
        </form>
    )
}

