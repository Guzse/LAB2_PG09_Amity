import React from "react";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import SafezoneForm from "../../Components/SafezoneForm/SafezoneForm";
import "./Main.css";

function About() {
    return (
        <>
            <Navigation logo />
            <Container fixed>
                <SafezoneForm/>
            </Container>
        </>
    );
}

export default About;
