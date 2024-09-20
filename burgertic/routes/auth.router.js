import Router from "express";
import AuthController from "../controllers/auth.controllers.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
export default router;
