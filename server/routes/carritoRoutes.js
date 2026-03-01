import { agregarAlCarrito, comprarCarrito, eliminarDeCarrito } from "../controllers/carritoController.js";
import { Router } from "express";
import { getCartProducts } from "../controllers/carritoController.js";
export const routerCarrito = Router();

routerCarrito.post("/agregarAlCarrito",agregarAlCarrito);
routerCarrito.post("/eliminarDeCarrito",eliminarDeCarrito);
routerCarrito.get("/getCartProducts/:id_cliente",getCartProducts);
routerCarrito.post("/comprarCarrito",comprarCarrito);
