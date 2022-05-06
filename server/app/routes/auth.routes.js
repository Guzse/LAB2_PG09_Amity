import { verifySignUp } from "../middleware/verifySignUp.js";
import * as controller from '../controllers/auth.controller.js';
import authJwt from "../middleware/authJwt.js";

export const authRoutes = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/verify", authJwt.verifyToken, controller.verify);
};

export default authRoutes;