import React, { useEffect, useState } from "react";
import "./Message.css";
import { HiOutlineUser } from "react-icons/hi";
import { SmartIcon } from "../../SmartIcon/SmartIcon";
import { User } from '../../../Interfaces/User.interface';

/**
 * 
 * @param {{message: String, user: User}} props
 * @returns {React.FunctionComponent} Styled message component
 */
function Message(props) {
    console.log(props);
    return (
        <li className={ props.user.username === 'Me' ? "message owned" : "message"}>
            <label>{props.user.username}</label>
            <div>
                <SmartIcon src={''} title={props.user.username} />
                <p>{props.message}</p>
            </div>
        </li>
    );
}

export default Message;