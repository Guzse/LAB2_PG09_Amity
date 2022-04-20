import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import logo from '../../assets/images/SVG/Logo_A.svg';

const handleSubmit = (event) => {
    event.preventDefault();
};

function Login() {
    // JSX code for login form
    return (
        <>
            <Navigation logo />
            <img alt="Logo" src={logo} width="300px" />
            <Container fixed>
                <form id="login" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <hr />
                    <div className="username-container">
                        <label htmlFor="uname">Username </label>
                        <input type="text" name="uname" required />
                    </div>
                    <div className="password-container">
                        <label htmlFor="pass">Password </label>
                        <input type="password" name="pass" required />
                    </div>
                    <div className="button-container">
                        <button className="primary login">Login</button>
                        <Link to="/register">
                            <button
                                className="primary-stroke register"
                                to="/registration"
                            >
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
