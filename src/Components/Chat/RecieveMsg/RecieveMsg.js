import React from "react";
import "../RecieveMsg/RecieveMsg.css";
import { HiOutlineUser } from "react-icons/hi";




function RecieveMsg() {

    return (
        <div className="recieveMsg">
            <span className="userNameChat">Johhny test</span>
            <div className="iconAndMsg">
                <HiOutlineUser className="UserIcon"/>
                <p>occaecati cupiditate non provident, similique sunt</p>
            </div>
        </div>
    );
}

export default RecieveMsg;