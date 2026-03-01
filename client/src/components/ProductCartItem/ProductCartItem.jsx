import style from "./productCartItem.module.css"

function ProductCartItem({nombre,cantidad,precio,imagen,id_producto,eliminarProductoCarrito}){

    


    
    return (
        <div className={style.container}>
            <img src={imagen} alt="imagen producto en carrito" />
            <p>{nombre}</p> 
            <div>
            <p>Cantidad  </p>
            <p>{cantidad}</p>
            </div>
            <div>
            <p>Total</p>
            <p>{precio*cantidad}</p>
            </div>
            <div>
                <div onClick={()=>eliminarProductoCarrito(id_producto)} className={style.eliminar}> Eliminar</div>
            </div>
        </div>
    )
}

export default ProductCartItem;