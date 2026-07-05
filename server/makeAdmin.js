import { pool } from "./config/db.js";

const makeAdmin = async () => {
    try {
        const email = process.argv[2];
        if (!email) {
            console.log("Por favor, proporciona un correo electrónico. Ejemplo: node makeAdmin.js tu_correo@gmail.com");
            process.exit(1);
        }

        const result = await pool.query("UPDATE cliente SET is_admin = TRUE WHERE email = $1 RETURNING *", [email]);
        
        if (result.rows.length === 0) {
            console.log(`No se encontró ningún usuario con el correo: ${email}`);
        } else {
            console.log(`¡Éxito! El usuario ${email} ahora es Administrador.`);
        }
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

makeAdmin();
