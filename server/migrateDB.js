import { pool } from "./config/db.js";

const migrate = async () => {
    try {
        console.log("Iniciando migración de base de datos...");
        
        // Agregar columna si no existe
        await pool.query(`
            ALTER TABLE cliente 
            ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
        `);
        console.log("Columna is_admin agregada a la tabla cliente.");

        // Convertir al primer cliente registrado en Administrador (ID más bajo)
        await pool.query(`
            UPDATE cliente 
            SET is_admin = TRUE 
            WHERE id_cliente = (SELECT MIN(id_cliente) FROM cliente);
        `);
        console.log("Primer usuario convertido a Administrador exitosamente.");
        
        process.exit(0);
    } catch (error) {
        console.error("Error en la migración:", error);
        process.exit(1);
    }
};

migrate();
