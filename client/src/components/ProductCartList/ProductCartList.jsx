import { useState } from "react"
import style from "./ProductCartList.module.css"
import ProductCartItem from "../ProductCartItem/ProductCartItem.jsx";




function ProductCartList({productsCart}){

    
    const lista=productsCart.map( ({id_producto:Key,...others}) =>{  
                return <ProductCartItem key={Key} {...others}/>
                  
    })

    
    

    return(
        <article className={style.article}>
            {lista}
        </article>

    )
}

export default ProductCartList;