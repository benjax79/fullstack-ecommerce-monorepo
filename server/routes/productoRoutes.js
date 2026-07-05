import { Router } from "express";
import { getItemById, getGroupedItems, getSearchedItems, getAllColors, getAllCategories, createProduct, getAllProductsAdmin, deleteProduct, updateProduct } from "../controllers/productoController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

export const routerProducto = Router();

routerProducto.get("/searcher", getSearchedItems);
routerProducto.get("/color", getAllColors);
routerProducto.get("/categoria", getAllCategories);
routerProducto.get("/:id_producto", getItemById);
routerProducto.get("/", getGroupedItems);

// Rutas de Admin
routerProducto.get("/admin/todos", verifyToken, verifyAdmin, getAllProductsAdmin);
routerProducto.post("/crear", verifyToken, verifyAdmin, createProduct);
routerProducto.delete("/eliminar/:id_producto", verifyToken, verifyAdmin, deleteProduct);
routerProducto.put("/editar/:id_producto", verifyToken, verifyAdmin, updateProduct);

