import React from "react";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import Logo from "../../assets/images/SVG/Woordmerk_A.svg";

import "./landing.css";

function Landing() {
    return (
        <>
            <Navigation />
            <Container maxWidth="md" fixed className="landing">
                <img alt="Amity Logo" src={Logo} />
                <hr />
                <h1>Together we blossom</h1>
                <button class="primary-stroke" >Create an Account</button>
            </Container>
        </>
    );
}

export default Landing;
