import express from "express";
import * as JenosizeController from "../controller/jenosize.controller";
import passportJWT from "../middleware/passportJWT";

export const jenosizeRouter = express.Router();

/* GET users listing. */
jenosizeRouter.get(
  "/",
  // passportJWT.authenticate("jwt", { session: false }),
  JenosizeController.index
);
jenosizeRouter.get(
  "/searchPlaces",
  passportJWT.authenticate("jwt", { session: false }),
  JenosizeController.searchPlaces
);
jenosizeRouter.post(
  "/game24",
  passportJWT.authenticate("jwt", { session: false }),
  JenosizeController.game24
);
jenosizeRouter.post("/login/google", JenosizeController.loginGoogle);
jenosizeRouter.post("/login/email", JenosizeController.loginEmail);
jenosizeRouter.post("/login/facebook", JenosizeController.loginFacebook);
