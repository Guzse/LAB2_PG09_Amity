import dotenv from 'dotenv';
dotenv.config({ path: '.env.local'});

// Start Server
import express from "express";
import db from './app/models/index.js';
import cors from 'cors';

import configureRoutes from './app/routes/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


// Start Server
const Role = db.role;
const CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@amity.1hjd1.mongodb.net/Amity1?retryWrites=true&w=majority`;

db.mongoose
    .connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
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
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}