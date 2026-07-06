import { useState } from "react"
import style from "./ProductCartList.module.css"
import ProductCartItem from "../ProductCartItem/ProductCartItem.jsx";




function ProductCartList({productsCart ,eliminarProductoCarrito, modificarCantidadCarrito}){

    
    const lista=productsCart.map( ({id_producto:key,...others}) =>{  
                return <ProductCartItem  eliminarProductoCarrito={eliminarProductoCarrito} modificarCantidadCarrito={modificarCantidadCarrito} key={key} id_producto={key} {...others}/>
                  
    })

    
    

    if (productsCart.length === 0) {
        return (
            <div className={style.emptyCart}>
                Tu carrito está vacío. ¡Agrega algunos productos increíbles!
            </div>
        )
    }

    return(
        <div className={style.list}>
            {lista}
        </div>
    )
}

export default ProductCartList;