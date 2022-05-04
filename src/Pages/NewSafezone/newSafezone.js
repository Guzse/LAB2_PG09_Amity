import React from "react";
import Container from "@mui/material/Container";
import SafezoneForm from "../../Components/safezoneForm/safezoneForm";

function NewSafezone() {
    return (
        <>
            <Container fixed>
                <SafezoneForm className="safezoneForm" />
            </Container>
        </>
    );
}

export default NewSafezone;
