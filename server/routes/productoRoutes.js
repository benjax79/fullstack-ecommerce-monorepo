import { Router } from "express";
import { getItemById,getGroupedItems,getSearchedItems, getAllColors } from "../controllers/productoController.js";
export const routerProducto =Router();


routerProducto.get("/searcher",getSearchedItems);
routerProducto.get("/color",getAllColors);
routerProducto.get("/:id_producto",getItemById);
routerProducto.get("/",getGroupedItems);

