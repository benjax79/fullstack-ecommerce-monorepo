import style from "./ProductsContainer.module.css"
import ProductCard from "../ProductCard/ProductCard"
import { usePagination } from "../../hooks/usePagination.js"






function ProductsContainer( {adelanteButtonIsDisabled,atrasButtonIsDisabled,handlerAdelanteButtonClick,handlerAtrasButtonClick,productos}){
    
    


    return(
        
        <div>
        <section className= {style.ProductsContainer}>
            
            {productos.map(({id_producto,...parametros}) =>  <ProductCard key={id_producto} {...parametros}></ProductCard> )}
            
                
            
        </section>
        <div className={style.buttons}>
                <button disabled={atrasButtonIsDisabled} onClick={handlerAtrasButtonClick} >Atras</button >
                <button disabled={adelanteButtonIsDisabled} onClick={handlerAdelanteButtonClick}>adelante</button>
        </div>
        </div>
        
    )
}

export default ProductsContainer