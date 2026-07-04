import { body, validationResult } from 'express-validator';

// 1. Reglas de validación para el Registro
export const validateRegister = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('apellido')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

    body('email')
        .isEmail().withMessage('Debe ser un correo electrónico válido')
        .normalizeEmail(), // Convierte a minúsculas y limpia el formato

    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// 2. Reglas de validación para el Login
export const validateLogin = [
    body('email')
        .isEmail().withMessage('Debe ser un correo electrónico válido')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

// 3. El Middleware que revisa si alguna regla falló
export const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    // Si hay errores, detenemos la petición y devolvemos un status 400
    if (!errors.isEmpty()) {
        // En lugar de devolver todo el objeto de error, devolvemos solo los mensajes para que sea más fácil leer en el frontend
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).json({ errores: errorMessages });
    }

    // Si no hay errores, pasamos al controlador
    next();
};
