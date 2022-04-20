import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Landing/landing";
import Safezone from "./Safezone/safezone";

import Registration from "./registration/registration";
import Login from "./login/login"; //path naar file
import About from "./About/About";
import Contact from "./Contact/Contact";
import safezoneForm from "./Safezone/safezoneForm";



function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/zone/:safezoneId" element={<Safezone />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/safezoneForm" element={<safezoneForm />} />

            </Routes>
        </Router>
    );
}

export default App;
