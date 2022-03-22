import React from "react";
import { useParams } from "react-router-dom";

import Container from "@mui/material/Container";

import "./safezone.css";

function Safezone() {
    let { safezoneId } = useParams();
    return (
        <Container fixed>
            <p>Safezone {safezoneId}</p>
        </Container>
    );
}

export default Safezone;
