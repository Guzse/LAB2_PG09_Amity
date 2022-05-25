import ErrorMessage from '../global/ErrorMessage.js';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

// List Databases
const User = db.user;

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.status(200).send(user);
    } catch (err) {
        throw err;
    }
}

export const setLastZone = (req, res) => {
    try {
        if (req.body.lastZone === undefined)
            return res.status(400).send("Request body invalid");
        const tokenRaw = req.headers["x-access-token"];
        const userId = jwt.decode(tokenRaw).id;
        User.updateOne(
            { _id: userId }, 
            { lastZone: req.body.lastZone },
            (err, val) => {
                if (err) res.status(500).send(err);
                if (val.acknowledged)
                    res.status(200).send("Record updated");
                else res.status(400).send("Record not updated");
            });
    } catch (err) {
        throw err;
    }
}