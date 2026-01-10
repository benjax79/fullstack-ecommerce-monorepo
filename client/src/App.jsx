import {BrowserRouter,Route,Routes} from "react-router-dom" 
import ProductsPage from './Pages/ProductsPage/ProductsPage.jsx'
import Layout from './components/Layout/Layout.jsx'
import HomePage from "./Pages/HomePage/HomePage.jsx"
import ProductPage from "./Pages/ProductPage/ProductPage.jsx"
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";



function App() {

  

  return(

    <BrowserRouter>
      <Routes >

        <Route  path='/' element={<Layout/>} >


          <Route index element={<HomePage/>}/>
          <Route path="/productos" element={<ProductsPage/>}/>
          <Route path="/producto/:id"  element={<ProductPage/>}/>
          <Route path="/sesion" element={<LoginPage/>}/>
          
          

        </Route>

      </Routes>
    
    
    </BrowserRouter>
    
  ) 
  
}

export default App
