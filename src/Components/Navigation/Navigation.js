import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/SVG/Woordmerk_A.svg';
import './Navigation.css';

function Navigation(props) {
    return (
        <>
        <nav class="topnav">
                <div class="logo-home">
                {props.logo && 
                    <NavLink to="/">
                        <div>
                            <img alt="Home" src={logo} />
                        </div>
                    </NavLink>
                }
                </div>
            <ul>
                <li>
                    <NavLink to="/about">About Us</NavLink>
                </li>
                <li><div>–</div></li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li><div>–</div></li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
        </>
    );
}

export default Navigation;
