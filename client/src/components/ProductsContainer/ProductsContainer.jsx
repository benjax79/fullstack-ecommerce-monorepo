import style from "./ProductsContainer.module.css"
import ProductCard from "../ProductCard/ProductCard"
import { Link } from "react-router-dom"
import { ProductGridSkeleton } from "../Skeleton/Skeleton"







function ProductsContainer( {adelanteButtonIsDisabled,atrasButtonIsDisabled,handlerAdelanteButtonClick,handlerAtrasButtonClick,productos, loading}){
    
    


    return(
        
        <div className={style.container}>
            <section className={style.products}>
                {loading ? (
                    <ProductGridSkeleton count={8} />
                ) : (
                    productos.map(({id_producto,...parametros}) => (
                        <Link to={`/producto/${id_producto}`} key={id_producto}>
                            <ProductCard {...parametros}></ProductCard>
                        </Link>
                    ))
                )}
            </section>
            {!loading && (
                <div className={style.pagination}>
                    <button className={style.paginationBtn} disabled={atrasButtonIsDisabled} onClick={handlerAtrasButtonClick}>Atrás</button>
                    <button className={style.paginationBtn} disabled={adelanteButtonIsDisabled} onClick={handlerAdelanteButtonClick}>Adelante</button>
                </div>
            )}
        </div>
        
    )
}

export default ProductsContainer