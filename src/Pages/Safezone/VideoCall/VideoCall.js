import React, { useState, useEffect } from 'react';
import './VideoCall.css';
import socketIOClient from 'socket.io-client';

let socket;

export const VideoCall = (props = {username: '', zoneId: ''}) => {
    const [username, setUsername] = useState('');
    const [zoneId, setZoneId] = useState('');
    const [meetingActive, setMeetingActive] = useState(false);

    useEffect(() => {
        setUsername(props.username);
        setZoneId(props.zoneId);
        
        if (meetingActive) {
            socket = socketIOClient(process.env.REACT_APP_SERVER_URI);
        }
    }, [props.username, props.zoneId, meetingActive]);

    const joinMeeting = () => setMeetingActive(true);

    return (
        <div className='videoCall'>
            <div className='videoContainer'>
            </div>
            <div className='videoControls'>
                <button className='secondary-stroke' disabled={meetingActive} onClick={joinMeeting}>Join Meeting</button>
            </div>
        </div>
    )
}
