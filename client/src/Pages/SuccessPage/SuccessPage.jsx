import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import style from "./SuccessPage.module.css";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext.jsx";

function SuccessPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const session_id = searchParams.get("session_id");
    const { refreshCartCount } = useCart();
    
    const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'

    useEffect(() => {
        if (!session_id) {
            navigate("/");
            return;
        }

        const verifyPayment = async () => {
            try {
                // 1. Verificar con el backend si el pago fue exitoso en Stripe
                const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/stripe/verify-session?session_id=${session_id}`);
                const verifyData = await verifyRes.json();

                if (verifyData.success) {
                    // 2. Si el pago es real, recuperamos los datos del pedido guardados temporalmente
                    const pendingOrderStr = localStorage.getItem("pendingOrder");
                    
                    if (pendingOrderStr) {
                        const pendingOrder = JSON.parse(pendingOrderStr);
                        const token = localStorage.getItem("token");

                        // 3. Procesamos la boleta en nuestra Base de Datos (igual que antes)
                        const dbRes = await fetch(`${import.meta.env.VITE_API_URL}/carrito/comprarCarrito`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify(pendingOrder)
                        });

                        if (dbRes.ok) {
                            localStorage.removeItem("pendingOrder"); // Limpiamos temporal
                            setStatus("success");
                            toast.success("¡Pago verificado y boleta generada!");
                            refreshCartCount(); // Resetea el contador del carrito
                            
                            // Redirigir al historial después de 3 segundos
                            setTimeout(() => navigate("/mis-compras"), 3000);
                        } else {
                            throw new Error("Error al guardar boleta en BD");
                        }
                    } else {
                        // El pago es exitoso pero ya procesamos esta orden antes
                        setStatus("success");
                        setTimeout(() => navigate("/mis-compras"), 3000);
                    }
                } else {
                    setStatus("error");
                    toast.error("El pago no fue completado");
                }
            } catch (error) {
                console.error("Error verificando pago:", error);
                setStatus("error");
            }
        };

        verifyPayment();
    }, [session_id, navigate]);

    return (
        <div className={style.successContainer}>
            {status === "verifying" && (
                <div className={style.card}>
                    <div className={style.spinner}></div>
                    <h2>Verificando tu pago...</h2>
                    <p>Por favor no cierres esta ventana, estamos contactando con Stripe.</p>
                </div>
            )}

            {status === "success" && (
                <div className={style.card}>
                    <div className={style.successIcon}>✓</div>
                    <h2>¡Pago Exitoso!</h2>
                    <p>Gracias por tu compra en Pinky Cosmetics.</p>
                    <p className={style.redirectText}>Serás redirigido a tu historial en unos segundos...</p>
                    <div className={style.progressBarContainer}>
                        <div className={style.progressBar}></div>
                    </div>
                </div>
            )}

            {status === "error" && (
                <div className={style.card}>
                    <div className={style.errorIcon}>✕</div>
                    <h2>Hubo un problema</h2>
                    <p>No pudimos verificar tu pago o la sesión es inválida.</p>
                    <button className={style.returnBtn} onClick={() => navigate("/carrito")}>
                        Volver al Carrito
                    </button>
                </div>
            )}
        </div>
    );
}

export default SuccessPage;
