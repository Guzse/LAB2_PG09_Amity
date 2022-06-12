import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../../api/AuthService";
import SafezoneService from '../../../api/SafezoneService';
import UserService from '../../../api/UserService';
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
        await authService.Verify();
        // const user = await result.json();
        navigate(`/app/628df676e2d01442d3b850c3`);
    }

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setState(prev => ({
            ...prev,
            [key]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        authService.SignIn(state.username, state.password)
            .then(async(res) => {
                if (res.status !== 200) 
                    return console.error(res);

                const user = await res.json();
                window.localStorage.setItem(LOCAL_ACCESS_TOKEN, user.accessToken);
                window.localStorage.setItem(LOCAL_USERNAME, user.username);
                window.localStorage.setItem(LOCAL_EMAIL, user.email);
                window.localStorage.setItem(LOCAL_USERID, user.id);

                const userService = new UserService();
                const safezoneService = new SafezoneService();
                const response = await safezoneService.JoinSafezone();
                const zones = await response.json();
                console.log('login', zones)
                if (zones.length === 0) {
                    const defaultZoneId = '628df676e2d01442d3b850c3';
                    await safezoneService.JoinSafezone();
                    await userService.UpdateLastZone(defaultZoneId);
                }
                routeToApp();
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
