import * as controller from '../controllers/user.controller.js';
import authJwt from '../middleware/authJwt.js'

// This lists url's that the react client can access
export const routeUser = (app) => {
    // this function sets the basic settings for the connection. Just copy over into other route.js files
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.put("/api/user/zone", [authJwt.verifyToken], controller.setLastZone);
    app.get("/api/user/:userId", [authJwt.verifyToken], controller.getUserById);
};

export default routeUser;