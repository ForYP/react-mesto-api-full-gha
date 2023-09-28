import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(formValue);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form
                className="auth__form"
                name="form-register"
                method="get"
                noValidate
                onSubmit={handleSubmit}
            >
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="auth__input"
                    placeholder="Email"
                    required
                    value={formValue.email || ""}
                    onChange={handleChange}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="auth__input"
                    placeholder="Пароль"
                    required
                    onChange={handleChange}
                    value={formValue.password || ""}
                />
                <button className="auth__button-submit" type="submit">Зарегистрироваться</button>
                <Link to="/sign-in" className="auth__link">
                    Уже зарегистрированы? Войти
                </Link>
            </form>
        </div>
    )
}

export default Register;