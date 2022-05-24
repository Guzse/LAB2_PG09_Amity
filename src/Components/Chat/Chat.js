import React, { useState } from "react";
import "./Chat.css";
import { HiOutlineUser } from "react-icons/hi";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";

function Chat() {

    const safezoneService = new SafezoneService();

    const [state, setState] = useState({
        content: '',
    });

    function handelChange(e) {
        // const key = e.target.name;
        // const value = e.target.value;

        // setState(prev => ({
        //     ...prev,
        //     [key]: value
        // }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // safezoneService
        //     .sendMessage(state.content, state.time)
        //     .then(res => {
        //         res.json().then(data => console.log(data));
        //     });
    }

    return (
        <div className="chat-container">
            <div className="chatObject chatArea" >
                <Message/>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                
            </div>
            <hr />
            <div className="chatObject">
                <form onSubmit={handleSubmit}>
                    <input className="typeMessage" type="text" placeholder="Message" onChange={handelChange} />
                </form>
            </div>

            
        </div>
    );
}

export default Chat;