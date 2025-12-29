import pg from 'pg'; 
import dotenv from 'dotenv';

// Configurar variables de entorno | Se carga variables de .env en process.env
dotenv.config(); 

// Obtenemos clase Pool
const { Pool } = pg;


// Configuración de Base de Datos

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});