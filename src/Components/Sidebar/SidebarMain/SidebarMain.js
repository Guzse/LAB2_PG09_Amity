import React, { useState, useEffect } from 'react';
import "./SidebarMain.css";
import { useLocation } from 'react-router-dom';
import { on, off } from '../../../Global/Events';
import { EVENT_SAFEZONE_UPDATE } from '../../../Global';
import { UserList } from './UserList';
import { ProfileSettings } from './ProfileSettings';
import { MeetingPlanner } from './MeetingPlanner'

export const SidebarMain = (props = {
    onClickSettings: () => { },
    onClickUser: () => { }
}) => {
    const [zone, setZone] = useState({});
    const location = useLocation();

    const event_updateZone = (event) => {
        setZone(prev => {
            return {
                ...prev,
                ...event.detail
            }
        });
    }

    useEffect(() => {
        on(EVENT_SAFEZONE_UPDATE, event_updateZone);
        
        return () => {
            off(EVENT_SAFEZONE_UPDATE, event_updateZone);
        };
    }, [location]);

    return (
        <>
            <h2>{zone.zoneName}</h2>
            <UserList zoneId={zone._id} />
            <MeetingPlanner setZone={setZone} date={zone.meetingDate} zone={zone} />
            <ProfileSettings onClickSettings={props.onClickSettings} />
        </>
    )
}
