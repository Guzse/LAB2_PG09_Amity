import * as controller from '../controllers/safezoneUser.controller.js';
import authJwt from '../middleware/authJwt.js'

// This lists url's that the react client can access
export const routeSafezoneUser = (app) => {
    // this function sets the basic settings for the connection. Just copy over into other route.js files
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/safezoneuser/", [authJwt.verifyToken], controller.joinSafezone);
    app.get("/api/safezoneuser/", [authJwt.verifyToken], controller.getUserSafezones);
    app.get("/api/safezoneuser/zone/:zoneId", [authJwt.verifyToken], controller.getZoneMembers);
    //app.put("/api/safezoneuser/", [authJwt.verifyToken], controller.updateSafezone);
};

export default routeSafezoneUser;