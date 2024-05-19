import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";

const router = express.Router();

// signup & signin: questo route è associato con signup e signin function dentro ../controllers/auth.controller.js e quando un Post request viene creato a questo endpoint allora il function richiesto viene eseguito
router.post("/signup", signup);

router.post("/signin", signin);

export default router;
