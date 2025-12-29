import { pool } from "../config/db.js";

export const probarConexion = async (req, res) => {
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
}

