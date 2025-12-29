import { Router } from "express";
import { probarConexion } from "../controllers/conexionController.js";
export const routerConexion=Router();

routerConexion.get("/test-db",probarConexion)











