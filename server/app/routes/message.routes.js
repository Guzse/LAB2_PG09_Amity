import * as controller from "../controllers/message.controller.js"
import authJwt from '../middleware/authJwt.js'

// This lists url's that the react client can access
export const routeMessage = (app) => {
    // this function sets the basic settings for the connection. Just copy over into other route.js files
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/message/", [authJwt.verifyToken], controller.sendMessage);
    app.get("/api/message/:zoneId", [authJwt.verifyToken], controller.getSafezoneMessages);

};

export default routeMessage;