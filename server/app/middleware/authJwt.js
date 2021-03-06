import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SECRET = process.env.AUTH_SECRET;
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Access token denied" });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};

export const authJwt = {
    verifyToken,
    isAdmin
};
export default authJwt;