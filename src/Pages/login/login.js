import React from "react";
import "./login.css";
import { Link } from 'react-router-dom';

function Login() {
return(
  // JSX code for login form
    <div className="login">
      <div className="logoDiv"> 
        <img className="logoMain" src={require('../../images/2x/Woordmerk_A@2x.png')} alt="Logo"/>
      </div>
      <form>
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
}

export default Login;