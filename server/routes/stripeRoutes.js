import { Router } from "express";
import { createCheckoutSession, verifySession } from "../controllers/stripeController.js";

export const routerStripe = Router();

// Endpoint para crear la sesión de pago (se llama al presionar 'Comprar')
routerStripe.post("/create-checkout-session", createCheckoutSession);

// Endpoint para verificar si el pago fue exitoso (se llama en la página /success)
routerStripe.get("/verify-session", verifySession);
