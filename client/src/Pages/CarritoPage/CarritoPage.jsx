import { useEffect, useState } from "react"
import style from "./carritoPage.module.css"
import ProductCartList from "../../components/ProductCartList/ProductCartList.jsx";

function CarritoPage(){
    
    const [productsCart,setProductCart] = useState([]);

    const getCartProducts = async(id_cliente)=>{
        
        const request = await fetch(`http://localhost:3000/carrito/getCartProducts/${id_cliente}`);
        
        const product_list = await request.json()
        setProductCart(product_list);
    }

    useEffect( ()=>{
        if(!localStorage.getItem("user")){
            return
        }
        
        const user=JSON.parse(localStorage.getItem("user"));
        const fecthData=async()=>{
            await getCartProducts(user.id_cliente)
        }
        fecthData();
       
    },[])


    return(
        
        <section className= {style.section} >
            <ProductCartList productsCart={productsCart}/>


        </section>

        
        
    )
}


export default CarritoPage;