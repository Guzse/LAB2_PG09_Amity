import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./safezone.css";
import { VideoCall } from "./VideoCall/VideoCall";
import SafezoneService from '../../api/SafezoneService';
import UserService from '../../api/UserService';

function Safezone() {
    let { safezoneId } = useParams();
    const safezoneService = new SafezoneService();
    const userService = new UserService();
    useEffect(() => {
        safezoneService.GetSafezone(safezoneId)
            .then(res => { return res.json() })
            .then(value => {
                userService.UpdateLastZone(value._id);
                
            });
    });

    return (
        <>
            <VideoCall />
        </>
    );
}

export default Safezone;
