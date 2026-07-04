import { Router } from "express";
import { agregarAlCarrito, comprarCarrito, eliminarDeCarrito, getCartProducts } from "../controllers/carritoController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const routerCarrito = Router();

// Aplicamos el middleware verifyToken a todas estas rutas
routerCarrito.post("/agregarAlCarrito", verifyToken, agregarAlCarrito);
routerCarrito.post("/eliminarDeCarrito", verifyToken, eliminarDeCarrito);
routerCarrito.get("/getCartProducts/:id_cliente", verifyToken, getCartProducts);
routerCarrito.post("/comprarCarrito", verifyToken, comprarCarrito);
