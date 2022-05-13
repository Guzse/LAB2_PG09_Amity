import * as IO from 'socket.io';
import { verifyToken, userAccess } from '../middleware/socket.js';

let users = {};

const socketToRoom = {};

export const configureSocketMiddleware = (io = new IO.Server()) => {
    io.use(verifyToken);
    io.use(userAccess);
}

export const configureSocket = (socket = new IO.Socket(), io = new IO.Server()) => {
    socket.on("join room", roomId => {
        if (users[roomId]) {
            users[roomId].push(socket.id);
        } else {
            users[roomId] = [socket.id];
        }
        socketToRoom[socket.id] = roomId;
        const usersInThisRoom = users[roomId].filter(id => id !== socket.id);
        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];

        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
        socket.broadcast.emit('user left', socket.id);
    });
}
