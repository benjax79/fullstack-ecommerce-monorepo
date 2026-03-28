import { usePagination } from "../../hooks/usePagination.js";
import Filter from "../../components/Filter/Filter.jsx";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer.jsx";



function ProductsPage(){
    


    const {adelanteButtonIsDisabled,atrasButtonIsDisabled,handlerAdelanteButtonClick,handlerAtrasButtonClick,productos} = usePagination();
    return (
    <div style={{display:'flex'}}>
      <Filter ></Filter>
        <ProductsContainer {...{adelanteButtonIsDisabled,atrasButtonIsDisabled,handlerAdelanteButtonClick,handlerAtrasButtonClick,productos}}> 
        </ProductsContainer>
    </div>
    
    )
}

export default ProductsPage 