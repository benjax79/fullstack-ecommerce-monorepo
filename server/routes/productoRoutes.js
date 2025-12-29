import { Router } from "express";
import { getItemById,getGroupedItems } from "../controllers/productoController.js";
export const routerProducto =Router();

routerProducto.get("/:id_producto",getItemById);
routerProducto.get("/",getGroupedItems);