import React from "react";
import Container from "@mui/material/Container";
import SafezoneForm from "../../Components/safezoneForm/safezoneForm";
import RecieveMsg from "../../Components/Chat/RecieveMsg/RecieveMsg";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Main.css";

function About() {
//       function showForm(e) {
//     e.preventDefault();
//     console.log('You clicked submit.');
//   }
    return (
        <>
            <div className="safezoneBody">
            <Sidebar />
            <Container fixed>
                

                {/* <button onClick={showForm}>
                    Activate Lasers
                </button> */}
                {/* <SafezoneForm className="safezoneForm"/> */}
                <RecieveMsg />
            </Container>
            </div>
        </>
    );
}

export default About;
