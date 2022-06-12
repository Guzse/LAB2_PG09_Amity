import React, { forwardRef, useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message/Message"
import SafezoneService from "../../api/SafezoneService";
// import UserService from "../../api/UserService";

/**
 * @param {React.MutableRefObject<Socket>} ref
 * @param {{zoneId: String, users: Array<User>, active: Boolean}} props */
const Chat = forwardRef((props = { zoneId: "", active: false, users: [] }, ref) => {
    const safezoneService = new SafezoneService();
    // const userService = new UserService();
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
            socketRef.current.on('update', async () => {
                const res = await safezoneService.getUsersInZone(props.zoneId);
                const users = await res.json();
                console.log(users);
                buildMessageElements(users);
            });
        }
    }, [props.active]);

    const buildMessageElements = async (users) => {
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
        buildMessageElements(users);
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
            buildMessageElements(users);
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