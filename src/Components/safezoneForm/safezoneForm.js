import React, { useState } from "react";
import "./safezoneForm.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Slider from '@mui/material/Slider';
import SafezoneService from "../../api/SafezoneService";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function safezoneForm() {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const safezoneService = new SafezoneService();

    const [state,setState] = useState({
        zoneName: '',
        description: '',
        maxMembers: 0
    });

    function handleChange(e){
        const key = e.target.name;
        const value = e.target.value;

        setState(prev => ({
            ...prev,
            [key]:value
        }));
    }

    function handleSubmit(e){
        e.preventDefault();

        safezoneService
            .CreateSafezone(state.zoneName,state.description,state.maxMembers)
            .then(res => {
                res.json().then(data => console.log(data));
            });
    }



    // JSX code for login form
    return (
        <>
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
                                <textarea onChange={handleChange} id="descriptionSafezone" name="description" rows="4" cols="50"/>
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
        </>
    );
}

export default safezoneForm;
