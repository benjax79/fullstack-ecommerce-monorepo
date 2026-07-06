import { pool } from "../config/db.js";

export const getBoletasByCliente = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        
        // Obtenemos todas las boletas del cliente con sus productos anidados usando json_agg
        const query = await pool.query(`
            SELECT b.*, 
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id_producto', p.id_producto,
                            'nombre', p.nombre,
                            'imagen', p.imagen,
                            'precio_unidad', bp.precio_unidad,
                            'cantidad', bp.cantidad
                        )
                    ) FILTER (WHERE p.id_producto IS NOT NULL), '[]'
                ) as productos
            FROM boleta b
            LEFT JOIN boleta_producto bp ON b.id_boleta = bp.id_boleta
            LEFT JOIN producto p ON bp.id_producto = p.id_producto
            WHERE b.id_cliente = $1
            GROUP BY b.id_boleta
            ORDER BY b.fecha DESC
        `, [id_cliente]);
        
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
