import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";


function Chat(props = {zoneId: ""}) {

    const safezoneService = new SafezoneService();
    const [messageElements, setMessageElements] = useState([]);
    const [message, setMessage] = useState("");
    

    async function  loadMessages(){
        // debugger;
        const response = await safezoneService.getMessages("62683ad4ad4f989e30537a24");
        
        return await response.json() || [];
    }


    useEffect(async() => {
        const messages = await loadMessages();
        const user = {username: "jipla"}; 
        const elements = messages.map((msg, index) =>{
            return <Message user={user} message={msg.content} ></Message>;
        });

        setMessageElements(elements);

    }, []);


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