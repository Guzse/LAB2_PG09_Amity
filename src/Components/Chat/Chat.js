import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";


function Chat(props = {zoneId: "", users: []}) {

    const safezoneService = new SafezoneService();
    const [messageElements, setMessageElements] = useState([]);
    const [message, setMessage] = useState("");
    

    async function  loadMessages(){
        const response = await safezoneService.getMessages(props.zoneId);
        return await response.json() || [];
    }


    useEffect(async() => {
        if (props.users && props.users.length > 0) {
            const messages = await loadMessages();
            const elements = messages.map((msg) =>{
                const user = props.users.find(user => user.userId === msg.userId);
                return <Message key={msg._id} user={user} message={msg.content} ></Message>;
            });
            setMessageElements(elements);
        }

    }, [props.users]);


    function handelChange(e) {
        setMessage(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await safezoneService.sendMessage(props.zoneId, message);
        console.log(response);
        setMessage("");

    }

    return (
        <div className="chat">
            <ul>
            {messageElements}
            </ul>
            <form onSubmit={handleSubmit}>
                <input className="typeMessage" type="text" placeholder="Message" value={message} onChange={handelChange} />
            </form>
        </div>
    );
}

export default Chat;