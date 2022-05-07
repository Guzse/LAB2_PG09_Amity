import * as IO from 'socket.io';
import { verifyToken, userAccess } from '../middleware/socket.js';

let users = {};

const socketToRoom = {};

export const configureSocketMiddleware = (io = new IO.Server()) => {
    io.use(verifyToken);
    io.use(userAccess)
}


export const configureSocket = (socket = new IO.Socket(), io = new IO.Server()) => {
    console.log("Someone connected to the socket");
    
    socket.on('joinRoom', roomId => {
        console.log("Someone connected to room " + roomId);
        if (users[roomId]) {
            const length = users[roomId].length;
            if (length === 20) {
                socket.emit('room full');
                return;
            }
            users[roomId].push(socket.id);
        } else {
            userse[roomId] = [socket.id];
        }
        socketToRoom[socket.id] = roomId;
        const usersInThisRoom = users[roomId].filter(id => id !== socket.id);

        socket.emit('allUsers', usersInThisRoom);
    });

    socket.on('sendingSignal', payload => {
        console.log("sending signal", payload);
        io.to(payload.userToSignal).emit('userJoined', {signal: payload.signal, callerId: payload.callerId});
    });

    socket.on("returningSignal", payload => {
        console.log("returning signal", payload);
        io.to(payload.userToSignal).emit('userJoined', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomId = socketToRoom[socket.id];
        let room = users[roomId];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomId] = room;
        }
        console.log("Someone disconnected from the socket");
    });
}
