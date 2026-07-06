import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// Inicializamos Stripe con la llave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { productos } = req.body;
        
        // Obtenemos el origen de la petición para saber a dónde redirigir después de pagar
        const origin = req.headers.origin || process.env.FRONTEND_URL.split(',')[0];

        // Stripe requiere que los productos tengan un formato específico (line_items)
        const lineItems = productos.items.map((item) => ({
            price_data: {
                currency: 'clp', // Cambiado a Pesos Chilenos (CLP)
                product_data: {
                    name: item.nombre,
                },
                // Para monedas sin decimales como CLP, NO se multiplica por 100
                unit_amount: Math.round(item.precio),
            },
            quantity: item.cantidad,
        }));

        // Creamos la sesión de Checkout de Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            // success_url recibe el ID de la sesión mágica para que el frontend lo verifique luego
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/checkout`,
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error("Error al crear sesión de Stripe:", error);
        res.status(500).json({ error: "No se pudo iniciar el proceso de pago" });
    }
};

export const verifySession = async (req, res) => {
    try {
        const { session_id } = req.query;

        if (!session_id) {
            return res.status(400).json({ error: "Se requiere un ID de sesión" });
        }

        // Recuperamos la sesión desde Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            return res.json({ success: true, message: "Pago verificado exitosamente" });
        } else {
            return res.json({ success: false, message: "El pago no se ha completado" });
        }
    } catch (error) {
        console.error("Error al verificar sesión de Stripe:", error);
        res.status(500).json({ error: "Error interno al verificar el pago" });
    }
};
