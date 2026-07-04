import style from "./AdminPage.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function AdminPage() {
    const { user } = useAuth();
    const [boletas, setBoletas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [activeTab, setActiveTab] = useState("ordenes");
    
    // Estado para el formulario del nuevo producto
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "", categoria: "", color: "", stock: 0, precio: 0, descripcion: "", imagen: ""
    });

    useEffect(() => {
        if (activeTab === "ordenes") {
            fetchTodasBoletas();
        } else if (activeTab === "productos") {
            fetchTodosProductos();
        }
    }, [activeTab]);

    const fetchTodasBoletas = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/boleta/admin/todas", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setBoletas(data);
            }
        } catch (error) {
            console.error("Error al obtener boletas", error);
        }
    };

    const fetchTodosProductos = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/producto/admin/todos", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setProductos(data);
            }
        } catch (error) {
            console.error("Error al obtener productos", error);
        }
    };

    const cambiarEstadoBoleta = async (id_boleta, nuevoEstado) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/boleta/admin/estado/${id_boleta}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            if (response.ok) {
                setBoletas(boletas.map(b => b.id_boleta === id_boleta ? { ...b, estado: nuevoEstado } : b));
            } else {
                alert("Fallo al actualizar el estado");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/producto/crear", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(nuevoProducto)
            });

            if (response.ok) {
                alert("Producto creado exitosamente");
                setNuevoProducto({
                    nombre: "", categoria: "", color: "", stock: 0, precio: 0, descripcion: "", imagen: ""
                });
                fetchTodosProductos(); // Recargar lista
            } else {
                alert("Error al crear producto");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const eliminarProducto = async (id_producto) => {
        if(!window.confirm("¿Seguro que deseas eliminar este producto de la tienda?")) return;
        
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/producto/eliminar/${id_producto}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                setProductos(productos.filter(p => p.id_producto !== id_producto));
                alert("Producto eliminado exitosamente");
            } else {
                alert("Error al eliminar producto");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <section className={style.adminContainer}>
            <div className={style.header}>
                <h2>Panel de Administrador</h2>
                <p>Bienvenido Maestro(a) {user.nombre}</p>
            </div>

            <div className={style.tabs}>
                <button 
                    className={activeTab === "ordenes" ? style.activeTab : style.tab} 
                    onClick={() => setActiveTab("ordenes")}
                >
                    Gestión de Órdenes
                </button>
                <button 
                    className={activeTab === "productos" ? style.activeTab : style.tab} 
                    onClick={() => setActiveTab("productos")}
                >
                    Gestión de Productos
                </button>
            </div>

            {activeTab === "ordenes" && (
                <div className={style.panel}>
                    <h3>Todas las Ventas</h3>
                    <div className={style.tableContainer}>
                        <table className={style.adminTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boletas.map((b) => (
                                    <tr key={b.id_boleta}>
                                        <td>#{b.id_boleta}</td>
                                        <td>{b.nombre} {b.apellido}</td>
                                        <td>{new Date(b.fecha).toLocaleDateString()}</td>
                                        <td>${b.precio_total}</td>
                                        <td>
                                            <span className={`${style.statusBadge} ${style[b.estado.toLowerCase()]}`}>
                                                {b.estado}
                                            </span>
                                        </td>
                                        <td>
                                            {b.estado === "PENDIENTE" ? (
                                                <button 
                                                    className={style.actionBtn}
                                                    onClick={() => cambiarEstadoBoleta(b.id_boleta, "ENVIADO")}
                                                >
                                                    Marcar Enviado
                                                </button>
                                            ) : (
                                                <button 
                                                    className={style.dangerBtn}
                                                    onClick={() => cambiarEstadoBoleta(b.id_boleta, "PENDIENTE")}
                                                >
                                                    Revertir a Pendiente
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "productos" && (
                <div className={style.panel}>
                    <div className={style.productManagementGrid}>
                        <div>
                            <h3>Crear Nuevo Producto</h3>
                            <form className={style.productForm} onSubmit={handleProductSubmit}>
                                <div className={style.formGroup}>
                                    <label>Nombre:</label>
                                    <input type="text" required value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Categoría:</label>
                                    <input type="text" required value={nuevoProducto.categoria} onChange={(e) => setNuevoProducto({...nuevoProducto, categoria: e.target.value})} />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Color:</label>
                                    <input type="text" required value={nuevoProducto.color} onChange={(e) => setNuevoProducto({...nuevoProducto, color: e.target.value})} />
                                </div>
                                <div className={style.formGroupRow}>
                                    <div className={style.formGroup}>
                                        <label>Stock:</label>
                                        <input type="number" required min="0" value={nuevoProducto.stock} onChange={(e) => setNuevoProducto({...nuevoProducto, stock: parseInt(e.target.value)})} />
                                    </div>
                                    <div className={style.formGroup}>
                                        <label>Precio ($):</label>
                                        <input type="number" required min="0" value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({...nuevoProducto, precio: parseInt(e.target.value)})} />
                                    </div>
                                </div>
                                <div className={style.formGroup}>
                                    <label>URL Imagen:</label>
                                    <input type="text" required value={nuevoProducto.imagen} onChange={(e) => setNuevoProducto({...nuevoProducto, imagen: e.target.value})} />
                                </div>
                                <div className={style.formGroup}>
                                    <label>Descripción:</label>
                                    <textarea required rows="3" value={nuevoProducto.descripcion} onChange={(e) => setNuevoProducto({...nuevoProducto, descripcion: e.target.value})}></textarea>
                                </div>
                                <button type="submit" className={style.submitBtn}>Crear Producto Público</button>
                            </form>
                        </div>
                        
                        <div>
                            <h3>Productos Activos</h3>
                            <div className={style.tableContainer} style={{maxHeight: '600px', overflowY: 'auto'}}>
                                <table className={style.adminTable}>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productos.map(p => (
                                            <tr key={p.id_producto}>
                                                <td><img src={p.imagen} alt={p.nombre} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px'}}/></td>
                                                <td>{p.nombre}</td>
                                                <td>${p.precio}</td>
                                                <td>{p.stock}</td>
                                                <td>
                                                    <button 
                                                        className={style.deleteBtn}
                                                        onClick={() => eliminarProducto(p.id_producto)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default AdminPage;
