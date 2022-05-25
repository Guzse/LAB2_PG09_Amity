import React, { forwardRef, useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";

/**
 * @param {React.MutableRefObject<Socket>} ref
 * @param {{zoneId: String, users: Array<User>, active: Boolean}} props */
const Chat = forwardRef((props = { zoneId: "", active: false, users: [] }, ref) => {
    const safezoneService = new SafezoneService();
    const [messageElements, setMessageElements] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState(props.users);
    const socketRef = ref;

    const chatId = 'chat_' + props.zoneId;

    async function loadMessages() {
        const response = await safezoneService.getMessages(props.zoneId);
        return await response.json() || [];
    }

    useEffect(async () => {
        if (props.active) {
            socketRef.current.emit("join chat", chatId);
            socketRef.current.on('update', () => {
                console.log('get new messages');
                buildMessageElements();
            });
        }
    }, [props.active]);

    const buildMessageElements = async () => {
        console.log('build', users);
        const messages = await loadMessages();
        const elements = messages.map((msg) => {
            const user = users.find(user => user.userId === msg.userId);
            return <Message key={msg._id} user={user} message={msg.content} ></Message>;
        });
        setMessageElements(elements);
    }

    useEffect(() => {
        setUsers(props.users);
    }, [props.users]);

    useEffect(async () => {
        buildMessageElements();
    }, [users]);

    function handelChange(e) {
        setMessage(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (props.active) {
            await safezoneService.sendMessage(props.zoneId, message);
            setMessage("");
            socketRef.current.emit('new message', undefined);
            buildMessageElements();
        }
    }

    return (
        <div className="chat">
            <ul>
                {messageElements}
            </ul>
            <form onSubmit={handleSubmit}>
                <input disabled={!props.active} type="text" placeholder="Message" value={message} onChange={handelChange} />
            </form>
        </div>
    );
});

export default Chat;