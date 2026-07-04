import { Router } from "express";
import { getBoletasByCliente, getAllBoletas, updateBoletaEstado } from "../controllers/boletaController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

export const routerBoleta = Router();

// Rutas para Usuarios
routerBoleta.get("/historial/:id_cliente", verifyToken, getBoletasByCliente);

// Rutas para Administradores
routerBoleta.get("/admin/todas", verifyToken, verifyAdmin, getAllBoletas);
routerBoleta.put("/admin/estado/:id_boleta", verifyToken, verifyAdmin, updateBoletaEstado);
