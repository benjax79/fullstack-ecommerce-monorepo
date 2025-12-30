import { Router } from "express";
import { getItemById,getGroupedItems,getSearchedItems } from "../controllers/productoController.js";
export const routerProducto =Router();


routerProducto.get("/searcher",getSearchedItems);
routerProducto.get("/:id_producto",getItemById);
routerProducto.get("/",getGroupedItems);
