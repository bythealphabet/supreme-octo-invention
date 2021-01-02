import express from "express";
import auth from "../controllers/auth.controller";

const router = express.Router();

router.route("/auth/signin").post(auth.signin);
router.route("/auth/signout").get(auth.signout);

export default router;
