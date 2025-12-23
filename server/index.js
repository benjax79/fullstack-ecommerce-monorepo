import express from 'express';
import cors from 'cors';
import pg from 'pg'; // Importamos todo el paquete
import dotenv from 'dotenv';

// Configurar variables de entorno
dotenv.config();

// Desestructuramos Pool desde el paquete pg
const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de Base de Datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Rutas
app.get('/', (req, res) => {
  res.send('¡El Backend está vivo y usando IMPORTS! 🚀');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      mensaje: 'Conexión exitosa a Postgres', 
      hora_servidor: result.rows[0].now 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error conectando a la BD' });
  }
});

app.listen(port, () => {
  console.log(`Server corriendo en http://localhost:${port}`);
});