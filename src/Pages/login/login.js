import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";

function Login() {
    // JSX code for login form
    return (
        <>
            <Navigation logo />
            <Container fixed>
                <div className="login">
                    <form>
                        <div className="username-container">
                            <label for="uname">Username </label>
                            <input type="text" name="uname" required />
                        </div>
                        <div className="password-container">
                            <label for="pass">Password </label>
                            <input type="password" name="pass" required />
                        </div>
                    </form>
                    <div className="button-container">
                        <button className="btnLogin" to="/mainscreen">
                            Login
                        </button>
                        <Link to="/registration">
                            <button className="btnLogin" to="/registration">
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Login;
