import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./safezone.css";
import { VideoCall } from "./VideoCall/VideoCall";
import SafezoneService from '../../api/SafezoneService';
import UserService from '../../api/UserService';
import { trigger } from '../../Global/Events';

function Safezone() {
    let { safezoneId } = useParams();
    const safezoneService = new SafezoneService();
    const userService = new UserService();
    useEffect(() => {
        safezoneService.GetSafezone(safezoneId)
            .then(res => { return res.json() })
            .then(zone => {
                userService.UpdateLastZone(zone._id);
                trigger("ActiveSafeZone:Update", zone);
            });
    }, [safezoneId]);

    return (
        <>
            <VideoCall />
        </>
    );
}

export default Safezone;
