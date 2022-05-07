import * as IO from 'socket.io';

let users = [];

const addUser = ({id, username, zoneId}) => {
    if (!username || !zoneId) return {error: "name and zoneId required."};
    const user = {id, username, zoneId};

    users.push(user);
    return {user};
}

export const configureSocket = (socket = new IO.Socket()) => {
    console.log("Someone connected to the socket");
    socket.on("join", ({username, zoneId }, callback) => {
        const { user, error } = addUser({ id: socket.id, username, zoneId });
    
        if (error) return callBack(error);
    
        socket.join(user.room);
        callBack(null);
    });
    socket.on('disconnect', () => {
        console.log("Someone disconnected from the socket");
    });
}
