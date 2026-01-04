import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import { routerConexion } from './routes/conexionRoutes.js';
import { routerProducto } from './routes/productoRoutes.js';
import {routerAuth} from "./routes/authRoutes.js"

// Configurar variables de entorno | Se carga variables de .env en process.env
dotenv.config(); 


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/conexion",routerConexion)
app.use("/producto",routerProducto)
app.use("/auth",routerAuth)



app.listen(port, () => {
  console.log(`Server corriendo en http://localhost:${port}`);
});