import style from "./CheckoutPage.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function CheckoutPage(){
    const location = useLocation();
    const navigate = useNavigate();
    
    // Recuperar el estado del carrito
    const { productsCart, totalPrice, amount } = location.state || {};

    const [direccion, setDireccion] = useState("");
    const [metodoPago, setMetodoPago] = useState("Tarjeta");
    const [error, setError] = useState("");

    // Si entran directo a /checkout sin venir del carrito, redirigir
    if (!productsCart || productsCart.length === 0) {
        return (
            <div className={style.emptyState}>
                <p>No hay productos para procesar.</p>
                <button onClick={() => navigate("/carrito")}>Volver al carrito</button>
            </div>
        );
    }

    const confirmarCompra = async (e) => {
        e.preventDefault();
        
        if (!direccion.trim()) {
            setError("La dirección de envío es obligatoria");
            return;
        }

        try {
            const products_json_list = productsCart.map(prod => ({
                id_producto: prod.id_producto,
                precio: prod.precio,
                cantidad: prod.cantidad
            }));
            
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");
            const id_cliente = user?.id_cliente;
            
            if (!id_cliente) {
                setError("Debes iniciar sesión para comprar");
                return;
            }
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/carrito/comprarCarrito`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_cliente: id_cliente,
                    productos: { items: products_json_list },
                    direccion_envio: direccion,
                    metodo_pago: metodoPago
                })
            });
            
            if (!response.ok) {
                throw new Error("Error en el servidor al procesar la compra");
            }
            
            toast.success("¡Compra exitosa! Tu pedido está en camino.");
            navigate("/mis-compras"); // Redirigir al historial después de la compra
            
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            setError("Hubo un error al procesar la compra. Intenta de nuevo.");
        }
    }

    return (
        <div className={style.checkoutContainer}>
            <div className={style.formSection}>
                <h2>Detalles de Envío y Pago</h2>
                <form onSubmit={confirmarCompra} className={style.form}>
                    <div className={style.inputGroup}>
                        <label>Dirección de Envío:</label>
                        <input 
                            type="text" 
                            placeholder="Ej. Av. Siempre Viva 742, Springfield" 
                            value={direccion}
                            onChange={(e) => { setDireccion(e.target.value); setError(""); }}
                            required
                        />
                    </div>

                    <div className={style.inputGroup}>
                        <label>Método de Pago:</label>
                        <select 
                            value={metodoPago} 
                            onChange={(e) => setMetodoPago(e.target.value)}
                        >
                            <option value="Tarjeta">Tarjeta de Crédito / Débito</option>
                            <option value="Transferencia">Transferencia Bancaria</option>
                        </select>
                    </div>

                    {error && <p className={style.errorMessage}>{error}</p>}

                    <button type="submit" className={style.confirmButton}>
                        Confirmar y Pagar
                    </button>
                </form>
            </div>

            <div className={style.summarySection}>
                <h2>Resumen del Pedido</h2>
                <div className={style.summaryList}>
                    {productsCart.map((prod, idx) => (
                        <div key={idx} className={style.summaryItem}>
                            <span>{prod.cantidad}x {prod.nombre}</span>
                            <span>${prod.precio * prod.cantidad}</span>
                        </div>
                    ))}
                </div>
                <hr className={style.divider} />
                <div className={style.totalRow}>
                    <span>Total ({amount} artículos):</span>
                    <span>${totalPrice}</span>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;