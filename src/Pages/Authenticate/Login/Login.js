import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../../api/AuthService";
import { LabelInput } from '../../../Components/LabelInput/LabelInput';
import { LOCAL_ACCESS_TOKEN, LOCAL_EMAIL, LOCAL_USERID, LOCAL_USERNAME } from '../../../Global';

export const Login = (props) => {
    const [state, setState] = useState({
        username: '',
        password: '',
        errorMsg: ''
    });
    const authService = new AuthService();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = window.localStorage.getItem(LOCAL_ACCESS_TOKEN);
        if (!accessToken) return;
        routeToApp();
    });

    const routeToApp = async () => {
        const result = await authService.Verify();
        const user = await result.json();
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
                if (res.status !== 200) 
                    return console.error(res);
                res.json().then(res => {
                    console.log({res});

                    window.localStorage.setItem(LOCAL_ACCESS_TOKEN, res.accessToken);
                    window.localStorage.setItem(LOCAL_USERNAME, res.username);
                    window.localStorage.setItem(LOCAL_EMAIL, res.email);
                    window.localStorage.setItem(LOCAL_USERID, res.id);
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
