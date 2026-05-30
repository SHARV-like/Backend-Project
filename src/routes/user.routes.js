import { Router } from "express";
import { app } from "../app.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);


export default router;