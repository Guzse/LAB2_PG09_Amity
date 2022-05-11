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
    const [meetOpen, setOpenMeet] = React.useState(false);

    const  handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenMeet = () => {
        setOpenMeet(true);
    };

    const handleCloseMeet = () => {
        setOpenMeet(false);
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
            <div className="sidebarContainer">
                <div className="leftside-sidebar">
                    <div className="serverlist">
                        <a href="#"><HiUserGroup className="groupIcon" /></a>
                        <a href="#"><HiUserGroup className="groupIcon" /></a>
                        <a href="#"><HiUserGroup className="groupIcon" /></a>
                    </div>
                    <a to="#" className="createSz" ><HiOutlinePlusCircle className="plusIcon" /></a>
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
                            <h3>Next meetup <HiOutlinePencilAlt onClick={handleClickOpenMeet} /></h3>
                            {/* <SimpleDialog
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                        /> */}
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

            <div className="safezoneBody">
                <Container fixed>
                    {/* <button onClick={showForm}>
                        Activate Lasers
                    </button> */}
                    {/* <SafezoneForm className="safezoneForm"/> */}
                    {/* <RecieveMsg /> */}
                   
                    {/* <Button onClick={handleClose} className="createSz" ><HiOutlinePlusCircle className="plusIcon" /></Button> */}
                </Container>

                <Container fixed>
                    <Dialog onClose={handleCloseMeet} open={meetOpen}>
                        <h2>Create meeting</h2>
                        <DialogContent>
                            <form className="createMeeting" onSubmit={handleSubmit}>
                                <hr />
                                <div className="Date-container">
                                    <label htmlFor="date">Safezone name</label>
                                    <input type="datetime-local" name="date" onChange={handleChange} required />
                                </div>
                                <div className="time-container">
                                    <label htmlFor="time">time </label>
                                    <input type="time" onChange={handleChange} id="descriptionSafezone" name="time" />
                                </div>

                                <div className="button-container">
                                    <button onClick={handleCloseMeet} className="primary-stroke " to="#">Remove</button>
                                    <button onClick={handleCloseMeet} className="primary-stroke " to="#">Cancel</button>
                                    <button onClick={handleCloseMeet} type="submit" className="primary-stroke register create" to="#">Accept</button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </Container>
            </div>
        </>
    );
}

export default About;
