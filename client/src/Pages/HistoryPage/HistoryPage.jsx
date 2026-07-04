import style from "./HistoryPage.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

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
                const response = await fetch(`http://localhost:3000/boleta/historial/${user.id_cliente}`, {
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
        return <h2 className={style.loading}>Cargando tu historial...</h2>;
    }

    return (
        <section className={style.historyContainer}>
            <h2>Mis Compras</h2>
            <p className={style.subtitle}>Aquí puedes ver el historial de todos tus pedidos.</p>

            {boletas.length === 0 ? (
                <div className={style.emptyState}>
                    <p>Aún no has realizado ninguna compra.</p>
                    <button onClick={() => navigate("/productos")}>Ir a la tienda</button>
                </div>
            ) : (
                <div className={style.tableContainer}>
                    <table className={style.historyTable}>
                        <thead>
                            <tr>
                                <th>N° de Boleta</th>
                                <th>Fecha</th>
                                <th>Total Pagado</th>
                                <th>Método de Pago</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boletas.map((boleta) => (
                                <tr key={boleta.id_boleta}>
                                    <td>#{boleta.id_boleta}</td>
                                    <td>{new Date(boleta.fecha).toLocaleDateString()}</td>
                                    <td>${boleta.precio_total}</td>
                                    <td>{boleta.metodo_pago || "No especificado"}</td>
                                    <td>
                                        <span className={`${style.status} ${style[boleta.estado.toLowerCase()]}`}>
                                            {boleta.estado}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default HistoryPage;
