import React, { useEffect, useState } from "react";
import "./Chat.css";
import { HiOutlineUser } from "react-icons/hi";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";
import { User } from "../../Interfaces/User.interface";

function Chat() {

    const safezoneService = new SafezoneService();
    const [messageList, setMessageList] = React.useState([]);

  
    const [messages, setMessages] = useState([]);

    const [state, setState] = useState({
        content: '',
    });


    function handelChange(e) {
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
            .sendMessage(state.content)
            .then(res => {
                res.json().then(data => console.log(data));
            });
    }

    return (
        <div className="chat">
            <ul>
                {messageList}
            </ul>
            <form onSubmit={handleSubmit}>
                <input className="typeMessage" type="text" placeholder="Message" onChange={handelChange} />
            </form>
        </div>
    );
}

export default Chat;