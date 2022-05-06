import React, { useState } from 'react';
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

export const SidebarMain = (props = {
    onClickSettings: () => { },
    onClickUser: () => { }
}

) => {
    return (
        <>
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

    const onClickEdit = () => {

    }

    return (
        <div className="meetingPlanner">
            <div>Next meetup</div>
            <IconWrapper width="20px" onClick={onClickEdit}>
                <HiOutlinePencilAlt />
            </IconWrapper>
            <p>Friday January 10, 19:00</p>
        </div>
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
