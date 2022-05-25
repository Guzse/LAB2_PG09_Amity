import React from "react";
import "./Message.css";
import { SmartIcon } from "../../SmartIcon/SmartIcon";
// eslint-disable-next-line
import { User } from '../../../Interfaces/User.interface';
import { LOCAL_USERID } from "../../../Global";

/**
 * 
 * @param {{message: String, user: User}} props
 * @returns {React.FunctionComponent} Styled message component
 */
function Message(props) {
    const user = props.user || {username: '', userId: ''};
    const owned = user.userId === window.localStorage.getItem(LOCAL_USERID);
    return (
        <li className={ owned ? "message owned" : "message"}>
            <label>{user.username}</label>
            <div>
                <SmartIcon src={''} title={user.username} />
                <div className="text">{props.message}</div>
            </div>
        </li>
    );
}

export default Message;