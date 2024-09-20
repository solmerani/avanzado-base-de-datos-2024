import Router from "express";
import PlatosController from "../controllers/platos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/getPlatos", PlatosController.getPlatos);
router.get("/getPlatos/:id", PlatosController.getPlatoById);
router.get("/getPlatos/:tipo", PlatosController.getPlatosByTipo);
router.post("/createPlato", verifyToken, verifyAdmin, PlatosController.createPlato);
router.put("/updatePlato/:id", verifyToken, verifyAdmin, PlatosController.updatePlato);
router.delete("/deletePlato/:id", verifyToken, verifyAdmin, PlatosController.deletePlato);

export default router;
