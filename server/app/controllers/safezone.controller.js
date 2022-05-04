import db from "../models/index.js";
import { verifyJwtToken } from '../global/Global.js';
import { ErrorMessage } from '../global/ErrorMessage.js';

const Safezone = db.safezone;

export const createSafezone = async (req, res) => {
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
            });
    }
    Safezone.find()
        .exec((err, zones) => {
            throw new Error(ErrorMessage.FunctionIsEmpty);
        })
}

export const updateSafezone = async (res, req) => {
    throw new Error(ErrorMessage.FunctionIsEmpty);
}

export default createSafezone;