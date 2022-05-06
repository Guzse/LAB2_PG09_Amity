import React from "react";
import { useParams } from "react-router-dom";

import "./safezone.css";

function Safezone() {
    let { safezoneId } = useParams();
    return (
        <>
            <p>Safezone {safezoneId}</p>
        </>
    );
}

export default Safezone;
