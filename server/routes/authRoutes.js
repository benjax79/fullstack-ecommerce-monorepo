import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { validateRegister, validateLogin, checkValidationErrors } from "../middlewares/validateInput.js";
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Límite de 10 peticiones por IP por ventana
    message: { error: "Demasiados intentos desde esta IP, por favor intente nuevamente en 15 minutos." },
    standardHeaders: true, // Retorna info de límite en headers `RateLimit-*`
    legacyHeaders: false, // Deshabilita headers `X-RateLimit-*`
});

export const routerAuth = Router();

// Aplicamos los middlewares de validación antes del controlador
routerAuth.post("/register", authLimiter, validateRegister, checkValidationErrors, register);
routerAuth.post("/login", authLimiter, validateLogin, checkValidationErrors, login);