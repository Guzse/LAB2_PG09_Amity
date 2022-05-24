import React, { useState } from "react";
import "./safezoneForm.css";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import SafezoneService from "../../api/SafezoneService";
import { Dialog } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';


function safezoneForm() {
    const navigate = useNavigate();
    const safezoneService = new SafezoneService(navigate);

    const [state, setState] = useState({
        date: '',
        time: ''
    });

    function handeChange(e) {
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
            .CreateSafezone(state.date, state.time)
            .then(res => {
                res.json().then(data => console.log(data));
            });
    }


    // JSX code for login form
    return (
        <>
            <Container fixed>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Create meeting</DialogTitle>
                            <DialogContent>
                <form className="createMeeting" onSubmit={handleSubmit}>
                    <hr />
                    <div className="Date-container">
                        <label htmlFor="date">Safezone name</label>
                            <input type="date" name="date" onChange={handeChange} required />
                    </div>
                    <div className="time-container">
                            <label htmlFor="time">time </label>
                            <input type="time" onChange={handeChange} id="descriptionSafezone" name="time"/>
                    </div>
                   
                    <div className="button-container">
                        <button className="primary-stroke " to="#">Remove</button>
                        <button className="primary-stroke " to="#">Cancel</button>
                        <button type="submit" className="primary-stroke register create" to="#">Accept</button>
                    </div>
                </form>
                        </DialogContent>
                </Dialog>
            </Container>
        </>
    );
}

export default safezoneForm;
