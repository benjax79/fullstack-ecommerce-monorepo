import style from "./ProductsContainer.module.css"
import ProductCard from "../ProductCard/ProductCard"
function ProductsContainer({productos}){

    return(
        <section className= {style.ProductsContainer}>
            
            {productos.map(({id,...parametros}) =>  <ProductCard key={id} {...parametros}></ProductCard> )}
            
        </section>
    )
}

export default ProductsContainer