require('dotenv').config();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../models");
const SECRET = process.env.AUTH_SECRET;
// List Databases
const User = db.user;
const Role = db.role;
const UserPasswordNotFound = "Failed to log in. Please check your username and password and try again."
const UsernameExists = "That username is already taken.";
const EmailExists = "An account already exists for that email address.";

function saveUserToDB(req, res, newUser) {
    newUser.save((err, newUser) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    newUser.roles = roles.map(role => role._id);
                    newUser.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                newUser.roles = [role._id];
                newUser.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
}

exports.signup = (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password.toString(), 8)
    });
    User.findOne({ username: newUser.username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!!user) {
                res.status(400).send({ field: username, message: UsernameExists });
                return;
            }

            User.findOne({ email: newUser.email })
                .exec((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (!!user) {
                        res.status(400).send({ field: 'email', message: EmailExists });
                        return;
                    }
                    saveUserToDB(req, res, newUser);
                });
        });
};
exports.signin = (req, res) => {
    User.findOne({ username: req.body.username })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: UserPasswordNotFound });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: UserPasswordNotFound
                });
            }
            var token = jwt.sign({ id: user.id }, SECRET, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};
exports.users = (req, res) => {
    User.find()
        .exec((err, users) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!users) {
                return res.status(404).send({ message: "No users?" });
            }
            res.status(200).send(users);
        });
}