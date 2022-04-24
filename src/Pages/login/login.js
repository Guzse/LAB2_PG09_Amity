import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import logo from '../../assets/images/SVG/Logo_A.svg';
import AuthService from "../../api/AuthService";

function Login() {
    const [state, setState] = useState({
        username: '',
        password: ''
    });
    let authService = new AuthService();

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
    
        setState(prev => ({
            ...prev,
            [key]: value
        }));
        console.log({state});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authService
            .SignIn(state.username, state.password)
            .then((res) => {
                window.localStorage.setItem('accessToken', res.accessToken);
                console.log(window.localStorage.getItem('accessToken'));
        });
    };

    return (
        <>
            <Navigation logo />
            <img alt="Logo" src={logo} width="300px" />
            <Container fixed>
                <form id="login">
                    <h1>Login</h1>
                    <hr />
                    <div className="username-container">
                        <label htmlFor="username">Username </label>
                        <input type="text" name="username" value={state.username} onChange={handleChange} required />
                    </div>
                    <div className="password-container">
                        <label htmlFor="password">Password </label>
                        <input type="password" name="password" value={state.password} onChange={handleChange} required />
                    </div>
                    <div className="button-container">
                        <button className="primary login" onClick={handleSubmit}>Login</button>
                        <Link to="/register">
                            <button className="primary-stroke register" to="/registration">
                                Register
                            </button>
                        </Link>
                    </div>
                </form>
            </Container>
        </>
    );
}

export default Login;
