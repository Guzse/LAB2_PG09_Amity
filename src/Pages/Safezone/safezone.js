import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { VideoCall } from "./VideoCall/VideoCall";
import SafezoneService from '../../api/SafezoneService';
import UserService from '../../api/UserService';
import { trigger, on, off } from '../../Global/Events';
import { EVENT_SAFEZONE_UPDATE, LOCAL_ACCESS_TOKEN, LOCAL_USERNAME, SERVER_URI } from "../../Global";

const EVENT_JOIN_MEETING = "Clicked:JoinMeeting";
const EVENT_LEAVE_MEETING = "Clicked:LeaveMeeting";

function Safezone() {
    const navigate = useNavigate();
    const location = useLocation();
    const safezoneService = new SafezoneService(navigate);
    const userService = new UserService();

    const { safezoneId: zoneId } = useParams();

    const username = window.localStorage.getItem(LOCAL_USERNAME);

    const [meetingActive, setMeetingActive] = useState(false);
    const [lastZoneUpdated, setLastZoneUpdated] = useState(false);
    
    /** @type {current: Socket} */
    const socketRef = useRef();

    useEffect(() => {
        on(EVENT_JOIN_MEETING, joinMeeting);
        on(EVENT_LEAVE_MEETING, leaveMeeting);
        updateLastZone();
        
        socketRef.current = io.connect(SERVER_URI, {
            jsonp: false,
            forceNew: true,
            extraHeaders: {
                "x-access-token": window.localStorage.getItem(LOCAL_ACCESS_TOKEN),
                "zone-id": zoneId
            }
        });

        return () => {
            off(EVENT_JOIN_MEETING, joinMeeting);
            off(EVENT_LEAVE_MEETING, leaveMeeting);
        } 
    }, [zoneId, username, meetingActive]);

    useEffect(() => {
        setLastZoneUpdated(prev => {
            prev = false;
            updateLastZone();
        });
    }, [location, zoneId])

    const joinMeeting = () => {
        setMeetingActive(true);
    }

    const leaveMeeting = () => {
        setMeetingActive(false);
    }

    const updateLastZone = async () => {
        if (!lastZoneUpdated) {
            const res = await safezoneService.GetSafezone(zoneId);
            const zone = await res.json();
            
            userService.UpdateLastZone(zone._id);
            trigger(EVENT_SAFEZONE_UPDATE, zone);
            setLastZoneUpdated(true);
        }
    }

    return (
        <>
            <VideoCall ref={socketRef} zoneId={zoneId} active={zoneId && meetingActive} />
        </>
    );
}

export default Safezone;
