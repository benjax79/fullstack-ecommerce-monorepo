import { useState } from "react"
import style from "./ProductCartList.module.css"
import ProductCartItem from "../ProductCartItem/ProductCartItem.jsx";




function ProductCartList({productsCart}){
    
    
    

    return(
        <article className={style.article}>
            {productsCart.map( ({id_producto:Key,...others}) =>(
                  <ProductCartItem Key={Key} {...others}/>
            ))}


        </article>

    )
}

export default ProductCartList;