import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { validateRegister, validateLogin, checkValidationErrors } from "../middlewares/validateInput.js";

export const routerAuth = Router();

// Aplicamos los middlewares de validación antes del controlador
routerAuth.post("/register", validateRegister, checkValidationErrors, register);
routerAuth.post("/login", validateLogin, checkValidationErrors, login);