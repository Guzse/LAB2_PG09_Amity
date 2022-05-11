import React, { useState } from "react";
import Container from "@mui/material/Container";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Main.css";


import Slider from '@mui/material/Slider';
import SafezoneService from "../../api/SafezoneService";
import { Button, Dialog } from "@mui/material";

import DialogContent from '@mui/material/DialogContent';

import { HiOutlinePlusCircle } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";


function About() {



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
        <>
            <div className="safezoneBody">
                <div className="sidebarContainer">
                    <div className="leftside-sidebar">
                        <div className="serverlist">
                            <a href="#"><HiUserGroup className="groupIcon" /></a>
                            <a href="#"><HiUserGroup className="groupIcon" /></a>
                            <a href="#"><HiUserGroup className="groupIcon" /></a>
                        </div>
                        <a to="#" onClick={handleClickOpen} className="createSz" ><HiOutlinePlusCircle className="plusIcon" /></a>
                    </div>
                    <div className="rightside-sidebar">
                        <div className="searcher">
                            <input className="searchbar" type="text" placeholder="Search.." />
                            <a href="#"><HiUserGroup className="serverIcon" /> <span>server1 </span></a>
                            <a href="#"><HiUserGroup className="serverIcon" /> <span>server1 </span></a>
                            <a href="#"><HiUserGroup className="serverIcon" /> <span>server1 </span></a>
                        </div>
                        <div className="containterPlanAcc">
                            <hr></hr>
                            <div className="planner">
                                <h3>Next meetup <HiOutlinePencilAlt /></h3>
                                <span>19 january </span>
                            </div>
                            <hr></hr>
                            <div className="account">
                                <HiUserCircle className="userIcon" />
                                <span>Jan verstraten</span>
                                <a className="settings" href="#"><HiOutlineCog className="settingIcon" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <Container fixed>
                    {/* <button onClick={showForm}>
                        Activate Lasers
                    </button> */}
                    {/* <SafezoneForm className="safezoneForm"/> */}
                    {/* <RecieveMsg /> */}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogContent>
                            <form className="createSafezone" onSubmit={handleSubmit}>
                                <h1>Create safezone</h1>
                                <hr />
                                <div className="safeZoneName-container">
                                    <label htmlFor="zoneName">Safezone name</label>
                                    <input type="text" name="zoneName" onChange={handleChange} required />
                                </div>
                                <div className="description-container">
                                    <label htmlFor="description">Description </label>
                                    <textarea onChange={handleChange} id="descriptionSafezone" name="description" rows="4" cols="50" />
                                </div>
                                <div className="limit-container">
                                    <label htmlFor="maxMembers">Member limit </label> <span className="outputSlider"></span>
                                    <Slider onChange={handleChange} name="maxMembers" min={1} max={50} defaultValue={25} aria-label="Default" valueLabelDisplay="auto" className="slider" />
                                </div>
                                <div className="button-container">
                                    <button onClick={handleClose} className="primary-stroke cancel" to="/safezone">Cancel</button>
                                    <button onClick={handleClose} type="submit" className="primary-stroke register create" to="/safezone">Create safezone</button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                    {/* <Button onClick={handleClose} className="createSz" ><HiOutlinePlusCircle className="plusIcon" /></Button> */}
                </Container>
            </div>
        </>
    );
}

export default About;
