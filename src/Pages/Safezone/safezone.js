import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./safezone.css";
import { VideoCall } from "./VideoCall/VideoCall";
import SafezoneService from '../../api/SafezoneService';

function Safezone() {
    let { safezoneId } = useParams();
    const safezoneService = new SafezoneService();

    useEffect(() => {
        safezoneService.GetSafezone(safezoneId)
            .then(res => {
                return res.json()
            })
            .then(value => {
                console.log(value);
            });
    });

    return (
        <>
            <VideoCall />
        </>
    );
}

export default Safezone;
