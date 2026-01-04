import { Router } from "express";
import { register,login } from "../controllers/authController.js";

export const routerAuth = Router();

routerAuth.post("/register",register);
routerAuth.post("/login",login);