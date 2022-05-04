import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Landing/landing";
import Safezone from "./Safezone/safezone";
import Authenticate from "./Authenticate/Authenticate"; //path naar file
import About from "./About/About";
import Main from "./Main/Main";
import Contact from "./Contact/Contact";
import { NotFound } from "./NotFound/NotFound";
function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/zone/:safezoneId" element={<Safezone />} />
                <Route path="/login" element={<Authenticate />} />
                <Route path="/register" element={<Authenticate register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/main" element={<Main />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
