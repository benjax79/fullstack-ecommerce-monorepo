import { useState } from "react";
import style from "./ProductCard.module.css"





function ProductCard(props){
    const {precio,imagen,stock,nombre} = props;
   
    

    
   

    return(
        <article className={style.productCard}>
            <div className={style.imageContainer}> 
                <img src={imagen} alt={nombre} className={style.image} />
            </div>
            <div className={style.infoContainer}>
                <p className={style.title}>{nombre}</p>
                <p className={style.price}>${Number(precio).toLocaleString("es-CL")}</p>
                <p className={style.stock}>Stock: {stock}</p>
                <button className={style.addButton}>Ver producto</button>
            </div>
        </article>
    )
}

export default ProductCard