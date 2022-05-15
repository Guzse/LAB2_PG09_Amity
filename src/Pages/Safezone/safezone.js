import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {io, Socket} from "socket.io-client";

import { VideoCall } from "./VideoCall/VideoCall";
import SafezoneService from '../../api/SafezoneService';
import UserService from '../../api/UserService';
import { trigger, on, off } from '../../Global/Events';
import { SERVER_URI } from "../../Global/Global";

const safezoneService = new SafezoneService();
const userService = new UserService();

function Safezone() {
    const { safezoneId } = useParams();
    const username = window.localStorage.getItem("username");

    const [meetingActive, setMeetingActive] = useState(false);
    const [lastZoneUpdated, setLastZoneUpdated] = useState(false);
    
    /** @type {current: Socket} */
    const socketRef = useRef();

    useEffect(() => {
        on("Clicked:JoinMeeting", joinMeeting);
        on("Clicked:LeaveMeeting", leaveMeeting);
        updateLastZone();

        socketRef.current = io.connect(SERVER_URI, {
            jsonp: false,
            forceNew: true,
            extraHeaders: {
                "x-access-token": window.localStorage.getItem('accessToken'),
                "zone-id": safezoneId
            }
        });

        return () => {
            off("Clicked:JoinMeeting", joinMeeting);
            off("Clicked:LeaveMeeting", leaveMeeting);
        } 

    }, [safezoneId, username, meetingActive]);

    const joinMeeting = () => {
        setMeetingActive(true);
    }

    const leaveMeeting = () => {
        setMeetingActive(false);
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
            <VideoCall ref={socketRef} zoneId={safezoneId} active={safezoneId && meetingActive} />
        </>
    );
}

export default Safezone;
