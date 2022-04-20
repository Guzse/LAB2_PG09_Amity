import React from "react";
import "./safezoneForm.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";



const handleSubmit = (event) => {
    event.preventDefault();
};

function safezoneForm() {
    // JSX code for login form
    return (
        <>
            <Container fixed>
                <form id="createSafezone" onSubmit={handleSubmit}>
                    <h1>Create safezone</h1>
                    <hr />
                    <div className="safeZoneName-container">
                        <label htmlFor="safeZoneName">Safezone name</label>
                        <input type="text" name="safeZoneName" required />
                    </div>
                    <div className="description-container">
                        <label htmlFor="description">Description </label>
                        <textarea id="descriptionSafezone" name="description" rows="4" cols="50" required/>
                    </div>
                    <div className="limit-container">
                        <label htmlFor="limit">Limit </label>
                        <input type="range" min="1" max="50" value="25" class="slider" id="limit"/>
                    </div>
                    <div className="button-container">
                        <Link to="/safezone">
                            <button className="primary-stroke register" to="/safezone">Create safezone</button>
                        </Link>
                    </div>
                </form>
            </Container>
        </>
    );
}

export default safezoneForm;
