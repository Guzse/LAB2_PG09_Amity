import db from "../models/index.js";
import { verifyJwtToken } from '../global/Global.js';
import { ErrorMessage } from '../global/ErrorMessage.js';


export const sendMessage = async (req, res) => {
    const token = verifyJwtToken(req.header('x-access-token'));
    try {
        const newMessage = {
            zoneId: req.body.zoneId,
            content: req.body.content,
            dateSend: req.body.dateSend,
            userId: token.id,
            isDeleted: false,
        }

        if (newMessage.content === null)
            return res.status(400).send({ message: "message cannot be empty" });
        const response = await db.message.create( newMessage);
        return res.status(201).send({ message: "Record created successfully", message:response}); // Success!
    } catch (err) {
        throw err;
    }
}

export const getSafezoneMessages = (req, res) => {
    const zoneId = req.params.zoneId;
    db.message.find({ zoneId })
        .exec((err, messages) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(messages);
        });
}