import React from "react";
import "./registration.css";
import { Link } from 'react-router-dom';

function Registration() {
return(
  // JSX code for login formnpn
    <div className="login">
      <div className="logoDiv"> 
        <img className="logoMain" src={require('../../assets/images/2x/Woordmerk_A@2x.png')} alt="Logo"/>
      </div>
      <form>
          <h2 className="titleForm">Register</h2>
        <div className="username-container">
          <label>Username </label>
          <input type="text" name="username" required />
        </div>

        <div className="email-container">
          <label>Email</label>
          <input type="text" name="email" required />
        </div>

        <div className="password-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>

        <div className="passwordConfirm-container">
          <label>Confirm password</label>
          <input type="password" name="passconfirm" required />
        </div>

        <div className="readRules-container">
          <input type="checkbox" id="termsService" name="termsService" required />
          <label>I have read <Link to="/service">terms of service</Link></label>
        </div>

        <div className="button-container">
            <Link className="btnLogin" to="/login">Create account</Link>
        </div>
      </form>
    </div>
  );
}

export default Registration;