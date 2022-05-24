import React, { useState } from 'react';
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import IconWrapper from '../../IconWrapper/IconWrapper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { LOCAL_ACCESS_TOKEN, LOCAL_EMAIL, LOCAL_USERNAME } from '../../../Global';

export const ProfileSettings = ({ onClickSettings = () => { } }) => {
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();

    const onClickProfile = () => {
        setOpenProfile(true);
    }

    const handleCloseProfile = () => {
        setOpenProfile(false);
    }

    const handleLogout = () => {
        window.localStorage.removeItem(LOCAL_ACCESS_TOKEN);
        window.localStorage.removeItem(LOCAL_USERNAME);
        window.localStorage.removeItem(LOCAL_EMAIL);
        navigate('/login');
    }

    return (<>
        <div className="profileSettings">
            <div className='profile'>
                <IconWrapper background width="40px" onClick={onClickProfile}>
                    <HiOutlineUser />
                </IconWrapper>
                <div className='username'>{window.localStorage.getItem(LOCAL_USERNAME)}</div>
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
