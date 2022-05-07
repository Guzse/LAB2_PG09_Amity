import React from "react";
import { useParams } from "react-router-dom";

import "./safezone.css";
import { VideoCall } from "./VideoCall/VideoCall";

function Safezone() {
    let { safezoneId } = useParams();
    return (
        <>
            <VideoCall />
        </>
    );
}

export default Safezone;
