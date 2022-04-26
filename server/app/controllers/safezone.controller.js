import db from "../models/index.js";
import { verifyJwtToken } from '../global/Global.js';
import { ErrorMessage } from '../global/ErrorMessage.js';

const Safezone = db.safezone;

export const createSafezone = async (req, res) => {
    const newZone = new Safezone({
        zoneName: req.body.zoneName,
        description: req.body.description || "",
        maxMembers: req.body.maxMembers || 0
    })
    Safezone.create(newZone)
        .then(zone => {
            res.status(201).send({ message: "Safezone created successfully", zone });
        },
            err => {
                res.status(400).send({ message: "Something went wrong.", err });
            });
}

export const getSafezone = async (res, req) => {
    if (req.body.id) {
        Safezone.findById(req.body.id)
            .exec((err, zone) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!!zone) {
                    res.status(404).send({ message: ErrorMessage.NotFound });
                    return;
                }
                res.status(200).send(zone);
                console.log("GET", zone);
            });
    }
    Safezone.find()
        .exec((err, zones) => {
            console.log(zones);
        })
}

export const updateSafezone = async (res, req) => {
    throw new Error(ErrorMessage.FunctionIsEmpty);
}

export default createSafezone;