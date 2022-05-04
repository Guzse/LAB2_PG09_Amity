import React, { useState } from "react";
import "./safezoneForm.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Slider from '@mui/material/Slider';
import SafezoneService from "../../api/SafezoneService";


function safezoneForm() {

    const safezoneService = new SafezoneService();

    const [state,setState] = useState({
        zoneName: '',
        description: '',
        maxMembers: 0
    });

    function handeChange(e){
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
            <Container fixed>
                <form className="createSafezone" onSubmit={handleSubmit}>
                    <h1>Create safezone</h1>
                    <hr />
                    <div className="safeZoneName-container">
                        <label htmlFor="zoneName">Safezone name</label>
                        <input type="text" name="zoneName" onChange={handeChange} required />
                    </div>
                    <div className="description-container">
                        <label htmlFor="description">Description </label>
                        <textarea onChange={handeChange} id="descriptionSafezone" name="description" rows="4" cols="50"/>
                    </div>
                    <div className="limit-container">
                        <label htmlFor="maxMembers">Member limit </label> <span className="outputSlider"></span>
                        <Slider onChange={handeChange} name="maxMembers" min={1} max="50" defaultValue={25} aria-label="Default" valueLabelDisplay="auto" className="slider" />
                    </div>
                    <div className="button-container">
                            <button className="primary-stroke " to="/safezone">Cancel</button>
                            <button type="submit" className="primary-stroke register create" to="/safezone">Create safezone</button>
                    </div>
                </form>
            </Container>
        </>
    );
}

export default safezoneForm;
