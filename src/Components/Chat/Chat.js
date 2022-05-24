import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { HiOutlineUser } from "react-icons/hi";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";

function Chat() {

    const safezoneService = new SafezoneService();
    const [messageElements, setMessageElements] = useState([]);
    const [state, setState] = useState({
        content: '',

    });

    async function  loadMessages(){
        // debugger;
        const response = await safezoneService.getMessages("62683ad4ad4f989e30537a24");
        
        return await response.json() || [];


    }


    useEffect(async() => {
        const messages = await loadMessages();
        const user = {username: "jipla"}; 
        const elements = messages.map(msg =>{
            return <Message user={user} msg={msg.content} ></Message>;
        });
        console.log(elements);

        setMessageElements(elements);

    }, []);


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
            {messageElements}
                
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