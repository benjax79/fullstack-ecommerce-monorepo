import {BrowserRouter,Route,Routes} from "react-router-dom" 
import ProductsPage from './Pages/ProductsPage/ProductsPage.jsx'
import Layout from './components/Layout/Layout.jsx'
import HomePage from "./Pages/HomePage/HomePage.jsx"
import ProductPage from "./Pages/ProductPage/ProductPage.jsx"
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.jsx";
import CarritoPage from "./Pages/CarritoPage/CarritoPage.jsx"
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage.jsx"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";


function App() {

  

  return(

    <BrowserRouter>
      <Routes >

        <Route  path='/' element={<Layout/>} >


          <Route index element={<HomePage/>}/>
          <Route path="/productos" element={<ProductsPage/>}/>
          <Route path="/producto/:id"  element={<ProductPage/>}/>
          <Route path="/sesion" element={<LoginPage/>}/>
          <Route path="/registro" element={<RegisterPage/>}/>

          {/* Rutas Privadas: Envolvemos las rutas en el componente ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/carrito" element={<CarritoPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>}/> 
          </Route>
          

        </Route>

      </Routes>
    
    
    </BrowserRouter>
    
  ) 
  
}

export default App
