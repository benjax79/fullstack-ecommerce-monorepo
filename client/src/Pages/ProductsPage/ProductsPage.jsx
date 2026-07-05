import style from "./ProductsPage.module.css";
import { usePagination } from "../../hooks/usePagination.js";
import Filter from "../../components/Filter/Filter.jsx";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer.jsx";

function ProductsPage() {
    const { adelanteButtonIsDisabled, atrasButtonIsDisabled, handlerAdelanteButtonClick, handlerAtrasButtonClick, productos, loading } = usePagination();

    return (
        <div className={style.pageContainer}>
            <div className={style.filterSection}>
                <Filter />
            </div>
            <div className={style.productsSection}>
                <ProductsContainer {...{ adelanteButtonIsDisabled, atrasButtonIsDisabled, handlerAdelanteButtonClick, handlerAtrasButtonClick, productos, loading }} />
            </div>
        </div>
    )
}


export default ProductsPage 
