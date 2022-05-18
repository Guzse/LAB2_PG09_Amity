import React, { useState, useEffect } from 'react';
import "./SidebarMain.css";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { LabelInput } from "../../LabelInput/LabelInput";
import IconWrapper from '../../IconWrapper/IconWrapper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { on, off, trigger } from '../../../Global/Events';
import DialogContent from '@mui/material/DialogContent';
import SafezoneService from '../../../api/SafezoneService';
import { EVENT_SAFEZONE_UPDATE } from '../../../Global/Global';

export const SidebarMain = (props = {
    onClickSettings: () => { },
    onClickUser: () => { }
}) => {
    const [zone, setZone] = useState({});


     const event_updateZone = (event) => {
        console.log({zone: event})
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
    }, []);

    return (
        <>
            <h2>{zone.zoneName}</h2>
            <UserList />
            <MeetingPlanner setZone={setZone} date={zone.meetingDate} zone={zone} />
            <ProfileSettings
                onClickSettings={props.onClickSettings} />
        </>
    )
}

const UserList = () => {
    return (
        <div className="userList">
            <LabelInput className="search" type="text" placeholder="Search.." />
        </div>
    )
}

const MeetingPlanner = (props = {zone: {}, date: undefined, setZone: () => undefined}) => {

    const [open, setOpenMeet] = React.useState(false);

    const handleClickOpenMeet = () => {
        setOpenMeet(true);
    };

    const handleCloseMeet = () => {
        setOpenMeet(false);
    };

    function parseDate() {
        if (!props.date) return '';
        console.log(typeof props.date);
        return (new Date(props.date)).toLocaleDateString("nl", {
            weekday: 'long', // long, short, narrow
            month: 'long', // numeric, 2-digit, long, short, narrow
            day: 'numeric', // numeric, 2-digit
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
        });
    }



    return (
    <>
        <div className="meetingPlanner">
            <div>Next meetup</div>
                <IconWrapper width="20px" onClick={handleClickOpenMeet}>
                <HiOutlinePencilAlt />
            </IconWrapper>
                <p className='meetingTime'>{parseDate()}</p>
        </div>
            <CreateMeetingDialog zoneId={props.zone._id} open={open} onClose={handleCloseMeet} />
    </>
    )
}

function CreateMeetingDialog(props = { open: false, onClose: () => undefined, zoneId: "" }){
    const [date, setDate] = useState();

    const safezoneService = new SafezoneService();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await safezoneService
            .CreateMeeting(props.zoneId, date);
        const newDate = await response.json();
        console.log({date: newDate});
        trigger(EVENT_SAFEZONE_UPDATE,{meetingDate: newDate.meetingDate});
        return newDate;
    }

    return (
    <Dialog onClose={props.onClose} open={props.open}>
        <DialogTitle>Create meeting</DialogTitle>
        <DialogContent>
                <form className="createMeeting" onSubmit={handleSubmit}>
                <hr />
                <div className="Date-container">
                    <label htmlFor="date">Date:</label>
                        <input type="datetime-local" name="date" onChange={e => setDate(new Date(e.target.value))} required />
                </div>

                <div className="button-container">
                    <button onClick={props.onClose} className="primary-stroke " >Remove</button>
                    <button onClick={props.onClose} className="primary-stroke " >Cancel</button>
                    <button onClick={props.onClose} type="submit" className="primary-stroke register create" >Accept</button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
    )
}

const ProfileSettings = ({ onClickSettings = () => { } }) => {
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();

    const onClickProfile = () => {
        setOpenProfile(true);
    }

    const handleCloseProfile = () => {
        setOpenProfile(false);
    }

    const handleLogout = () => {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        navigate('/login');
    }

    return (<>
        <div className="profileSettings">
            <div className='profile'>
                <IconWrapper background width="40px" onClick={onClickProfile}>
                    <HiOutlineUser />
                </IconWrapper>
                <div className='username'>{window.localStorage.getItem("username")}</div>
            </div>
            <IconWrapper width="40px" onClick={onClickSettings}>
                <HiOutlineCog className="settingIcon" />
            </IconWrapper>
        </div>
        <Dialog
            open={openProfile}
            onClose={handleCloseProfile} >
            <DialogTitle>Do you want to log out?</DialogTitle>
            <DialogActions>
                <button onClick={handleCloseProfile} className='primary-outline'>Cancel</button>
                <button onClick={handleLogout} className='primary'>Log Out</button>
            </DialogActions>
        </Dialog>
    </>
    )
}
