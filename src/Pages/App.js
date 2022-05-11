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
import NewSafezone from "./NewSafezone/newSafezone";
import Sidebar from "../Components/Sidebar/Sidebar";
function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="login" element={<Authenticate />} />
                <Route path="register" element={<Authenticate register />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="app" element={<Sidebar/>}>
                    <Route path=":safezoneId" element={<Safezone />} />
                    <Route path="main" element={<Main />} />
                    <Route path="new" element={<NewSafezone />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
