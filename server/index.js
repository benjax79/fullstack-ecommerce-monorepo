import express from 'express';
import cors from 'cors';
import pg from 'pg'; 
import dotenv from 'dotenv';

// Configurar variables de entorno | Se carga variables de .env en process.env
dotenv.config(); 

// Obtenemos clase Pool
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

// Endpoints
app.get('/', (req, res) => {
  res.send('Conexion a backend con exito');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      mensaje: 'Conexión exitosa a DB Postgres', 
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