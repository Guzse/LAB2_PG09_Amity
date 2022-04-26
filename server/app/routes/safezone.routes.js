import * as controller from '../controllers/safezone.controller.js';

export const routeSafezone = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/safezone/", controller.createSafezone);
};

export default routeSafezone;