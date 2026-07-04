// Middleware para verificar si el usuario es administrador
// Se debe usar SIEMPRE después del middleware verifyToken
export const verifyAdmin = (req, res, next) => {
    // req.user viene del token decodificado en verifyToken
    if (req.user && req.user.is_admin === true) {
        next();
    } else {
        res.status(403).send("Acceso denegado: Se requieren permisos de Administrador");
    }
};
