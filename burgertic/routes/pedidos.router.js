import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente
router.get("/getPedidos", PedidosController.getPedidos);
router.get("/getPedidos/:user", PedidosController.getPedidosByUser);
router.get("/getPedidos/:id", PedidosController.getPedidosByUser);
router.post("/createPedido", verifyAdmin, verifyToken, PedidosController.createPedido);
router.put("/aceptarPedido/:id", verifyAdmin, verifyToken, PedidosController.aceptarPedido);
router.put("/comenzarPedido/:id", verifyAdmin, verifyToken, PedidosController.comenzarPedido);
router.put("/entregarPedido/:id", verifyAdmin, verifyToken, PedidosController.entregarPedido);
router.delete("/deletePedido/:id", verifyAdmin, verifyToken, PedidosController.deletePedido);
// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

export default router;
