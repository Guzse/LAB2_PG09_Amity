import React from "react";
import Container from "@mui/material/Container";
import SafezoneForm from "../../Components/safezoneForm/safezoneForm";
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
                {/* <Sidebar className="sidebar"/> */}

                {/* <button onClick={showForm}>
                    Activate Lasers
                </button> */}
                <SafezoneForm className="safezoneForm"/>
            </Container>
        </>
    );
}

export default About;
