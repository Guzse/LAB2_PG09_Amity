import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import logo from '../../assets/images/SVG/Logo_A.svg';

<<<<<<< HEAD
function Login() {
return(
  // JSX code for login form
    <div className="login">
      <div className="logoDiv"> 
        <img className="logoMain" src={require('../../images/2x/Woordmerk_A@2x.png')} alt="Logo"/>
      </div>
      <form>
          <h2 className="titleForm">Login</h2>
        <div className="username-container">
          <label>Username </label>
          <input type="text" name="username" required />
        </div>
        <div className="password-container">
          <label>Password </label>
          <input type="password" name="pass" required />

        </div>
        <div className="button-container">
            <Link className="btnLogin" to="/mainscreen">Login</Link>
            <Link className="btnLogin" to="/registration">Create account</Link>
        </div>
      </form>
    </div>
  );
=======
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
>>>>>>> 87591165850eb5188d82edf727516e5c94547047
}

export default Login;
