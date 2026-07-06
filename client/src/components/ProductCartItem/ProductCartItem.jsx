import style from "./ProductCartItem.module.css"
import { Link } from "react-router-dom";

function ProductCartItem({nombre,cantidad,precio,imagen,id_producto,eliminarProductoCarrito}){

    


    
    return (
        <div className={style.article}>
            <Link to={`/producto/${id_producto}`} className={style.imageLink}>
                <img src={imagen} alt={nombre} className={style.image} />
            </Link>
            
            <div className={style.div_info}>
                <Link to={`/producto/${id_producto}`} className={style.titleLink}>
                    <p className={style.title}>{nombre}</p> 
                </Link>
                <p className={style.quantity}>Cantidad: {cantidad}</p>
                <p className={style.price}>${Number(precio*cantidad).toLocaleString("es-CL")}</p>
            </div>
            
            <button onClick={()=>eliminarProductoCarrito(id_producto)} className={style.deleteButton}>
                Eliminar
            </button>
        </div>
    )
}

export default ProductCartItem;