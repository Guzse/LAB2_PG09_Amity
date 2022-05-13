import React, { useState } from 'react';
import './SidebarLeft.css';
import { HiUserGroup } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import Slider from '@mui/material/Slider';
import SafezoneService from "../../../api/SafezoneService";
import { Dialog } from "@mui/material";

import DialogContent from '@mui/material/DialogContent';
import IconWrapper from '../../IconWrapper/IconWrapper';



export const SidebarLeft = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const safezoneService = new SafezoneService();

    const [state, setState] = useState({
        zoneName: '',
        description: '',
        maxMembers: 0
    });

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        console.log(key, value);

        setState(prev => ({
            ...prev,
            [key]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        safezoneService
            .CreateSafezone(state.zoneName, state.description, state.maxMembers)
            .then(res => {
                res.json().then(data => console.log(data));
            });
    }
    return (
        <div className='sidebar-left'>
            <div className="serverlist">
                <IconWrapper onClick={() => undefined}>
                    <HiUserGroup className="groupIcon" />
                </IconWrapper>
                <IconWrapper onClick={() => undefined}>
                    <HiUserGroup className="groupIcon" />
                </IconWrapper>
                <IconWrapper onClick={() => undefined}>
                    <HiUserGroup className="groupIcon" />
                </IconWrapper>
            </div>

            <IconWrapper onClick={handleClickOpen}>
                <HiOutlinePlusCircle className="plusIcon" />
            </IconWrapper>
            <CreateSafezonePopup open={open} onClose={handleClose} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    )
}

function CreateSafezonePopup(props = { open: false, onClose: () => undefined, onChange: () => undefined, onSubmit: () => undefined }) {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogContent>
                <form className="createSafezone" onSubmit={props.onSubmit}>
                    <h1>Create safezone</h1>
                    <hr />
                    <div className="safeZoneName-container">
                        <label htmlFor="zoneName">Safezone name</label>
                        <input type="text" name="zoneName" onChange={props.onChange} required />
                    </div>
                    <div className="description-container">
                        <label htmlFor="description">Description </label>
                        <textarea onChange={props.onChange} id="descriptionSafezone" name="description" rows="4" cols="50" />
                    </div>
                    <div className="limit-container">
                        <label htmlFor="maxMembers">Member limit </label> <span className="outputSlider"></span>
                        <Slider onChange={props.onChange} name="maxMembers" min={1} max={50} defaultValue={25} aria-label="Default" valueLabelDisplay="auto" className="slider" />
                    </div>
                    <div className="button-container">
                        <button onClick={props.onClose} className="primary-stroke cancel">Cancel</button>
                        <button onClick={props.onClose} type="submit" className="primary-stroke register create">Create safezone</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
