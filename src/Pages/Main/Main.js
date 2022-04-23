import React from "react";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import SafezoneForm from "../../Components/safezoneForm/safezoneForm";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Main.css";

function About() {
      function showForm(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }
    return (
        <>
            <Navigation logo />
            <Container fixed>
                <Sidebar className="sidebar"/>

                {/* <button onClick={showForm}>
                    Activate Lasers
                </button>
                <SafezoneForm/> */}
            </Container>
        </>
    );
}

export default About;
