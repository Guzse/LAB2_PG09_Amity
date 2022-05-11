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
import { on, off } from '../../../Global/Events';
import DialogContent from '@mui/material/DialogContent';

export const SidebarMain = (props = {
    onClickSettings: () => { },
    onClickUser: () => { }
}) => {
    const [zone, setZone] = useState({});
    const updateZone = event => {
        setZone(event.detail);
    };

    useEffect(() => {
        on("ActiveSafeZone:Update", updateZone);

        return () => {
            off("ActiveSafeZone:Update", updateZone);
        };
    }, [updateZone]);

    return (
        <>
            <h2>{zone.zoneName}</h2>
            <UserList />
            <MeetingPlanner />
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

const MeetingPlanner = () => {

    const [open, setOpenMeet] = React.useState(false);

    const handleClickOpenMeet = () => {
        setOpenMeet(true);
    };

    const handleCloseMeet = () => {
        setOpenMeet(false);
    };

    //     function handleChange(e) {
    //     const key = e.target.name;
    //     const value = e.target.value;

    //     console.log(key,value);

    //     setState(prev => ({
    //         ...prev,
    //         [key]: value
    //     }));
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();

    //     safezoneService
    //         .CreateSafezone(state.zoneName, state.description, state.maxMembers)
    //         .then(res => {
    //             res.json().then(data => console.log(data));
    //         });
    // }

    return (
    <>
        <div className="meetingPlanner">
            <div>Next meetup</div>
                <IconWrapper width="20px" onClick={handleClickOpenMeet} >
                <HiOutlinePencilAlt />
            </IconWrapper>
            <p>Friday January 10, 19:00</p>
        </div>
            <CreateMeetingDialog open={open} onClose={handleCloseMeet} />
    </>
    )
}

function CreateMeetingDialog(props = { open: false, onClose: () => undefined, onChange: () => undefined, onSubmit: () => undefined }){
    return (
    <Dialog onClose={props.onClose} open={props.open}>
        <DialogTitle>Create meeting</DialogTitle>
        <DialogContent>
            <form className="createMeeting" onSubmit={props.onSubmit}>
                <hr />
                <div className="Date-container">
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" onChange={props.onChange} required />
                </div>
                <div className="time-container">
                    <label htmlFor="time">time:</label>
                    <input type="time" onChange={props.onChange} id="descriptionSafezone" name="time" />
                </div>

                <div className="button-container">
                    <button onClick={props.onClose}className="primary-stroke " >Remove</button>
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
