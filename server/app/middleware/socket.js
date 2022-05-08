import * as IO from 'socket.io';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const SafezoneUsers = db.safezoneUser;

export const verifyToken = (socket = new IO.Socket(), next = () => undefined) => {
    const rawToken = socket.request.headers['x-access-token'];
    jwt.verify(rawToken, process.env.AUTH_SECRET, (err, decoded) => {
        if (err) {
            next(new Error('Unauthorized'));
        }
        else next();
    });
}

export const userAccess = (socket = new IO.Socket(), next = () => undefined) => {
    const userId = jwt.decode(socket.request.headers['x-access-token']).id;
    const zoneId = socket.request.headers['zone-id'];
    SafezoneUsers
        .findOne({ userId, zoneId })
        .exec((err, res) => {
            if (err) next(new Error(err))
            else if (!res) next(new Error("User not a member"));
            else next();
        });
}