import style from "./ProductCartItem.module.css"
import { Link } from "react-router-dom";

function ProductCartItem({nombre,cantidad,precio,imagen,id_producto,eliminarProductoCarrito,modificarCantidadCarrito}){

    


    
    return (
        <div className={style.article}>
            <Link to={`/producto/${id_producto}`} className={style.imageLink}>
                <img src={imagen} alt={nombre} className={style.image} />
            </Link>
            
            <div className={style.div_info}>
                <Link to={`/producto/${id_producto}`} className={style.titleLink}>
                    <p className={style.title}>{nombre}</p> 
                </Link>
                <div className={style.quantityControls}>
                    <button className={style.qtyBtn} onClick={() => modificarCantidadCarrito(id_producto, cantidad - 1)}>-</button>
                    <span className={style.quantity}>{cantidad}</span>
                    <button className={style.qtyBtn} onClick={() => modificarCantidadCarrito(id_producto, cantidad + 1)}>+</button>
                </div>
                <p className={style.price}>${Number(precio*cantidad).toLocaleString("es-CL")}</p>
            </div>
            
            <button onClick={()=>eliminarProductoCarrito(id_producto)} className={style.deleteButton}>
                Eliminar
            </button>
        </div>
    )
}

export default ProductCartItem;