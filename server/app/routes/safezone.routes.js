import * as controller from '../controllers/safezone.controller.js';
import authJwt from '../middleware/authJwt.js'

// This lists url's that the react client can access
export const routeSafezone = (app) => {
    // this function sets the basic settings for the connection. Just copy over into other route.js files
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", 
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /*
    Here, one possible API url is configured.
        post: One of many different http requests. POST is used to send new data to the server. Other requests include: 
            * GET (request data from the database)
            * PUT (update existing data in the database)
            * DELETE (remove data from database)
            
            and also:
            * PATCH (modify part of a database entry. Just ignore for this application)
            * UPDATE (DEPRECATED: was also used to update data, but not anymore)
        
        "/api/safezone": this part is the location of the url. The react application will "fetch" this url to call on the function.

        [authJwt.verifyToken]: this is the "middleware". It needs to successfully execute before the actual request is handled.
            this specific function will make sure the user is authenticated by checking the access token.
        
        controller.createSafezone: the actual function that performs the requested task. This is where the code that interacts with the database is executed.
    */
    app.post("/api/safezone/", [authJwt.verifyToken], controller.createSafezone);
    /*
        This PUT request will replace an existing record with new data.
            "/api/safezone/:uid": in this specific url, the last part (":uid") is a variable: 
                here you can put the ID of the safezone, so the function knows which safezone to update
    */
    app.get("/api/safezone/", [authJwt.verifyToken], controller.getSafezone);
    /*
        As you can see, 3 requests can share the same url as long as their a different kind of request (in this case, GET vs PUT)
    */
    app.put("/api/safezone/", [authJwt.verifyToken], controller.updateSafezone);
    app.put("/api/safezone/meeting/", [authJwt.verifyToken], controller.createMeeting);
    app.get("/api/safezone/meeting/:zoneId", [authJwt.verifyToken], controller.getMeeting);
};

export default routeSafezone;