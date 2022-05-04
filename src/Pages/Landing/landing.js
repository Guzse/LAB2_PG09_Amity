import React from "react";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import Logo from "../../assets/images/SVG/Woordmerk_A.svg";

import "./landing.css";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <>
            <Navigation />
            <Container maxWidth="md" fixed className="landing">
                <img alt="Amity Logo" src={Logo} />
                <hr />
                <h1>Together we blossom</h1>
                <Link to='/register'>
                    <button className="primary-stroke" >Create an Account</button>
                </Link>
            </Container>
        </>
    );
}

export default Landing;
