import Router from "express";
import PlatosController from "../controllers/platos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", PlatosController.getPlatos);
router.get("/:id", PlatosController.getPlatoById);
router.get("/tipo/:tipo", PlatosController.getPlatosByTipo);
router.post("/", verifyAdmin, PlatosController.createPlato);
router.put("/:id", verifyAdmin, PlatosController.updatePlato);
router.delete("/:id", verifyAdmin, PlatosController.deletePlato);

export default router;