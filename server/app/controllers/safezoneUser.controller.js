import db from "../models/index.js";
import { verifyJwtToken } from '../global/Global.js';
import { ErrorMessage } from '../global/ErrorMessage.js';
import User from "../models/user.model.js";

const SafezoneUser = db.safezoneUser;

export const joinSafezone = async (req, res) => {
    const token = verifyJwtToken(req.header('x-access-token'));
    const newSafezoneUser = new SafezoneUser({
        zoneId: req.body.zoneId,
        userId: token.id,
        dateCreated: Date.now()
    });
    console.log(newSafezoneUser);
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

export const getZoneMembers = async (req, res) => {
    const zoneId = req.params.zoneId;
    
    SafezoneUser.find({ zoneId: zoneId })
        .exec(async (err, members) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            
            const users = [];
            for (let i = 0; i < members.length; i++) {
                const member = members[i];
                const userId = member.userId.toString();
                const user = await User.findById(userId);
                users.push(user);
            }

            res.status(200).send(users.map(user => {
                return {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    roles: user.roles,
                }
            }));
        });

}

const safezoneUser = {
    joinSafezone,
    getUserSafezones,
    getZoneMembers
}

export default safezoneUser;