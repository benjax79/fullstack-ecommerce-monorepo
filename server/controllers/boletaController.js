import { pool } from "../config/db.js";

export const getBoletasByCliente = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        
        // Obtenemos todas las boletas del cliente ordenadas de la más nueva a la más antigua
        const query = await pool.query(
            "SELECT * FROM boleta WHERE id_cliente = $1 ORDER BY fecha DESC",
            [id_cliente]
        );
        
        const boletas = query.rows;
        res.status(200).json(boletas);
    } catch (error) {
        console.error("Error al obtener boletas:", error);
        res.status(500).send("Fallo al obtener el historial de compras");
    }
};

// ADMIN: Obtener todas las boletas de la tienda
export const getAllBoletas = async (req, res) => {
    try {
        const query = await pool.query(
            `SELECT b.*, c.nombre, c.apellido, c.email 
             FROM boleta b 
             JOIN cliente c ON b.id_cliente = c.id_cliente 
             ORDER BY b.fecha DESC`
        );
        res.status(200).json(query.rows);
    } catch (error) {
        console.error("Error al obtener todas las boletas:", error);
        res.status(500).send("Error del servidor");
    }
};

// ADMIN: Actualizar el estado de una boleta
export const updateBoletaEstado = async (req, res) => {
    try {
        const { id_boleta } = req.params;
        const { estado } = req.body;
        
        await pool.query(
            "UPDATE boleta SET estado = $1 WHERE id_boleta = $2",
            [estado, id_boleta]
        );
        res.status(200).send("Estado actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar boleta:", error);
        res.status(500).send("Error del servidor");
    }
};
