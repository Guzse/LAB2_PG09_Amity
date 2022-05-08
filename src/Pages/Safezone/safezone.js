import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./safezone.css";
import { VideoCall } from "./VideoCall/VideoCall";
import SafezoneService from '../../api/SafezoneService';
import UserService from '../../api/UserService';
import { trigger, on, off } from '../../Global/Events';

const safezoneService = new SafezoneService();
const userService = new UserService();

function Safezone() {
    const { safezoneId } = useParams();
    const username = window.localStorage.getItem("username");

    const [meetingActive, setMeetingActive] = useState(false);
    const [lastZoneUpdated, setLastZoneUpdated] = useState(false);

    useEffect(() => {
        on("Clicked:JoinMeeting", joinMeeting);
        updateLastZone();

        return () => {
            off("Clicked:JoinMeeting", joinMeeting);
        } 

    }, [safezoneId, username, meetingActive]);

    const joinMeeting = () => {
        setMeetingActive(true);
    }

    const updateLastZone = () => {
        if (!lastZoneUpdated) {
            safezoneService.GetSafezone(safezoneId)
                .then(res => { return res.json() })
                .then(zone => {
                    userService.UpdateLastZone(zone._id);
                    trigger("ActiveSafeZone:Update", zone);
                    setLastZoneUpdated(true);
                });
        }
    }

    return (
        <>
            <VideoCall zoneId={safezoneId} active={safezoneId && meetingActive} />
        </>
    );
}

export default Safezone;
