import React from "react";
import Container from "@mui/material/Container";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Main.css";

function About() {
//       function showForm(e) {
//     e.preventDefault();
//     console.log('You clicked submit.');
//   }
    return (
        <>
            <Container fixed>
                <Sidebar className="sidebar"/>
            </Container>
        </>
    );
}

export default About;
