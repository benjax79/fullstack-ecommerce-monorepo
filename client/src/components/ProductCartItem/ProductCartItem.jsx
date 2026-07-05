import style from "./productCartItem.module.css"

function ProductCartItem({nombre,cantidad,precio,imagen,id_producto,eliminarProductoCarrito}){

    


    
    return (
        <div className={style.article}>
            <img src={imagen} alt={nombre} className={style.image} />
            
            <div className={style.div_info}>
                <p className={style.title}>{nombre}</p> 
                <p className={style.quantity}>Cantidad: {cantidad}</p>
                <p className={style.price}>${precio*cantidad}</p>
            </div>
            
            <button onClick={()=>eliminarProductoCarrito(id_producto)} className={style.deleteButton}>
                Eliminar
            </button>
        </div>
    )
}

export default ProductCartItem;