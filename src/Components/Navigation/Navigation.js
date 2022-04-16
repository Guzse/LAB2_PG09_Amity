import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/zone/15">Safezone</Link>
                </li>
                <li>
                    <Link to="/login">login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
