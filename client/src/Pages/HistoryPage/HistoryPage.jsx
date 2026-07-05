import style from "./HistoryPage.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { OrderListSkeleton } from "../../components/Skeleton/Skeleton";

function HistoryPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [boletas, setBoletas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoletas = async () => {
            if (!user) {
                navigate("/sesion");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_API_URL}/boleta/historial/${user.id_cliente}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setBoletas(data);
                } else {
                    console.error("Error al obtener las boletas");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBoletas();
    }, [user, navigate]);

    if (loading) {
        return (
            <section className={style.historyContainer}>
                <h2 className={style.title}>Mis Compras</h2>
                <div className={style.ordersList}>
                    <OrderListSkeleton count={3} />
                </div>
            </section>
        );
    }

    return (
        <section className={style.historyContainer}>
            <h2 className={style.title}>Mis Compras</h2>

            {boletas.length === 0 ? (
                <div className={style.emptyState}>
                    <p>Aún no has realizado ninguna compra.</p>
                    <button className={style.shopButton} onClick={() => navigate("/productos")}>Ir a la tienda</button>
                </div>
            ) : (
                <div className={style.ordersList}>
                    {boletas.map((boleta, idx) => (
                        <div key={boleta.id_boleta} className={style.orderCard}>
                            <div className={style.orderHeader}>
                                <span className={style.orderId}>Pedido #{boletas.length - idx}</span>
                                <span className={style.orderDate}>{new Date(boleta.fecha).toLocaleDateString()}</span>
                                <span className={`${style.statusBadge} ${style[boleta.estado.toLowerCase()]}`}>
                                    {boleta.estado}
                                </span>
                            </div>
                            <div className={style.orderBody}>
                                <div className={style.orderInfo}>
                                    <p><strong>Método de pago:</strong> {boleta.metodo_pago || "No especificado"}</p>
                                    <p><strong>Dirección:</strong> {boleta.direccion_envio || "Retiro en tienda"}</p>
                                </div>
                                <div className={style.orderTotal}>
                                    <p>Total Pagado</p>
                                    <span className={style.totalAmount}>${boleta.precio_total}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default HistoryPage;
