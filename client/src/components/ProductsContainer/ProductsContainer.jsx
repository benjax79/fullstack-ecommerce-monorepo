import style from "./ProductsContainer.module.css"
import ProductCard from "../ProductCard/ProductCard"
import { Link } from "react-router-dom"







function ProductsContainer( {adelanteButtonIsDisabled,atrasButtonIsDisabled,handlerAdelanteButtonClick,handlerAtrasButtonClick,productos}){
    
    


    return(
        
        <div>
        <section className= {style.ProductsContainer}>
            
            {productos.map(({id_producto,...parametros}) => <Link to= {`/producto/${id_producto}`}>  <ProductCard key={id_producto} {...parametros}></ProductCard></Link> )}
            
                
            
        </section>
        <div className={style.buttons}>
                <button disabled={atrasButtonIsDisabled} onClick={handlerAtrasButtonClick} >Atras</button >
                <button disabled={adelanteButtonIsDisabled} onClick={handlerAdelanteButtonClick}>adelante</button>
        </div>
        </div>
        
    )
}

export default ProductsContainer