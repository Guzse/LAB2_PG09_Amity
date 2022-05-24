import React from "react";
import "./Message.css";
import { SmartIcon } from "../../SmartIcon/SmartIcon";
// eslint-disable-next-line
import { User } from '../../../Interfaces/User.interface';

/**
 * 
 * @param {{message: String, user: User}} props
 * @returns {React.FunctionComponent} Styled message component
 */
function Message(props) {
    return (
        <li className={ props.user.username === 'Me' ? "message owned" : "message"}>
            <label>{props.user.username}</label>
            <div>
                <SmartIcon src={''} title={props.user.username} />
                <div className="text">{props.message}</div>
            </div>
        </li>
    );
}

export default Message;