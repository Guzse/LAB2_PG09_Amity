import React, { useEffect, useState } from "react";
import "./Chat.css";
import { HiOutlineUser } from "react-icons/hi";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";
import { User } from "../../Interfaces/User.interface";

function Chat() {
    const testMessages = [
        {
            content: 'Hallo',
            user: new User({username: 'John Doe'}),
        },
        {
            content: 'Hey, hoe gaat het er mee?',
            user: new User({username: 'Me'}),
        },
        {
            content: 'Best ok. Ik heb ni veel gedaan gekregen vandaag, maar ik voel mij op zijn minst iets beter. Heb gewoon een uurtje serie zitten zien.',
            user: new User({username: 'John Doe'}),
        },
        {
            content: 'Moet ook soms man. Elke dag ne nieuwe stap, zo hoort dat.',
            user: new User({username: 'Me'}),
        },
    ]
    const safezoneService = new SafezoneService();
    const [messages, setMessages ] = useState([]);

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

    const messageList = testMessages.map(msg => <Message message={msg.content} user={msg.user} />);


    return (
        <div className="chat">
            <ul>
                {messageList}
            </ul>
            <div className="chatFooter">
                <hr />
                <form onSubmit={handleSubmit}>
                    <input className="typeMessage" type="text" placeholder="Message" onChange={handelChange} />
                </form>
            </div>
        </div>
    );
}

export default Chat;