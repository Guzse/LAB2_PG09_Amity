import db from "../models/index.js";
import { verifyJwtToken } from '../global/Global.js';
import { ErrorMessage } from '../global/ErrorMessage.js';

const Safezone = db.safezone;
const Meeting = db.meeting;

export const createSafezone = async (req, res) => {
    try {
        const newZone = new Safezone({ // unpack the body inside the request, then create a new Safezone object with it.
            zoneName: req.body.zoneName,
            description: req.body.description || "",
            maxMembers: req.body.maxMembers || 0
        })
        Safezone.create(newZone) // create a new record in the database with the data from the new object
            .then(zone => {
                res.status(201).send({ message: "Safezone created successfully", zone }); // Success!
            },
                err => {
                    res.status(400).send({ message: "Something went wrong.", err }); // Whoops!
                });
    } catch (err) {
        throw err;
    }
}

export const getSafezone = (req, res) => {
    try {
        const id = req.headers['safezone-id'];
        if (id) {
            Safezone.findById(id)
                .exec((err, zone) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (zone === null) {
                        res.status(404).send({ message: ErrorMessage.NotFound });
                        return;
                    }
                    res.status(200).send(JSON.stringify(zone));
                });
        }
        else {
            Safezone.find()
                .exec((err, zones) => {
                    throw new Error(ErrorMessage.FunctionIsEmpty);
                });
        }
    } catch (err) {
        throw err;
    }
}

export const updateSafezone = async (req, res) => {
    throw new Error(ErrorMessage.FunctionIsEmpty);
}

export const createMeeting = async (req, res) => {
    try {
        const meeting = {
            zoneId: req.body.zoneId,
            date: req.body.date
        }
        Safezone.updateOne(
            {_id: meeting.zoneId},
            {meetingDate: meeting.date},
            (err, val) =>{
                if (err) return res.status(500).send({ message: err });
                if (val.acknowledged)
                    res.status(200).send({message: "record updated"});
                else res.status(400).send({message: "record not updated"});
             }
            )
    } catch (err) {
        throw err;
    }
}

export const getMeeting = (req, res) => {
    try {
        const zoneId = req.params.zoneId;

        Safezone.findById(zoneId).exec((err, val) => {
            if (err) {
                console.error(err);
                res.status(500).send({message: "Something went wrong", err});
                return;
            }
            if (val === null) {
                res.status(404).send("no meeting available");
                return;
            }
            res.status(200).send({
                newDate: val.meetingDate
            });
            }
        )
    }
        
     catch (err) {
        throw err;
    }

}

export default createSafezone;