import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import { routerConexion } from './routes/conexionRoutes.js';
import { routerProducto } from './routes/productoRoutes.js';
import { routerAuth } from "./routes/authRoutes.js"
import { routerCarrito } from './routes/carritoRoutes.js';
import { routerBoleta } from './routes/boletaRoutes.js';
import { routerStripe } from './routes/stripeRoutes.js';

// Configurar variables de entorno | Se carga variables de .env en process.env
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
// Configuración de CORS estricto
const allowedOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como cURL o Postman) o si el origin está en la lista permitida
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Petición bloqueada por CORS desde el origen: ${origin}`);
      callback(new Error('No autorizado por CORS'));
    }
  },
  credentials: true // Permite envío de cookies/tokens si es necesario
}));
app.use(express.json());
app.use("/conexion", routerConexion)
app.use("/producto", routerProducto)
app.use("/auth", routerAuth)
app.use("/carrito", routerCarrito)
app.use("/boleta", routerBoleta)
app.use("/stripe", routerStripe)



app.listen(port, () => {
  console.log(`Server corriendo en http://localhost:${port}`);
});