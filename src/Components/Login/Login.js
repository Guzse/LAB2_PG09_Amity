import React, { useState } from 'react';
import AuthService from "../../api/AuthService";

export const Login = (props) => {
    const [state, setState] = useState({
        username: '',
        password: '',
        errorMsg: ''
    });
    let authService = new AuthService();

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setState(prev => ({
            ...prev,
            [key]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.SignIn(state.username, state.password)
            .then((res) => {
                if (res.accessToken == null) {

                }
                console.log({ res });
                window.localStorage.setItem('accessToken', res.accessToken);
            });
    };

    return (
        <form className='formLogin' onSubmit={handleSubmit}>
            <div className="labelInputContainer">
                <label>Email Address</label>
                <input placeholder='user@mail.com' type="text" name="username" value={state.username} onChange={handleChange} required />
            </div>
            <div className="labelInputContainer">
                <label>Password </label>
                <input placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;' type="password" name="password" value={state.password} onChange={handleChange} required />
            </div>
            <button type='submit' className='primary'>Login</button>
        </form>
    )
}
