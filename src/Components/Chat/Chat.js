import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { HiOutlineUser } from "react-icons/hi";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";

function Chat() {

    const safezoneService = new SafezoneService();
    const [messageList, setMessageList] = React.useState([]);

    // useEffect(() => {
    //     loadMessages();
    // }, []);

    // useEffect(() => {
    //     // const parts = segmentPathName();
    //     const elements = messageList.map(message => {
    //         return <div className="msg-container recievedMessage">
    //             <div className="message">
    //                 <span className="userNameChat">{message.userId}</span>
    //                 <div className="iconAndMsg">
    //                     <HiOutlineUser className="UserIcon" />
    //                     <p className="messageContent" >message.content</p>
    //                 </div>
    //             </div>
    //         </div>
    //     });
    //     setZoneIcons(() => {
    //         return elements;
    //     });
    // }, [messageList]);




    // const loadMessages = async () => {
    //     const response = await safezoneService.getMessages();
    //     const chatMessages = await response.json() || [];
    //     console.log({ chatMessages });
    //     let messageLi = [];
    //     for (const chatMessage of chatMessages) {
    //         const res = await safezoneService.getMessages(chatMessage.content);
    //         const content = await res.json();
    //         messageLi.push(content);
    //     };
    //     setMessageList(messageLi);
    // }

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
        <div className="chat-container">
            <div className="chatObject chatArea" >
            {/* {messages} */}
                
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