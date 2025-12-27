import { useState } from "react";
import style from "./ProductCard.module.css"





function ProductCard(props){
    const {precio,imagen,stock} = props;
    const [stock_,setStock] = useState(stock);

    
    const handleClick =(event) =>{
        if (stock_>0){
            setStock(stock_-1)
        }
        else{
            alert("Producto sin stock")
        }
    }

    return(
        <article className={style.productCard}>
                <div> 
                    <img src={imagen} alt="maquillaje" />
                </div>
                <p>Precio: {precio}</p>
                <p>Cantidad: {stock_}</p>
                <button onClick={handleClick} style={{display:"block",justifySelf:"center"}}>Agregar al carrito</button>
            </article>
    )
}

export default ProductCard