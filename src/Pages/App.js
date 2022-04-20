import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Landing/Landing";
import Safezone from "./Safezone/Safezone";

import Registration from "./Registration/registration";
import Login from "./Login/Login"; //path naar file
import About from "./About/About";
import Contact from "./Contact/Contact";
import Main from "./Main/Main";



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
                <Route path="/main" element={<Main />} />
            </Routes>
        </Router>
    );
}

export default App;
