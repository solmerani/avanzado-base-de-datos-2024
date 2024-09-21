import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente
router.get("/", verifyAdmin, PedidosController.getPedidos);
router.get("/:user", verifyAdmin, verifyToken, PedidosController.getPedidosByUser);
router.get("/:id", verifyAdmin, PedidosController.getPedidoById);
router.post("/", verifyAdmin, verifyToken, PedidosController.createPedido);
router.put("/:id/aceptar", verifyAdmin, PedidosController.aceptarPedido);
router.put("/:id/comenzar", verifyAdmin, PedidosController.comenzarPedido);
router.put("/:id/entregar", verifyAdmin, PedidosController.entregarPedido);
router.delete("/:id", verifyAdmin, PedidosController.deletePedido);
// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

export default router;