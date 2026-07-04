import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        // 1. Obtener el token de los headers
        // Normalmente viene en el formato: "Bearer eyJhbGciOi..."
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Acceso denegado. Token no proporcionado o formato inválido." });
        }

        // 2. Extraer solo el token (quitamos la palabra "Bearer ")
        const token = authHeader.split(' ')[1];

        // 3. Verificar el token usando la misma palabra secreta con la que se creó
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Guardar los datos del usuario en la request (req) para usarlos en el controlador
        // 'decoded' tendrá { id_cliente, nombre, email, iat, exp }
        req.user = decoded; 

        // 5. Continuar al siguiente paso (el controlador)
        next(); 
    } catch (error) {
        console.error("Error al verificar token:", error.message);
        return res.status(401).json({ error: "Token inválido o expirado." });
    }
};
