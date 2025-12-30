import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import ProductsContainer from './components/ProductsContainer/ProductsContainer'
import Filter from './components/Filter/Filter'
import Footer from './components/Footer/Footer'
import ProductCard from './components/ProductCard/ProductCard'
import { usePagination } from './hooks/usePagination.js'
function App() {

  const {adelanteButtonIsDisabled,atrasButtonIsDisabled,handlerAdelanteButtonClick,handlerAtrasButtonClick,productos,handlerSearchOnSubmit} = usePagination();

  return(
    <div style={{backgroundColor:"pink"}}>
    <Header {...{handlerSearchOnSubmit}} >
      
    </Header>

    <div style={{display:'flex'}}>
      <Filter></Filter>

    <ProductsContainer {...{adelanteButtonIsDisabled,atrasButtonIsDisabled,handlerAdelanteButtonClick,handlerAtrasButtonClick,productos}}> 
    </ProductsContainer>
    </div>
    
    <Footer></Footer>
    
    </div>
  ) 
  
}

export default App
