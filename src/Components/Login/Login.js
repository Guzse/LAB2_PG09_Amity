import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../api/AuthService";
import { LabelInput } from '../LabelInput/LabelInput';

export const Login = (props) => {
    const [state, setState] = useState({
        username: '',
        password: '',
        errorMsg: ''
    });
    const authService = new AuthService();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken");
        if (!accessToken) return;
        routeToApp();
    });

    const routeToApp = async () => {
        const user = await (await authService.Verify()).json();
        navigate(`/app/${user.lastZone}`);
    }

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
                if (res.status !== 200) {

                }
                res.json().then(res => {
                    window.localStorage.setItem('accessToken', res.accessToken);
                    window.localStorage.setItem('username', res.username);
                    window.localStorage.setItem('email', res.email);
                    routeToApp();
                });
            });
    };

    return (
        <form className='formLogin' onSubmit={handleSubmit}>
            <LabelInput
                label="Username"
                placeholder='username'
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
                required />
            <LabelInput
                label="Password"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                required />
            <button type='submit' className='primary'>Login</button>
        </form>
    )
}
