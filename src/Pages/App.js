import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import "./App.css";
import Landing from "./Landing/landing";
import Safezone from "./Safezone/safezone";
import Login from "./login/login"; //path naar file
import About from "./About/About";
import Contact from "./Contact/Contact";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/zone/:safezoneId" element={<Safezone />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
