import * as IO from 'socket.io';
import { verifyToken, userAccess } from '../middleware/socket.js';

let users = {};

const socketToRoom = {};

export const configureSocketMiddleware = (io = new IO.Server()) => {
    io.use(verifyToken);
    io.use(userAccess);
}

export const configureSocket = (socket = new IO.Socket(), io = new IO.Server()) => {
    const userLeft = () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
    
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;

            delete socketToRoom[socket.id];

            console.log(`User [${socket.id}] left room [${roomID}]`);
        }

        socket.broadcast.emit('user left', socket.id);
        users[roomID] && console.table(users[roomID]);
        console.table(socketToRoom);
    }

    // console.log(`User [${socket.id}] connected`);
    socket.on("join room", roomId => {
        if (users[roomId]) {
            users[roomId].push(socket.id);
        } else {
            users[roomId] = [socket.id];
        }
        socketToRoom[socket.id] = roomId;
        const usersInThisRoom = users[roomId].filter(id => id !== socket.id);
        socket.emit("all users", usersInThisRoom);
        console.log(`User [${socket.id}] joined room [${roomId}]`);
        users[roomId] && console.table(users[roomId]);
        console.table(socketToRoom);
    });

    socket.on("leave room", userLeft);

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        userLeft();
        // console.log(`User [${socket.id}] disconnected`);
    });
}
