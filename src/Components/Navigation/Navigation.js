import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/Woordmerk_A.svg';
import './Navigation.css';

function Navigation(props) {
    return (
        <nav class="topnav">
            {props.ShowLogo && 
                <div class="logo-home">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>}
            <ul>
                <li>
                    <Link to="/About">About Us</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/login">login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
