import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Start Server
import express, { application } from "express";
import db from './app/models/index.js';
import cors from 'cors';
import http from 'http';
import * as IO from 'socket.io';
import { configureSocket, configureSocketMiddleware } from './app/services/socket.service.js';

import configureRoutes from './app/routes/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: "*",
    allowedHeaders: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

configureRoutes(app);

const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}.`);
});

// Set up Socket.io
const io = new IO.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["x-access-token", "zone-id"],
        credentials: true
    }
});
configureSocketMiddleware(io);
io.on("connection", (socket) => configureSocket(socket, io));

// Connect to Database
const Role = db.role;
//const CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@amity.1hjd1.mongodb.net/Amity1?retryWrites=true&w=majority`;
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
db.mongoose
    .connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.info("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.error(err);
                }
                console.info("added 'user' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.error(err);
                }
                console.info("added 'admin' to roles collection");
            });
        }
    });
}