import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from '../../assets/images/SVG/Woordmerk_A.svg';
import { segmentPathName } from "../../Global";
import './Navigation.css';

function Navigation() {
    const pathname = useLocation();
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        setShowLogo(segmentPathName()[0] !== '');
    }, [pathname]);

    return (
        <div className="pageContainer">
            <nav className="topnav">
                <div className="logo-home">
                    <NavLink to="/" className={showLogo ? 'active' : '' }>
                        <div>
                            <img alt="Home" src={logo} />
                        </div>
                    </NavLink>
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
            <Outlet />
        </div>
    );
}

export default Navigation;
