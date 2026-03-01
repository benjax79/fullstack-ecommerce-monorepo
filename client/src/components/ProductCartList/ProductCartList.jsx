import { useState } from "react"
import style from "./ProductCartList.module.css"
import ProductCartItem from "../ProductCartItem/ProductCartItem.jsx";




function ProductCartList({productsCart ,eliminarProductoCarrito}){

    
    const lista=productsCart.map( ({id_producto:key,...others}) =>{  
                return <ProductCartItem  eliminarProductoCarrito={eliminarProductoCarrito} key={key} id_producto={key} {...others}/>
                  
    })

    
    

    return(
        <article className={style.article}>
            {lista}
        </article>

    )
}

export default ProductCartList;