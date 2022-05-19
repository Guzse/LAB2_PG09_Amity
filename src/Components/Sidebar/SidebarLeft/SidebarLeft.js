import React, { useEffect, useState } from 'react';
import './SidebarLeft.css';
import { HiUserGroup } from "react-icons/hi";
import { HiOutlinePlusCircle, HiOutlineSupport } from "react-icons/hi";
import Slider from '@mui/material/Slider';
import SafezoneService from "../../../api/SafezoneService";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

import IconWrapper from '../../IconWrapper/IconWrapper';
import UserService from '../../../api/UserService';
import { segmentPathName } from '../../../Global';



export const SidebarLeft = () => {
    const [open, setOpen] = React.useState(false);
    const [zoneList, setZoneList] = React.useState([]);
    const [zoneIcons, setZoneIcons] = React.useState([]);
    
    const safezoneService = new SafezoneService();
    const userService = new UserService();

    useEffect(() => {
        fetchZones();
    }, []);

    const fetchZones = async () => {
        const response = await userService.GetUserSafezones();
        const userZones = await response.json() || [];
        console.log({userZones})
        let zones = [];
        for (const userZone of userZones) {
            const res = await safezoneService.GetSafezone(userZone.zoneId);
            const zone = await res.json();
            zones.push(zone);
        };
        setZoneList(zones);
    }

    useEffect(() => {
        const parts = segmentPathName();
        const elements = zoneList.map(zone => {
            return <a href={ `/app/${zone._id}`} key={zone._id} title={zone.zoneName}>
                <IconWrapper primary className={ parts.find(val => val === zone._id) ? "current" : ""}>
                    <HiUserGroup />
                </IconWrapper>
            </a>
        });
        setZoneIcons(prev => {
            return elements;
        });
    }, [zoneList]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [state, setState] = useState({
        zoneName: '',
        description: '',
        maxMembers: 0
    });

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

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
                { zoneIcons }
            </div>
            <DebugJoinSafezone />
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

export const DebugJoinSafezone = () => {
    const [zoneId, setZoneId] = useState('');
    const [open, setOpen] = useState(false);

    const safezoneService = new SafezoneService();

    const handleJoin = async () => {
        console.log(`%c zoneid ${zoneId}`, "color: green");
        const res = await safezoneService.JoinSafezone(zoneId); 
        setOpen(false);
        console.log(res);
        alert(res);
    }

    const handleChange = e => {
        setZoneId(e.target.value);
    }

    return (
        <>
            <IconWrapper onClick={() => setOpen(true)}>
                <HiOutlineSupport style={{color: "var(--infored)"}} />
            </IconWrapper>
            <Dialog open={open}>
                <DialogContent>
                    <input type='text' placeholder='zoneId' onChange={handleChange} value={zoneId}></input>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleJoin}>Join</button>
                </DialogActions>
            </Dialog>
        </>
    )
}
