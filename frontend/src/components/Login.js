import React, { useState } from 'react';

function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(formValue);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form
                className="auth__form"
                name="form-auth"
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
                    value={formValue.password || ""}
                    onChange={handleChange}
                />
                <button className="auth__button-submit" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;