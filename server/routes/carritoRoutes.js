import { agregarAlCarrito } from "../controllers/carritoController.js";
import { Router } from "express";
import { getCartProducts } from "../controllers/carritoController.js";
export const routerCarrito = Router();

routerCarrito.post("/agregarAlCarrito",agregarAlCarrito);
routerCarrito.get("/getCartProducts/:id_cliente",getCartProducts);
