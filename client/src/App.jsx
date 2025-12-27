import { useState } from 'react'
import Header from './components/Header/Header'
import ProductsContainer from './components/ProductsContainer/ProductsContainer'
import Filter from './components/Filter/Filter'
import Footer from './components/Footer/Footer'
import ProductCard from './components/ProductCard/ProductCard'

function App() {
  
const productos = [
  {
    id: 1, 
    nombre: "Labial Mate",
    imagen: "https://m.media-amazon.com/images/I/71uGD2iowQL._AC_UF1000,1000_QL80_.jpg", 
    precio: 2000, 
    stock: 20 },
  {
    id: 2, 
    nombre: "Base labial",
    imagen: "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/626185999/variant/images/e0645bed-a6f9-4104-b340-7a388e5ff27f/626185999-0000-001.jpg", 
    precio: 3500, 
    stock: 15 },
  {
    id: 3, 
    nombre: "Base socratesial",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_605079-MLU69819003257_062023-O.webp", 
    precio: 3500, 
    stock: 15 
  }
]

  return(
    <>
    <Header >
      
    </Header>

    <div style={{display:'flex'}}>
      <Filter></Filter>

    <ProductsContainer productos={productos}>
    </ProductsContainer>
    </div>
    
    <Footer></Footer>
    </>
  ) 
}

export default App
