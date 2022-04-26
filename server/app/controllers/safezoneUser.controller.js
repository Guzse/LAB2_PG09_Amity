import db from "../models/index.js";
import { verifyJwtToken } from '../global/Global.js';
import { ErrorMessage } from '../global/ErrorMessage.js';

const SafezoneUser = db.safezoneUser;

export const joinSafezone = async (req, res) => {
    const token = verifyJwtToken(req.header('x-access-token'));
    const newSafezoneUser = new SafezoneUser({
        zoneId: req.body.zoneId,
        userId: token.id,
        dateCreated: Date.now()
    });
    SafezoneUser
        .findOne({ userId: token.id, zoneId: req.body.zoneId })
        .exec((err, record) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!!record) {
                res.status(404).send({ message: ErrorMessage.Duplicate });
                return;
            }
            SafezoneUser.create(newSafezoneUser)
                .then(
                    zone => {
                        res.status(201).send({ message: "User added to safezone", zone });
                    },
                    err => {
                        res.status(400).send({ message: "Something went wrong.", err });
                    });
        });
}

export const getUserSafezones = (req, res) => {
    const token = verifyJwtToken(req.header('x-access-token'));
    SafezoneUser.find({ userId: token.id })
        .exec((err, zones) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(zones);
        });
}

const safezoneUser = {
    joinSafezone,
    getUserSafezones
}

export default safezoneUser;