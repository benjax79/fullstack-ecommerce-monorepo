import { useState } from "react";
import style from "./ProductCard.module.css"





function ProductCard(props){
    const {precio,imagen,stock,nombre} = props;
   
    

    
   

    return(
        <article className={style.productCard}>
                <div> 
                    <img src={imagen} alt="maquillaje" />
                </div>
                <p>{nombre}</p>
                <p>Precio: {precio}</p>
                <p>Cantidad: {stock}</p>
                <button  style={{display:"block",justifySelf:"center"}}>Ver producto</button>
            </article>
    )
}

export default ProductCard