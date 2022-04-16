import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import "./App.css";
import Landing from "./Landing/landing";
import Safezone from "./Safezone/safezone";

function App() {
    console.log(window.location.pathname);
    return (
        <Router>
            <Navigation ShowLogo="true"/>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/zone/:safezoneId" element={<Safezone />} />
            </Routes>
        </Router>
    );
}

export default App;
