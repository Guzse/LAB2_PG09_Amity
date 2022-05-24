import React from "react";
import "./Message.css";
import { HiOutlineUser } from "react-icons/hi";




function Message() {

    return (
        <div className="msg-container recievedMessage">
            <div className="message">
            <span className="userNameChat">Johhny test</span>
            <div className="iconAndMsg">
                <HiOutlineUser className="UserIcon" />
                <p className="messageContent" >occaecati cupiditate non provident, similique sunt</p>
            </div>
            </div>
        </div>
    );
}

export default Message;