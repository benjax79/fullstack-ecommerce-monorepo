import { useEffect, useState } from "react"
import style from "./carritoPage.module.css"
import ProductCartList from "../../components/ProductCartList/ProductCartList.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx"

function CarritoPage(){
    
    const [productsCart,setProductCart] = useState([]);
    let amount=0;
    let totalPrice=0;
    const getCartProducts = async(id_cliente)=>{
        
        const request = await fetch(`http://localhost:3000/carrito/getCartProducts/${id_cliente}`);
        
        const product_list = await request.json()
        setProductCart(product_list);
    }
    productsCart.forEach( ({precio, cantidad}) => {
        amount+=cantidad;
        totalPrice+=precio;
    })

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
            <div >
                <CartSummary {...{amount,totalPrice}}/>
            </div>


        </section>

        
        
    )
}


export default CarritoPage;