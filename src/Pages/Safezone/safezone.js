import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

import './safezone.css';
import { VideoCall } from "../../Components/VideoCall/VideoCall";
import SafezoneService from '../../api/SafezoneService';
import UserService from '../../api/UserService';
import { trigger, on, off } from '../../Global/Events';
import Chat from "../../Components/Chat/Chat";
import { EVENT_SAFEZONE_UPDATE, EVENT_SAFEZONE_USERS_UPDATE, LOCAL_ACCESS_TOKEN, LOCAL_USERNAME, SERVER_URI } from "../../Global";

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
    const [users, setUsers] = useState([]);
    const [chatActive, setChatActive] = useState(false);

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
        setChatActive(true);

        return () => {
            off(EVENT_JOIN_MEETING, joinMeeting);
            off(EVENT_LEAVE_MEETING, leaveMeeting);
        }
    }, [zoneId, username, meetingActive, location]);
    
    useEffect(async () => {
        if (zoneId) {
            const response = (await safezoneService.getUsersInZone(zoneId));
            /** @type {Array<Object>} */
            const members = await response.json() || [];
            setUsers(members);
        } 
    }, [zoneId]);

    const joinMeeting = () => {
        setMeetingActive(true);
    }

    const leaveMeeting = () => {
        setMeetingActive(false);
    }

    const updateLastZone = async () => {
        const res = await safezoneService.GetSafezone(zoneId);
        const zone = await res.json();

        userService.UpdateLastZone(zone._id);
        trigger(EVENT_SAFEZONE_UPDATE, zone);
    }

    return (
        <div className="safezone">
            <VideoCall ref={socketRef} zoneId={zoneId} active={zoneId && meetingActive} />
            <Chat active={chatActive} ref={socketRef} users={users} zoneId={zoneId} className="chat" />
        </div>
    );
}

export default Safezone;
